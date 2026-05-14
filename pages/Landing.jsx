// Landing page — Hero (3 variants via Tweak), value props, how it works, pricing, team
const Landing = ({ setPage, setAuthModal, heroVariant }) => {
  const workshops = [
    { id:1, title:'ChatGPT для предпринимателя', emoji:'🤖', tag:'Бизнес', price:2500, seats:3, date:'26 апр' },
    { id:2, title:'Нейросети для дизайнера', emoji:'🎨', tag:'Дизайн', price:2000, seats:8, date:'3 мая' },
    { id:3, title:'AI-контент для соцсетей', emoji:'✍️', tag:'Контент', price:2000, seats:6, date:'10 мая' },
  ];

  // ---- HERO VARIANTS ----
  const HeroV1 = () => (
    <section style={{...lStyles.hero, background:'linear-gradient(160deg,#f7f5ff 0%,#fff0eb 100%)'}}>
      <div style={lStyles.heroInner}>
        <div style={lStyles.heroBadge}>🚀 Живые воркшопы по нейросетям</div>
        <h1 style={lStyles.heroH1}>С нуля — до результата<br/><span style={{color:'#7C6FCD'}}>за один воркшоп</span></h1>
        <p style={lStyles.heroSub}>Приходи со своей задачей — уходи с готовым результатом. Никаких скучных теорий, только практика здесь и сейчас.</p>
        <div style={lStyles.heroBtns}>
          <button style={lStyles.btnPrimary} onClick={() => setPage('catalog')}>Выбрать воркшоп</button>
          <button style={lStyles.btnSecondary} onClick={() => setPage('how')}>Как это работает</button>
        </div>
        <div style={lStyles.heroStats}>
          {[['200+','участников'],['95%','довольны результатом'],['0 ₽','первое занятие']].map(([n,l])=>(
            <div key={n} style={lStyles.heroStat}><span style={lStyles.heroStatNum}>{n}</span><span style={lStyles.heroStatLabel}>{l}</span></div>
          ))}
        </div>
      </div>
      <div style={lStyles.heroVisual}>
        <div style={lStyles.heroCard}>
          <div style={{fontSize:48, marginBottom:12}}>🤖</div>
          <div style={{fontWeight:700, fontSize:18, color:'#2D2640', marginBottom:6}}>ChatGPT для бизнеса</div>
          <div style={{fontSize:13, color:'#9990b0', marginBottom:16}}>Воркшоп · 26 апреля · 19:00</div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:800, fontSize:22, color:'#7C6FCD'}}>2 500 ₽</div>
            <button style={lStyles.btnSmall} onClick={() => setAuthModal('register')}>Записаться</button>
          </div>
          <div style={{marginTop:12, fontSize:12, color:'#F5856A', fontWeight:600}}>🔥 Осталось 3 места</div>
        </div>
      </div>
    </section>
  );

  const HeroV2 = () => (
    <section style={{...lStyles.hero, background:'#2D2640', minHeight:560}}>
      <div style={{...lStyles.heroInner}}>
        <div style={{...lStyles.heroBadge, background:'rgba(124,111,205,0.25)', color:'#c8bfff'}}>✨ Живые воркшопы</div>
        <h1 style={{...lStyles.heroH1, color:'white'}}>Нейросети — это<br/><span style={{color:'#c8bfff'}}>не страшно</span></h1>
        <p style={{...lStyles.heroSub, color:'rgba(255,255,255,0.7)'}}>«Азбука нейросетей» — для тех, кто начинает с нуля. Здесь не страшно задавать вопросы и пробовать.</p>
        <div style={lStyles.heroBtns}>
          <button style={lStyles.btnPrimary} onClick={() => setPage('catalog')}>Смотреть воркшопы</button>
          <button style={{...lStyles.btnSecondary, borderColor:'rgba(255,255,255,0.2)', color:'white'}} onClick={() => setAuthModal('register')}>Бесплатный урок</button>
        </div>
        <div style={lStyles.heroStats}>
          {[['200+','участников'],['95%','довольны'],['8–15','человек в группе']].map(([n,l])=>(
            <div key={n} style={lStyles.heroStat}>
              <span style={{...lStyles.heroStatNum, color:'#c8bfff'}}>{n}</span>
              <span style={{...lStyles.heroStatLabel, color:'rgba(255,255,255,0.5)'}}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={lStyles.heroVisual}>
        <div style={{...lStyles.heroCard, background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)'}}>
          <div style={{fontSize:48, marginBottom:12}}>🤖</div>
          <div style={{fontWeight:700, fontSize:18, color:'white', marginBottom:6}}>ChatGPT для бизнеса</div>
          <div style={{fontSize:13, color:'rgba(200,191,255,0.7)', marginBottom:16}}>Воркшоп · 26 апреля · 19:00</div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:800, fontSize:22, color:'#c8bfff'}}>2 500 ₽</div>
            <button style={lStyles.btnSmall} onClick={() => setAuthModal('register')}>Записаться</button>
          </div>
          <div style={{marginTop:12, fontSize:12, color:'#F5856A', fontWeight:600}}>🔥 Осталось 3 места</div>
        </div>
      </div>
    </section>
  );

  const HeroV3 = () => (
    <section style={{...lStyles.hero, background:'linear-gradient(160deg,#fff8f5 0%,#f5f0ff 100%)', flexDirection:'column', textAlign:'center', padding:'80px 24px 60px'}}>
      <div style={{maxWidth:680, margin:'0 auto'}}>
        <div style={{...lStyles.heroBadge, margin:'0 auto 24px'}}>🎓 Для тех, кто начинает с нуля</div>
        <h1 style={{...lStyles.heroH1, fontSize:'clamp(36px,5vw,64px)', lineHeight:1.15}}>
          Ваша <span style={{color:'#7C6FCD'}}>Азбука</span><br/>нейросетей
        </h1>
        <p style={{...lStyles.heroSub, maxWidth:520, margin:'0 auto 32px'}}>Живые воркшопы, где каждый работает над своей задачей и уходит с готовым результатом. Катя и Таня помогут разобраться.</p>
        <div style={{...lStyles.heroBtns, justifyContent:'center'}}>
          <button style={{...lStyles.btnPrimary, padding:'14px 36px', fontSize:16}} onClick={() => setPage('catalog')}>Выбрать воркшоп →</button>
        </div>
        <div style={{...lStyles.heroStats, justifyContent:'center', marginTop:40}}>
          {[['200+','участников'],['95%','рекомендуют'],['Яндекс 360','инфраструктура']].map(([n,l])=>(
            <div key={n} style={lStyles.heroStat}><span style={lStyles.heroStatNum}>{n}</span><span style={lStyles.heroStatLabel}>{l}</span></div>
          ))}
        </div>
      </div>
    </section>
  );

  const heroes = [HeroV1, HeroV2, HeroV3];
  const HeroComponent = heroes[(heroVariant||1) - 1];

  return (
    <div>
      <HeroComponent />

      {/* Free intro block */}
      <section style={lStyles.section}>
        <div style={lStyles.container}>
          <div style={lStyles.freeBlock}>
            <div style={{fontSize:40}}>🎁</div>
            <div>
              <div style={{fontWeight:700, fontSize:18, color:'#2D2640', marginBottom:4}}>Начни бесплатно</div>
              <div style={{fontSize:14, color:'#7B7491'}}>Посмотри вводное видео (30 мин): что такое нейросети и чем ChatGPT отличается от Алисы</div>
            </div>
            <button style={{...lStyles.btnPrimary, whiteSpace:'nowrap'}} onClick={() => setAuthModal('register')}>Смотреть бесплатно</button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{...lStyles.section, background:'#faf9ff'}} id="how">
        <div style={lStyles.container}>
          <div style={lStyles.sectionHeader}>
            <h2 style={lStyles.h2}>Как проходит воркшоп</h2>
            <p style={lStyles.sectionSub}>Четыре шага от регистрации до результата</p>
          </div>
          <div style={lStyles.stepsGrid}>
            {[
              {n:1, icon:'📋', title:'Заполни анкету', desc:'Расскажи свою задачу — мы адаптируем программу под участников'},
              {n:2, icon:'💳', title:'Оплати участие', desc:'Через ЮKassa — карта, СБП или ЮMoney. Безопасно и быстро'},
              {n:3, icon:'💻', title:'Живой воркшоп', desc:'2–3 часа в Яндекс.Телемост. Работаешь над своей задачей прямо на эфире'},
              {n:4, icon:'📚', title:'Неделя практики', desc:'Запись и материалы — в личном кабинете. Задашь вопросы на второй сессии'},
            ].map(s => (
              <div key={s.n} style={lStyles.stepCard}>
                <div style={lStyles.stepNum}>{s.n}</div>
                <div style={{fontSize:36, marginBottom:12}}>{s.icon}</div>
                <h3 style={{fontSize:16, fontWeight:700, color:'#2D2640', marginBottom:6}}>{s.title}</h3>
                <p style={{fontSize:14, color:'#7B7491', lineHeight:1.6}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming workshops */}
      <section style={lStyles.section}>
        <div style={lStyles.container}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, flexWrap:'wrap', gap:12}}>
            <div>
              <h2 style={lStyles.h2}>Ближайшие воркшопы</h2>
              <p style={lStyles.sectionSub}>Живые группы — 8–15 человек</p>
            </div>
            <button style={lStyles.btnSecondary} onClick={() => setPage('catalog')}>Все воркшопы →</button>
          </div>
          <div style={lStyles.cardsGrid}>
            {workshops.map(w => (
              <div key={w.id} style={lStyles.wCard} onClick={() => setPage('workshop-'+w.id)}>
                <div style={lStyles.wCardTop}>
                  <div style={{fontSize:40}}>{w.emoji}</div>
                  <span style={lStyles.tag}>{w.tag}</span>
                </div>
                <h3 style={lStyles.wCardTitle}>{w.title}</h3>
                <div style={lStyles.wCardMeta}>
                  <span>📅 {w.date}</span>
                  <span style={{color: w.seats <= 3 ? '#F5856A' : '#9990b0'}}>
                    {w.seats <= 3 ? `🔥 Осталось ${w.seats}` : `👥 ${w.seats} мест`}
                  </span>
                </div>
                <div style={lStyles.wCardFooter}>
                  <span style={lStyles.price}>{w.price.toLocaleString()} ₽</span>
                  <button style={lStyles.btnSmall} onClick={e => { e.stopPropagation(); setAuthModal('register'); }}>Записаться</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{...lStyles.section, background:'#faf9ff'}}>
        <div style={lStyles.container}>
          <div style={lStyles.sectionHeader}>
            <h2 style={lStyles.h2}>Форматы участия</h2>
            <p style={lStyles.sectionSub}>Выберите подходящий</p>
          </div>
          <div style={lStyles.pricingGrid}>
            {[
              { name:'Воркшоп', price:'2 000–3 500', period:'разово', color:'#ede9ff', accent:'#7C6FCD', features:['2 живые сессии','Запись на 30 дней','Материалы и шаблоны','Группа 8–15 человек'], btn:'Записаться', popular: false },
              { name:'База знаний', price:'990–1 500', period:'/мес', color:'#f0edff', accent:'#7C6FCD', features:['Все записи воркшопов','Шаблоны промтов','Алгоритмы и инструкции','Обновляется каждый месяц'], btn:'Подключить', popular: true },
              { name:'Консультация 1:1', price:'5 000–8 000', period:'разово', color:'#fff0eb', accent:'#F5856A', features:['60 минут с экспертом','Работа над вашей задачей','Запись сессии','Дополнительные материалы'], btn:'Записаться', popular: false },
            ].map(p => (
              <div key={p.name} style={{...lStyles.priceCard, ...(p.popular ? lStyles.priceCardPopular : {})}}>
                {p.popular && <div style={lStyles.popularBadge}>⭐ Популярно</div>}
                <h3 style={{fontSize:18, fontWeight:700, color:'#2D2640', marginBottom:8}}>{p.name}</h3>
                <div style={{marginBottom:20}}>
                  <span style={{fontSize:28, fontWeight:800, color:p.accent}}>{p.price} ₽</span>
                  <span style={{fontSize:13, color:'#9990b0'}}> {p.period}</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:8, marginBottom:24}}>
                  {p.features.map(f => (
                    <div key={f} style={{display:'flex', gap:8, fontSize:14, color:'#5a5270'}}>
                      <span style={{color:p.accent}}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button style={{
                  width:'100%', padding:'12px', borderRadius:14, border:'none',
                  background: p.popular ? 'linear-gradient(135deg,#7C6FCD,#9B8FE0)' : p.accent === '#F5856A' ? '#fff0eb' : '#f0edff',
                  color: p.popular ? 'white' : p.accent,
                  fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Nunito,sans-serif',
                  boxShadow: p.popular ? '0 4px 16px rgba(124,111,205,0.35)' : 'none',
                }} onClick={() => setAuthModal('register')}>{p.btn}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={lStyles.section}>
        <div style={lStyles.container}>
          <div style={lStyles.sectionHeader}>
            <h2 style={lStyles.h2}>Команда</h2>
            <p style={lStyles.sectionSub}>Два эксперта и технический директор</p>
          </div>
          <div style={lStyles.teamGrid}>
            {[
              { name:'Катя', role:'Эксперт-ведущий', emoji:'👩‍💻', desc:'Проводит воркшопы, создаёт базу знаний, разрабатывает шаблоны промтов' },
              { name:'Таня', role:'Эксперт-ведущий', emoji:'👩‍🎨', desc:'Ведёт воркшопы и сессии, даёт альтернативную экспертную точку зрения' },
              { name:'Антон', role:'Тех. директор + Маркетинг', emoji:'👨‍💼', desc:'Отвечает за техническую часть, маркетинг и продажи. Строит AI-агентов для бизнеса' },
            ].map(t => (
              <div key={t.name} style={lStyles.teamCard}>
                <div style={lStyles.teamAvatar}>{t.emoji}</div>
                <h3 style={{fontSize:18, fontWeight:700, color:'#2D2640', marginBottom:4}}>{t.name}</h3>
                <div style={{fontSize:12, color:'#7C6FCD', fontWeight:600, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.05em'}}>{t.role}</div>
                <p style={{fontSize:14, color:'#7B7491', lineHeight:1.6}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{...lStyles.section, background:'linear-gradient(135deg,#7C6FCD 0%,#9B8FE0 100%)'}}>
        <div style={{...lStyles.container, textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(24px,4vw,40px)', fontWeight:800, color:'white', marginBottom:12}}>Готов попробовать?</h2>
          <p style={{fontSize:16, color:'rgba(255,255,255,0.8)', marginBottom:32}}>Начни с бесплатного вводного урока — без обязательств</p>
          <button style={{...lStyles.btnPrimary, background:'white', color:'#7C6FCD', fontSize:16, padding:'14px 40px'}} onClick={() => setAuthModal('register')}>
            Начать бесплатно
          </button>
        </div>
      </section>
    </div>
  );
};

const lStyles = {
  hero: {
    display:'flex', alignItems:'center', flexWrap:'wrap', gap:40,
    padding:'72px 24px 64px', maxWidth:1200, margin:'0 auto',
    minHeight:520,
  },
  heroInner: { flex:'1 1 400px', maxWidth:580 },
  heroBadge: {
    display:'inline-block', padding:'6px 16px', borderRadius:20,
    background:'#ede9ff', color:'#7C6FCD', fontSize:13, fontWeight:600, marginBottom:20,
  },
  heroH1: {
    fontSize:'clamp(32px,4.5vw,56px)', fontWeight:800, color:'#2D2640',
    lineHeight:1.15, margin:'0 0 16px',
  },
  heroSub: { fontSize:16, color:'#7B7491', lineHeight:1.7, marginBottom:32, maxWidth:480 },
  heroBtns: { display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 },
  heroStats: { display:'flex', gap:32, flexWrap:'wrap' },
  heroStat: { display:'flex', flexDirection:'column', gap:2 },
  heroStatNum: { fontSize:22, fontWeight:800, color:'#2D2640' },
  heroStatLabel: { fontSize:12, color:'#9990b0', fontWeight:500 },
  heroVisual: { flex:'1 1 280px', display:'flex', justifyContent:'center' },
  heroCard: {
    background:'white', borderRadius:24, padding:28, width:'100%', maxWidth:300,
    boxShadow:'0 16px 48px rgba(124,111,205,0.15)',
  },
  section: { padding:'64px 24px' },
  container: { maxWidth:1200, margin:'0 auto' },
  sectionHeader: { textAlign:'center', marginBottom:48 },
  h2: { fontSize:'clamp(24px,3vw,36px)', fontWeight:800, color:'#2D2640', margin:'0 0 8px' },
  sectionSub: { fontSize:15, color:'#9990b0', margin:0 },
  stepsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:20 },
  stepCard: {
    background:'white', borderRadius:20, padding:'28px 24px',
    boxShadow:'0 4px 20px rgba(124,111,205,0.08)', position:'relative',
  },
  stepNum: {
    position:'absolute', top:20, right:20, width:28, height:28, borderRadius:'50%',
    background:'#ede9ff', color:'#7C6FCD', fontSize:13, fontWeight:800,
    display:'flex', alignItems:'center', justifyContent:'center',
  },
  cardsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 },
  wCard: {
    background:'white', borderRadius:20, padding:24, cursor:'pointer',
    boxShadow:'0 4px 20px rgba(124,111,205,0.08)',
    transition:'transform 0.15s, box-shadow 0.15s',
    border:'1.5px solid transparent',
  },
  wCardTop: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 },
  wCardTitle: { fontSize:17, fontWeight:700, color:'#2D2640', marginBottom:10, lineHeight:1.35 },
  wCardMeta: { display:'flex', gap:12, fontSize:13, color:'#9990b0', marginBottom:16, flexWrap:'wrap' },
  wCardFooter: { display:'flex', justifyContent:'space-between', alignItems:'center' },
  tag: { fontSize:11, fontWeight:700, color:'#7C6FCD', background:'#ede9ff', padding:'3px 10px', borderRadius:8 },
  price: { fontSize:20, fontWeight:800, color:'#7C6FCD' },
  pricingGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20, maxWidth:900, margin:'0 auto' },
  priceCard: {
    background:'white', borderRadius:24, padding:'32px 28px', position:'relative',
    boxShadow:'0 4px 20px rgba(124,111,205,0.08)', border:'1.5px solid #ede9ff',
  },
  priceCardPopular: { border:'2px solid #7C6FCD', boxShadow:'0 8px 32px rgba(124,111,205,0.2)' },
  popularBadge: {
    position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)',
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white',
    padding:'4px 16px', borderRadius:12, fontSize:12, fontWeight:700, whiteSpace:'nowrap',
  },
  teamGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:20 },
  teamCard: {
    background:'white', borderRadius:20, padding:'32px 24px', textAlign:'center',
    boxShadow:'0 4px 20px rgba(124,111,205,0.08)',
  },
  teamAvatar: {
    fontSize:52, marginBottom:16, width:80, height:80,
    background:'linear-gradient(135deg,#f0edff,#fff0eb)', borderRadius:'50%',
    display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px',
  },
  freeBlock: {
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)',
    borderRadius:20, padding:'28px 32px', display:'flex',
    alignItems:'center', gap:20, flexWrap:'wrap', color:'white',
  },
  btnPrimary: {
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none',
    color:'white', borderRadius:14, padding:'12px 28px', fontSize:15, fontWeight:700,
    cursor:'pointer', boxShadow:'0 4px 16px rgba(124,111,205,0.35)',
    fontFamily:'Nunito,sans-serif',
  },
  btnSecondary: {
    background:'none', border:'1.5px solid #7C6FCD', color:'#7C6FCD',
    borderRadius:14, padding:'12px 24px', fontSize:15, fontWeight:700,
    cursor:'pointer', fontFamily:'Nunito,sans-serif',
  },
  btnSmall: {
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none',
    color:'white', borderRadius:10, padding:'8px 18px', fontSize:13, fontWeight:700,
    cursor:'pointer', fontFamily:'Nunito,sans-serif',
  },
};

Object.assign(window, { Landing, lStyles });
