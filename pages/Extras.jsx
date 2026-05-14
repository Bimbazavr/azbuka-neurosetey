// FAQ + About + Payment components

// ---- FAQ PAGE ----
const FAQPage = ({ setPage, setAuthModal }) => {
  const sections = [
    { title:'Об обучении', items:[
      ['Нужен ли опыт работы с нейросетями?','Нет. «Азбука нейросетей» создана специально для тех, кто начинает с нуля. На воркшопе объясняем всё с самых основ — не страшно задавать любые вопросы.'],
      ['Что такое воркшоп в отличие от курса?','Воркшоп — это живой эфир 2–3 часа, где каждый участник работает над своей конкретной задачей. Не записанные лекции, а практика здесь и сейчас.'],
      ['Сколько человек в группе?','8–15 человек. Небольшой размер позволяет каждому получить внимание преподавателя и разобрать свою задачу.'],
      ['Как выглядит структура воркшопа?','Анкета задач → Живой эфир Сессии 1 (2–3 часа) → Неделя практики → Сессия 2 (разбор вопросов). Запись хранится 30 дней.'],
    ]},
    { title:'Оплата и доступ', items:[
      ['Как оплатить участие?','Оплата через ЮKassa: карта, СБП или ЮMoney. После оплаты вы автоматически получаете ссылку на Яндекс.Телемост и доступ к материалам.'],
      ['Можно ли вернуть деньги?','Да. Полный возврат в течение 24 часов до начала воркшопа. Обратитесь через чат поддержки или email.'],
      ['Что входит в стоимость?','2 живые сессии, запись эфира на 30 дней, шаблоны промтов, доступ к базе знаний на 7 дней, чат с преподавателем.'],
      ['Как работает подписка на базу знаний?','990–1 500 ₽/мес. Автоматическое списание через ЮKassa каждые 30 дней. Отменить можно в любой момент в личном кабинете.'],
    ]},
    { title:'Технические вопросы', items:[
      ['Что нужно для участия?','Компьютер или ноутбук с интернетом. Яндекс ID (бесплатная регистрация) для входа в Яндекс.Телемост.'],
      ['Где хранятся материалы?','На Яндекс.Диске — надёжно, без иностранных сервисов. Доступ через ваш Яндекс ID.'],
      ['Что если не смогу присутствовать на эфире?','Запись будет доступна в вашем личном кабинете на 30 дней. Вопросы можно задать письменно до начала сессии 2.'],
      ['Как работает консультация 1:1?','60 минут в Яндекс.Телемост с Катей или Таней. Запись сессии и материалы — на ваш Яндекс.Диск.'],
    ]},
    { title:'Преподаватели', items:[
      ['Кто ведёт воркшопы?','Катя и Таня — эксперты-практики, которые каждый день работают с нейросетями. Антон — технический директор, строит AI-агентов для бизнеса.'],
      ['Можно ли выбрать конкретного преподавателя?','Да, в карточке воркшопа указан ведущий. Для консультации 1:1 выбирайте Катю или Таню по записи.'],
    ]},
  ];

  return (
    <div style={faqStyles.page}>
      <div style={faqStyles.header}>
        <div style={faqStyles.headerInner}>
          <h1 style={faqStyles.h1}>Частые вопросы</h1>
          <p style={faqStyles.sub}>Ответы на всё, что хотели спросить</p>
        </div>
      </div>

      <div style={faqStyles.container}>
        <div style={faqStyles.main}>
          {sections.map(s => (
            <div key={s.title} style={faqStyles.section}>
              <h2 style={faqStyles.sectionTitle}>{s.title}</h2>
              {s.items.map(([q,a],i) => <FaqItem key={i} q={q} a={a}/>)}
            </div>
          ))}
        </div>

        <div style={faqStyles.sidebar}>
          <div style={faqStyles.supportCard}>
            <div style={{fontSize:36, marginBottom:12}}>💬</div>
            <h3 style={{fontWeight:800, color:'#2D2640', marginBottom:8}}>Не нашли ответ?</h3>
            <p style={{fontSize:14, color:'#7B7491', lineHeight:1.6, marginBottom:20}}>Напишите нам — ответим в течение нескольких часов</p>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              {[
                ['📧','Email','hello@azbuka-ai.ru'],
                ['💬','Telegram','@azbuka_ai'],
                ['📞','Телефон','+7 (800) 000-00-00'],
              ].map(([icon,label,val]) => (
                <div key={label} style={faqStyles.contactRow}>
                  <span style={{fontSize:18}}>{icon}</span>
                  <div>
                    <div style={{fontSize:11, color:'#9990b0', fontWeight:600}}>{label}</div>
                    <div style={{fontSize:13, color:'#7C6FCD', fontWeight:700}}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{...faqStyles.supportCard, background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white', marginTop:16}}>
            <div style={{fontSize:32, marginBottom:8}}>🎁</div>
            <div style={{fontWeight:700, fontSize:16, marginBottom:8}}>Бесплатный урок</div>
            <div style={{fontSize:13, opacity:0.85, marginBottom:16}}>30-минутное введение — что такое нейросети и с чего начать</div>
            <button style={{width:'100%', padding:'10px', borderRadius:12, border:'none', background:'white', color:'#7C6FCD', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}
              onClick={() => setAuthModal('register')}>
              Смотреть бесплатно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqStyles = {
  page: { background:'#faf9ff', minHeight:'100vh' },
  header: { background:'linear-gradient(135deg,#f7f5ff,#fff0eb)', padding:'48px 24px 32px' },
  headerInner: { maxWidth:1200, margin:'0 auto' },
  h1: { fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#2D2640', margin:'0 0 8px' },
  sub: { fontSize:16, color:'#9990b0', margin:0 },
  container: { maxWidth:1200, margin:'0 auto', padding:'32px 24px', display:'flex', gap:28, alignItems:'flex-start', flexWrap:'wrap' },
  main: { flex:'1 1 520px' },
  section: { marginBottom:36 },
  sectionTitle: { fontSize:18, fontWeight:800, color:'#7C6FCD', marginBottom:8, paddingBottom:12, borderBottom:'2px solid #ede9ff' },
  sidebar: { width:280, flexShrink:0 },
  supportCard: { background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(124,111,205,0.08)' },
  contactRow: { display:'flex', gap:12, alignItems:'center', background:'#f7f5ff', borderRadius:12, padding:'10px 14px' },
};

// ---- ABOUT PAGE ----
const AboutPage = ({ setPage, setAuthModal }) => (
  <div style={{background:'#faf9ff', minHeight:'100vh'}}>
    <div style={{background:'linear-gradient(135deg,#f7f5ff,#fff0eb)', padding:'48px 24px 32px'}}>
      <div style={{maxWidth:800, margin:'0 auto', textAlign:'center'}}>
        <h1 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#2D2640', margin:'0 0 16px'}}>О проекте</h1>
        <p style={{fontSize:16, color:'#7B7491', lineHeight:1.7, maxWidth:600, margin:'0 auto'}}>
          «Азбука нейросетей» — не записанные курсы, а живые воркшопы. Каждый участник приходит со своей конкретной задачей и уходит с готовым результатом.
        </p>
      </div>
    </div>

    <div style={{maxWidth:1200, margin:'0 auto', padding:'48px 24px'}}>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20, marginBottom:48}}>
        {[
          {icon:'🎯', title:'Практический результат', desc:'Вы работаете над своей задачей прямо на эфире — не слушаете теорию, а получаете результат'},
          {icon:'👥', title:'Маленькие группы', desc:'8–15 человек — каждый получает внимание преподавателя и разбор своей задачи'},
          {icon:'🔄', title:'Контент всегда актуален', desc:'Живой формат — информация создаётся здесь и сейчас, не устаревает'},
          {icon:'🛡️', title:'100% Яндекс 360', desc:'Никаких иностранных сервисов, никаких блокировок — единый вход через Яндекс ID'},
        ].map(f => (
          <div key={f.title} style={{background:'white', borderRadius:20, padding:28, boxShadow:'0 4px 20px rgba(124,111,205,0.08)'}}>
            <div style={{fontSize:40, marginBottom:16}}>{f.icon}</div>
            <h3 style={{fontSize:16, fontWeight:700, color:'#2D2640', marginBottom:8}}>{f.title}</h3>
            <p style={{fontSize:14, color:'#7B7491', lineHeight:1.6}}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', marginBottom:48}}>
        <h2 style={{fontSize:'clamp(22px,3vw,32px)', fontWeight:800, color:'#2D2640', marginBottom:12}}>Команда</h2>
        <p style={{fontSize:15, color:'#9990b0'}}>Трое, кто строит «Азбуку нейросетей»</p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20, marginBottom:48}}>
        {[
          { name:'Катя', role:'Эксперт-ведущий', emoji:'👩‍💻', color:'#ede9ff',
            desc:'Работает с нейросетями в дизайне, контенте и консультациях. Проводит воркшопы, создаёт базу знаний и шаблоны промтов.',
            tags:['ChatGPT','Контент','Промты'] },
          { name:'Таня', role:'Эксперт-ведущий', emoji:'👩‍🎨', color:'#fff0eb',
            desc:'Эксперт по AI-инструментам для дизайнеров и контент-мейкеров. Даёт альтернативную экспертную точку зрения.',
            tags:['Midjourney','Дизайн','Соцсети'] },
          { name:'Антон', role:'Тех. директор + Маркетинг', emoji:'👨‍💼', color:'#e8f8f2',
            desc:'Строит AI-агентов для бизнеса, отвечает за всю техническую часть, маркетинг и аналитику проекта.',
            tags:['AI-агенты','Автоматизация','SMM'] },
        ].map(t => (
          <div key={t.name} style={{background:'white', borderRadius:20, padding:'32px 24px', textAlign:'center', boxShadow:'0 4px 20px rgba(124,111,205,0.08)'}}>
            <div style={{width:80, height:80, borderRadius:'50%', background:t.color, fontSize:40, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px'}}>
              {t.emoji}
            </div>
            <h3 style={{fontSize:20, fontWeight:800, color:'#2D2640', marginBottom:4}}>{t.name}</h3>
            <div style={{fontSize:12, color:'#7C6FCD', fontWeight:700, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.05em'}}>{t.role}</div>
            <p style={{fontSize:14, color:'#7B7491', lineHeight:1.6, marginBottom:16}}>{t.desc}</p>
            <div style={{display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap'}}>
              {t.tags.map(tag => <span key={tag} style={{background:'#f7f5ff', color:'#7C6FCD', padding:'3px 10px', borderRadius:8, fontSize:11, fontWeight:700}}>{tag}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div style={{background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', borderRadius:24, padding:'48px 32px', textAlign:'center', color:'white'}}>
        <h2 style={{fontSize:'clamp(22px,3vw,32px)', fontWeight:800, marginBottom:12}}>Готовы попробовать?</h2>
        <p style={{fontSize:15, opacity:0.85, marginBottom:28}}>Начните с бесплатного вводного урока — без обязательств</p>
        <button style={{background:'white', color:'#7C6FCD', border:'none', borderRadius:14, padding:'13px 36px', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}
          onClick={() => setAuthModal('register')}>
          Начать бесплатно
        </button>
      </div>
    </div>
  </div>
);

// ---- PAYMENT MODAL ----
const Payment = ({ workshop, onClose, onSuccess }) => {
  const [step, setStep] = React.useState(1); // 1=form, 2=success
  const [method, setMethod] = React.useState('card');
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ card:'', expiry:'', cvv:'', name:'' });

  const pay = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1500);
  };

  if (step === 2) return (
    <div style={authStyles.overlay} onClick={onClose}>
      <div style={{...authStyles.modal, textAlign:'center'}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:64, marginBottom:16}}>🎉</div>
        <h2 style={{fontSize:24, fontWeight:800, color:'#2D2640', marginBottom:8}}>Оплата прошла!</h2>
        <p style={{fontSize:15, color:'#7B7491', marginBottom:24}}>Ссылка на Яндекс.Телемост и материалы отправлены на вашу почту</p>
        <div style={{background:'#f7f5ff', borderRadius:16, padding:16, marginBottom:24, textAlign:'left'}}>
          <div style={{fontWeight:700, color:'#2D2640', marginBottom:8}}>{workshop?.emoji} {workshop?.title}</div>
          <div style={{fontSize:13, color:'#9990b0'}}>📅 {workshop?.date} · 👩‍🏫 {workshop?.teacher}</div>
        </div>
        <button style={{...authStyles.submit, marginTop:0}} onClick={() => { onSuccess(); onClose(); }}>
          Перейти в личный кабинет
        </button>
      </div>
    </div>
  );

  return (
    <div style={authStyles.overlay} onClick={onClose}>
      <div style={{...authStyles.modal, maxWidth:460}} onClick={e=>e.stopPropagation()}>
        <button style={authStyles.close} onClick={onClose}>✕</button>
        <h2 style={{fontSize:20, fontWeight:800, color:'#2D2640', marginBottom:4}}>Оплата участия</h2>
        <div style={{fontSize:14, color:'#9990b0', marginBottom:20}}>Защищено ЮKassa · Безопасная оплата</div>

        <div style={{background:'#f7f5ff', borderRadius:16, padding:16, marginBottom:20}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700, color:'#2D2640', fontSize:15}}>{workshop?.emoji} {workshop?.title}</div>
              <div style={{fontSize:12, color:'#9990b0'}}>📅 {workshop?.date} · 👩‍🏫 {workshop?.teacher}</div>
            </div>
            <div style={{fontSize:22, fontWeight:800, color:'#7C6FCD'}}>{workshop?.price?.toLocaleString()} ₽</div>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginBottom:20}}>
          {[['card','💳 Карта'],['sbp','СБП'],['ymoney','ЮMoney']].map(([v,l]) => (
            <button key={v} style={{flex:1, padding:'9px 4px', borderRadius:12, border:`1.5px solid ${method===v?'#7C6FCD':'#ede9ff'}`, background:method===v?'#f0edff':'none', color:method===v?'#7C6FCD':'#9990b0', fontWeight:600, fontSize:12, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}
              onClick={() => setMethod(v)}>{l}</button>
          ))}
        </div>

        <form onSubmit={pay}>
          {method === 'card' && (
            <>
              <div style={authStyles.field}>
                <label style={authStyles.label}>Номер карты</label>
                <input style={authStyles.input} placeholder="0000 0000 0000 0000" value={form.card} onChange={e=>setForm({...form,card:e.target.value})} required/>
              </div>
              <div style={{display:'flex', gap:12}}>
                <div style={{...authStyles.field, flex:1}}>
                  <label style={authStyles.label}>Срок</label>
                  <input style={authStyles.input} placeholder="MM/YY" value={form.expiry} onChange={e=>setForm({...form,expiry:e.target.value})} required/>
                </div>
                <div style={{...authStyles.field, flex:1}}>
                  <label style={authStyles.label}>CVV</label>
                  <input style={authStyles.input} placeholder="•••" type="password" value={form.cvv} onChange={e=>setForm({...form,cvv:e.target.value})} required/>
                </div>
              </div>
              <div style={authStyles.field}>
                <label style={authStyles.label}>Имя на карте</label>
                <input style={authStyles.input} placeholder="IVAN IVANOV" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
              </div>
            </>
          )}
          {method === 'sbp' && (
            <div style={{textAlign:'center', padding:'24px 0'}}>
              <div style={{fontSize:48, marginBottom:12}}>📱</div>
              <div style={{fontSize:14, color:'#7B7491'}}>После нажатия «Оплатить» откроется приложение вашего банка</div>
            </div>
          )}
          {method === 'ymoney' && (
            <div style={{textAlign:'center', padding:'24px 0'}}>
              <div style={{fontSize:48, marginBottom:12}}>💰</div>
              <div style={{fontSize:14, color:'#7B7491'}}>Вы будете перенаправлены на страницу ЮMoney</div>
            </div>
          )}
          <button type="submit" style={authStyles.submit} disabled={loading}>
            {loading ? '⏳ Обработка...' : `Оплатить ${workshop?.price?.toLocaleString()} ₽`}
          </button>
        </form>
        <div style={{textAlign:'center', marginTop:12, fontSize:12, color:'#c0bad8'}}>🔒 Данные зашифрованы · Возврат в течение 24 ч до начала</div>
      </div>
    </div>
  );
};

Object.assign(window, { FAQPage, AboutPage, Payment, faqStyles });
