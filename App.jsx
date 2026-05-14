// Main App — routing + global state
const App = () => {
  const [page, setPageRaw] = React.useState(() => localStorage.getItem('az_page') || 'landing');
  const [currentUser, setCurrentUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('az_user')); } catch { return null; }
  });
  const [authModal, setAuthModal] = React.useState(null); // null | 'login' | 'register'
  const [authMode, setAuthMode] = React.useState('login');
  const [paymentWorkshop, setPaymentWorkshop] = React.useState(null);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);
  const [heroVariant, setHeroVariant] = React.useState(() => parseInt(localStorage.getItem('az_hero')||'1'));
  const [font, setFont] = React.useState(() => localStorage.getItem('az_font')||'Nunito');

  const setPage = (p) => {
    setPageRaw(p);
    localStorage.setItem('az_page', p);
    window.scrollTo({ top: 0 });
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('az_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('az_user');
  };

  // Tweaks listener
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setHero = (v) => {
    setHeroVariant(v);
    localStorage.setItem('az_hero', v);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { heroVariant: v } }, '*');
  };

  const setFontChoice = (f) => {
    setFont(f);
    localStorage.setItem('az_font', f);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { font: f } }, '*');
    document.documentElement.style.fontFamily = f + ', sans-serif';
  };

  // Open auth modal handler
  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthModal(mode);
  };

  // Derive workshopId from page like 'workshop-1'
  const workshopId = page.startsWith('workshop-') ? parseInt(page.split('-')[1]) : null;

  return (
    <div style={{ fontFamily: font + ', sans-serif', minHeight: '100vh', background: '#faf9ff' }}>
      <Nav
        currentPage={workshopId ? 'catalog' : page}
        setPage={setPage}
        currentUser={currentUser}
        setAuthModal={openAuth}
        setCurrentUser={handleLogout}
      />

      {/* Pages */}
      {page === 'landing' && <Landing setPage={setPage} setAuthModal={openAuth} heroVariant={heroVariant} />}
      {page === 'catalog' && <Catalog setPage={setPage} setAuthModal={openAuth} currentUser={currentUser} />}
      {workshopId && <WorkshopDetail workshopId={workshopId} setPage={setPage} setAuthModal={openAuth} currentUser={currentUser} setPaymentWorkshop={setPaymentWorkshop} />}
      {page === 'student-dashboard' && (currentUser ? <StudentDashboard currentUser={currentUser} setPage={setPage} setAuthModal={openAuth} /> : <AuthGuard setAuthModal={openAuth} setPage={setPage}/>)}
      {page === 'teacher-dashboard' && (currentUser ? <TeacherDashboard currentUser={currentUser} setPage={setPage} /> : <AuthGuard setAuthModal={openAuth} setPage={setPage}/>)}
      {page === 'faq' && <FAQPage setPage={setPage} setAuthModal={openAuth} />}
      {page === 'about' && <AboutPage setPage={setPage} setAuthModal={openAuth} />}
      {page === 'how' && <HowPage setPage={setPage} setAuthModal={openAuth} />}

      {/* Footer */}
      <footer style={appStyles.footer}>
        <div style={appStyles.footerInner}>
          <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:8}}>
            <div style={{width:32, height:32, borderRadius:10, background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white', fontWeight:800, fontSize:16, display:'flex', alignItems:'center', justifyContent:'center'}}>А</div>
            <div style={{fontWeight:700, color:'#2D2640'}}>Азбука нейросетей</div>
          </div>
          <div style={{fontSize:13, color:'#c0bad8', marginBottom:12}}>Живые воркшопы по нейросетям для тех, кто начинает с нуля</div>
          <div style={{display:'flex', gap:20, flexWrap:'wrap', fontSize:13}}>
            {[['Воркшопы','catalog'],['О проекте','about'],['FAQ','faq'],['Контакты','faq']].map(([l,p])=>(
              <button key={l} style={{background:'none', border:'none', color:'#9990b0', cursor:'pointer', fontSize:13, padding:0, fontFamily:'Nunito,sans-serif'}} onClick={()=>setPage(p)}>{l}</button>
            ))}
          </div>
          <div style={{marginTop:16, fontSize:12, color:'#d0cadf'}}>© 2025 Азбука нейросетей · Платформа работает на Яндекс 360</div>
        </div>
      </footer>

      {/* Auth modal */}
      {authModal && (
        <Auth
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthModal(null)}
          onLogin={handleLogin}
        />
      )}

      {/* Payment modal */}
      {paymentWorkshop && (
        <Payment
          workshop={paymentWorkshop}
          onClose={() => setPaymentWorkshop(null)}
          onSuccess={() => {
            setPage(currentUser?.type === 'teacher' ? 'teacher-dashboard' : 'student-dashboard');
          }}
        />
      )}

      {/* Tweaks panel */}
      {tweaksVisible && (
        <div style={appStyles.tweaksPanel}>
          <div style={appStyles.tweaksTitle}>Tweaks</div>

          <div style={appStyles.tweaksSection}>Hero — вариант</div>
          {[1,2,3].map(v => (
            <button key={v} style={{...appStyles.tweaksBtn, ...(heroVariant===v?appStyles.tweaksBtnActive:{})}}
              onClick={() => setHero(v)}>
              {['Светлый (пастель)','Тёмный (dark)','Центрированный'][v-1]}
            </button>
          ))}

          <div style={{...appStyles.tweaksSection, marginTop:12}}>Шрифт</div>
          {['Nunito','Geologica','Onest'].map(f => (
            <button key={f} style={{...appStyles.tweaksBtn, ...(font===f?appStyles.tweaksBtnActive:{})}}
              onClick={() => setFontChoice(f)}>
              {f}
            </button>
          ))}

          <div style={{...appStyles.tweaksSection, marginTop:12}}>Быстрый вход</div>
          <button style={appStyles.tweaksBtn} onClick={() => { handleLogin({name:'Мария', type:'student', email:'m@m.ru'}); setPage('student-dashboard'); }}>→ Ученик</button>
          <button style={appStyles.tweaksBtn} onClick={() => { handleLogin({name:'Катя', type:'teacher', email:'k@k.ru'}); setPage('teacher-dashboard'); }}>→ Преподаватель</button>
          <button style={{...appStyles.tweaksBtn, color:'#F5856A'}} onClick={() => { handleLogout(); setPage('landing'); }}>Выйти</button>
        </div>
      )}
    </div>
  );
};

// Auth guard stub
const AuthGuard = ({ setAuthModal, setPage }) => (
  <div style={{minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16}}>
    <div style={{fontSize:48}}>🔒</div>
    <div style={{fontSize:20, fontWeight:700, color:'#2D2640'}}>Необходима авторизация</div>
    <div style={{fontSize:14, color:'#9990b0'}}>Войдите, чтобы открыть личный кабинет</div>
    <button style={{background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none', color:'white', borderRadius:14, padding:'12px 28px', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}
      onClick={() => setAuthModal('login')}>Войти</button>
  </div>
);

// How it works page
const HowPage = ({ setPage, setAuthModal }) => (
  <div style={{background:'#faf9ff', minHeight:'100vh'}}>
    <div style={{background:'linear-gradient(135deg,#f7f5ff,#fff0eb)', padding:'48px 24px 32px'}}>
      <div style={{maxWidth:800, margin:'0 auto'}}>
        <h1 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#2D2640', margin:'0 0 8px'}}>Как это работает</h1>
        <p style={{fontSize:16, color:'#9990b0'}}>Весь путь от регистрации до результата</p>
      </div>
    </div>
    <div style={{maxWidth:800, margin:'0 auto', padding:'48px 24px'}}>
      {[
        {n:1, icon:'📋', title:'Выбери воркшоп и заполни анкету', desc:'В анкете расскажи свою задачу — мы адаптируем программу под участников группы. Это займёт 2–3 минуты.'},
        {n:2, icon:'💳', title:'Оплати участие через ЮKassa', desc:'Карта, СБП или ЮMoney. После оплаты автоматически получишь ссылку на Яндекс.Телемост и подтверждение на почту.'},
        {n:3, icon:'💻', title:'Живой воркшоп — 2–3 часа', desc:'Катя или Таня ведут эфир. Ты работаешь над своей задачей прямо во время занятия — не слушаешь, а делаешь.'},
        {n:4, icon:'📚', title:'Неделя практики', desc:'Запись воркшопа и материалы появляются в личном кабинете сразу после эфира. Практикуешь и копишь вопросы.'},
        {n:5, icon:'💬', title:'Вторая сессия — разбор', desc:'Возвращаемся и разбираем накопленные вопросы. Все вопросы типовые — отвечаем углублённо и быстро.'},
      ].map((step, i) => (
        <div key={step.n} style={{display:'flex', gap:24, marginBottom:32, position:'relative'}}>
          <div style={{width:56, height:56, borderRadius:20, background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28, flexShrink:0, boxShadow:'0 4px 16px rgba(124,111,205,0.25)'}}>
            {step.icon}
          </div>
          <div style={{paddingTop:8}}>
            <div style={{fontSize:11, color:'#9990b0', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4}}>Шаг {step.n}</div>
            <h3 style={{fontSize:18, fontWeight:700, color:'#2D2640', marginBottom:8}}>{step.title}</h3>
            <p style={{fontSize:14, color:'#7B7491', lineHeight:1.7}}>{step.desc}</p>
          </div>
        </div>
      ))}
      <div style={{background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', borderRadius:20, padding:'32px', textAlign:'center', color:'white', marginTop:16}}>
        <h3 style={{fontSize:20, fontWeight:800, marginBottom:8}}>Готов попробовать?</h3>
        <p style={{fontSize:14, opacity:0.85, marginBottom:20}}>Следующий воркшоп уже 26 апреля</p>
        <button style={{background:'white', color:'#7C6FCD', border:'none', borderRadius:14, padding:'12px 32px', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}
          onClick={() => setPage('catalog')}>
          Выбрать воркшоп
        </button>
      </div>
    </div>
  </div>
);

const appStyles = {
  footer: {
    background:'white', borderTop:'1px solid #ede9ff',
    padding:'32px 24px',
  },
  footerInner: { maxWidth:1200, margin:'0 auto' },
  tweaksPanel: {
    position:'fixed', bottom:24, right:24, zIndex:500,
    background:'white', borderRadius:20, padding:20, width:220,
    boxShadow:'0 8px 32px rgba(124,111,205,0.2)', border:'1.5px solid #ede9ff',
  },
  tweaksTitle: { fontWeight:800, color:'#2D2640', marginBottom:12, fontSize:15 },
  tweaksSection: { fontSize:11, fontWeight:700, color:'#9990b0', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 },
  tweaksBtn: {
    display:'block', width:'100%', textAlign:'left',
    background:'#f7f5ff', border:'1.5px solid transparent',
    borderRadius:10, padding:'8px 12px', fontSize:13, fontWeight:600,
    color:'#5a5270', cursor:'pointer', marginBottom:6,
    fontFamily:'Nunito,sans-serif',
  },
  tweaksBtnActive: { borderColor:'#7C6FCD', background:'#f0edff', color:'#7C6FCD' },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
