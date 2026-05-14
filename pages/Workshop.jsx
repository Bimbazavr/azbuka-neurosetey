// Workshop detail page
const WorkshopDetail = ({ workshopId, setPage, setAuthModal, currentUser, setPaymentWorkshop }) => {
  const w = WORKSHOPS_DATA.find(x => x.id === workshopId) || WORKSHOPS_DATA[0];
  const [activeTab, setActiveTab] = React.useState('program');
  const [reviewText, setReviewText] = React.useState('');

  const program = [
    { time:'19:00–19:15', title:'Знакомство и анкета задач', desc:'Каждый участник озвучивает свою задачу' },
    { time:'19:15–20:30', title:'Практика — основная часть', desc:'Работаем с реальными задачами участников в прямом эфире' },
    { time:'20:30–20:45', title:'Перерыв', desc:'' },
    { time:'20:45–21:30', title:'Разбор и вопросы', desc:'Дополнительные кейсы, вопросы-ответы' },
    { time:'21:30–22:00', title:'Итоги и материалы', desc:'Шаблоны промтов и доступ к записи на 30 дней' },
  ];

  const reviews = [
    { name:'Алексей М.', stars:5, text:'Пришёл с задачей написать КП — ушёл с готовым шаблоном и пониманием, как его адаптировать. Очень практично!' },
    { name:'Марина К.', stars:5, text:'Катя объясняет простым языком, без лишней теории. За 3 часа освоила то, на что тратила дни.' },
    { name:'Дмитрий С.', stars:4, text:'Хороший формат. Группа небольшая — можно задать любой вопрос. Рекомендую новичкам.' },
  ];

  const tabs = [
    { id:'program', label:'Программа' },
    { id:'teacher', label:'Преподаватель' },
    { id:'reviews', label:`Отзывы (${reviews.length})` },
    { id:'faq', label:'Вопросы' },
  ];

  return (
    <div style={wdStyles.page}>
      <div style={wdStyles.breadcrumb}>
        <button style={wdStyles.back} onClick={() => setPage('catalog')}>← Все воркшопы</button>
        <span style={{color:'#c0bad8', fontSize:13}}> / </span>
        <span style={{fontSize:13, color:'#9990b0'}}>{w.title}</span>
      </div>

      <div style={wdStyles.container}>
        {/* Left: main content */}
        <div style={wdStyles.main}>
          <div style={{display:'flex', gap:8, marginBottom:16, flexWrap:'wrap'}}>
            <span style={wdStyles.tag}>{w.tag}</span>
            <span style={{...wdStyles.tag, background:'#fff0eb', color:'#F5856A'}}>{w.level}</span>
            <span style={{...wdStyles.tag, background:'#e8f8f2', color:'#4CAF8A'}}>{w.format}</span>
          </div>

          <h1 style={wdStyles.h1}>{w.emoji} {w.title}</h1>
          <p style={wdStyles.desc}>{w.desc}</p>

          <div style={wdStyles.metaRow}>
            {[['📅', w.date],['⏱', w.duration],['👩‍🏫', w.teacher],['👥', `${w.seats} мест`],['💻','Яндекс.Телемост']].map(([icon,val])=>(
              <div key={val} style={wdStyles.metaItem}><span>{icon}</span><span>{val}</span></div>
            ))}
          </div>

          {/* Tabs */}
          <div style={wdStyles.tabs}>
            {tabs.map(t => (
              <button key={t.id} style={{...wdStyles.tab, ...(activeTab===t.id ? wdStyles.tabActive : {})}}
                onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>

          {activeTab === 'program' && (
            <div style={wdStyles.tabContent}>
              <div style={wdStyles.programList}>
                {program.map((p,i) => (
                  <div key={i} style={wdStyles.programItem}>
                    <div style={wdStyles.programTime}>{p.time}</div>
                    <div style={wdStyles.programDot} />
                    <div style={wdStyles.programBody}>
                      <div style={{fontWeight:700, color:'#2D2640', marginBottom:4}}>{p.title}</div>
                      {p.desc && <div style={{fontSize:13, color:'#9990b0'}}>{p.desc}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={wdStyles.includes}>
                <div style={{fontWeight:700, color:'#2D2640', marginBottom:16}}>Что входит</div>
                <div style={wdStyles.includesGrid}>
                  {['🎥 Запись эфира на 30 дней','📋 Шаблоны промтов','💬 Чат с преподавателем','📌 Доступ к базе знаний на 7 дней'].map(f=>(
                    <div key={f} style={wdStyles.includeItem}>{f}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div style={wdStyles.tabContent}>
              <div style={wdStyles.teacherCard}>
                <div style={wdStyles.teacherAvatar}>{w.teacher === 'Катя' ? '👩‍💻' : w.teacher === 'Таня' ? '👩‍🎨' : '👨‍💼'}</div>
                <div>
                  <h3 style={{fontSize:20, fontWeight:800, color:'#2D2640', marginBottom:4}}>{w.teacher}</h3>
                  <div style={{fontSize:13, color:'#7C6FCD', fontWeight:600, marginBottom:12}}>Эксперт-ведущий · Азбука нейросетей</div>
                  <p style={{fontSize:14, color:'#7B7491', lineHeight:1.7}}>
                    {w.teacher === 'Катя'
                      ? 'Работает с нейросетями в дизайне, контенте и консультациях. Специализируется на практическом применении ChatGPT и инструментов для создания контента.'
                      : w.teacher === 'Таня'
                      ? 'Эксперт по AI-инструментам для дизайнеров и контент-мейкеров. Создаёт базу знаний и шаблоны промтов для участников проекта.'
                      : 'Технический директор проекта. Строит AI-агентов для бизнеса и автоматизирует процессы с помощью нейросетей.'}
                  </p>
                  <div style={{display:'flex', gap:8, marginTop:16, flexWrap:'wrap'}}>
                    {['ChatGPT','Midjourney','Claude','Автоматизация'].map(s=>(
                      <span key={s} style={{background:'#f0edff', color:'#7C6FCD', padding:'4px 12px', borderRadius:8, fontSize:12, fontWeight:600}}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={wdStyles.tabContent}>
              <div style={{display:'flex', gap:12, marginBottom:24}}>
                <div style={{textAlign:'center', background:'#f0edff', borderRadius:16, padding:'16px 24px'}}>
                  <div style={{fontSize:36, fontWeight:800, color:'#7C6FCD'}}>4.9</div>
                  <div style={{fontSize:18}}>⭐⭐⭐⭐⭐</div>
                  <div style={{fontSize:12, color:'#9990b0'}}>{reviews.length} отзыва</div>
                </div>
                <div style={{flex:1, display:'flex', flexDirection:'column', gap:4, justifyContent:'center'}}>
                  {[5,4,3].map(s => (
                    <div key={s} style={{display:'flex', alignItems:'center', gap:8}}>
                      <span style={{fontSize:12, color:'#9990b0', width:16}}>{s}★</span>
                      <div style={{flex:1, height:6, background:'#f0eef8', borderRadius:4, overflow:'hidden'}}>
                        <div style={{height:'100%', background:'#7C6FCD', borderRadius:4, width: s===5?'80%':s===4?'15%':'5%'}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                {reviews.map((r,i) => (
                  <div key={i} style={wdStyles.reviewCard}>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
                      <div style={{fontWeight:700, color:'#2D2640'}}>{r.name}</div>
                      <div>{'⭐'.repeat(r.stars)}</div>
                    </div>
                    <div style={{fontSize:14, color:'#5a5270', lineHeight:1.7}}>{r.text}</div>
                  </div>
                ))}
              </div>
              {currentUser && (
                <div style={{marginTop:24}}>
                  <textarea placeholder="Поделитесь впечатлением..." value={reviewText} onChange={e=>setReviewText(e.target.value)}
                    style={{width:'100%', padding:14, borderRadius:14, border:'1.5px solid #ede9ff', fontSize:14, fontFamily:'Nunito,sans-serif', outline:'none', resize:'vertical', minHeight:80, boxSizing:'border-box'}}/>
                  <button style={{...wdStyles.enrollBtn, marginTop:8}} onClick={()=>setReviewText('')}>Отправить отзыв</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'faq' && (
            <div style={wdStyles.tabContent}>
              {[
                ['Нужен ли опыт работы с нейросетями?', 'Нет, воркшоп рассчитан на полных новичков. Мы начинаем с основ.'],
                ['Что нужно для участия?', 'Компьютер или ноутбук с интернетом. Яндекс ID для входа в Телемост.'],
                ['Как получить запись?', 'После воркшопа запись автоматически появится в вашем личном кабинете и будет доступна 30 дней.'],
                ['Можно ли вернуть деньги?', 'Да, в течение 24 часов до начала воркшопа — полный возврат через ЮKassa.'],
                ['Сколько человек в группе?', `8–15 человек — это позволяет каждому получить внимание преподавателя.`],
              ].map(([q,a],i) => <FaqItem key={i} q={q} a={a} />)}
            </div>
          )}
        </div>

        {/* Right: sticky enroll card */}
        <div style={wdStyles.sidecard}>
          <div style={{fontSize:32, textAlign:'center', marginBottom:8}}>{w.emoji}</div>
          <div style={{fontSize:26, fontWeight:800, color:'#7C6FCD', textAlign:'center', marginBottom:4}}>
            {w.price.toLocaleString()} ₽
          </div>
          <div style={{fontSize:13, color:'#9990b0', textAlign:'center', marginBottom:20}}>за 2 сессии воркшопа</div>

          <div style={{display:'flex', flexDirection:'column', gap:8, marginBottom:20}}>
            {['📅 '+w.date+' в 19:00','⏱ '+w.duration,'👩‍🏫 Ведёт: '+w.teacher,'👥 Осталось '+w.seats+' мест','💻 Яндекс.Телемост'].map(item=>(
              <div key={item} style={{fontSize:13, color:'#5a5270', display:'flex', gap:8}}>{item}</div>
            ))}
          </div>

          <button style={wdStyles.enrollBtn} onClick={() => {
            if (!currentUser) { setAuthModal('register'); return; }
            setPaymentWorkshop(w);
          }}>
            {currentUser ? 'Оплатить участие' : 'Записаться'}
          </button>
          <button style={{...wdStyles.enrollBtn, background:'none', color:'#7C6FCD', border:'1.5px solid #7C6FCD', boxShadow:'none', marginTop:8}}
            onClick={() => setPage('catalog')}>
            Смотреть другие
          </button>

          <div style={{textAlign:'center', marginTop:16, fontSize:12, color:'#c0bad8'}}>
            🔒 Безопасная оплата через ЮKassa
          </div>
          <div style={{textAlign:'center', fontSize:12, color:'#c0bad8', marginTop:4}}>
            Возврат в течение 24 часов до начала
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({q, a}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{borderBottom:'1px solid #f0eef8', padding:'16px 0'}}>
      <button style={{width:'100%', textAlign:'left', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}
        onClick={() => setOpen(!open)}>
        <span style={{fontSize:15, fontWeight:600, color:'#2D2640'}}>{q}</span>
        <span style={{color:'#7C6FCD', fontSize:18, flexShrink:0}}>{open?'−':'+'}</span>
      </button>
      {open && <div style={{fontSize:14, color:'#7B7491', lineHeight:1.7, marginTop:10, paddingRight:24}}>{a}</div>}
    </div>
  );
};

const wdStyles = {
  page: { background:'#faf9ff', minHeight:'100vh', paddingBottom:60 },
  breadcrumb: { maxWidth:1200, margin:'0 auto', padding:'20px 24px', display:'flex', alignItems:'center', gap:8 },
  back: { background:'none', border:'none', color:'#7C6FCD', fontWeight:600, cursor:'pointer', fontSize:13, padding:0 },
  container: { maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', gap:28, alignItems:'flex-start', flexWrap:'wrap' },
  main: { flex:'1 1 520px', minWidth:0 },
  h1: { fontSize:'clamp(22px,3vw,34px)', fontWeight:800, color:'#2D2640', margin:'0 0 12px', lineHeight:1.25 },
  desc: { fontSize:15, color:'#7B7491', lineHeight:1.7, margin:'0 0 20px' },
  tag: { fontSize:11, fontWeight:700, color:'#7C6FCD', background:'#ede9ff', padding:'4px 12px', borderRadius:8 },
  metaRow: { display:'flex', gap:12, flexWrap:'wrap', marginBottom:28 },
  metaItem: { display:'flex', gap:6, alignItems:'center', fontSize:13, color:'#5a5270', background:'#f7f5ff', padding:'6px 12px', borderRadius:10 },
  tabs: { display:'flex', gap:0, borderBottom:'2px solid #f0eef8', marginBottom:28, overflowX:'auto' },
  tab: { padding:'12px 20px', background:'none', border:'none', fontSize:14, fontWeight:600, color:'#9990b0', cursor:'pointer', whiteSpace:'nowrap', borderBottom:'2px solid transparent', marginBottom:-2 },
  tabActive: { color:'#7C6FCD', borderBottomColor:'#7C6FCD' },
  tabContent: {},
  programList: { display:'flex', flexDirection:'column', gap:0, marginBottom:28, position:'relative', paddingLeft:20 },
  programItem: { display:'flex', gap:12, paddingBottom:20, position:'relative' },
  programTime: { fontSize:12, color:'#9990b0', fontWeight:600, width:90, flexShrink:0, paddingTop:2 },
  programDot: { width:10, height:10, borderRadius:'50%', background:'#7C6FCD', flexShrink:0, marginTop:4 },
  programBody: { flex:1 },
  includes: { background:'#f7f5ff', borderRadius:16, padding:20 },
  includesGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 },
  includeItem: { fontSize:13, color:'#5a5270', background:'white', borderRadius:10, padding:'10px 12px', fontWeight:500 },
  teacherCard: { display:'flex', gap:20, background:'#f7f5ff', borderRadius:20, padding:24, flexWrap:'wrap' },
  teacherAvatar: {
    fontSize:52, width:80, height:80, borderRadius:20,
    background:'linear-gradient(135deg,#ede9ff,#fff0eb)',
    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
  },
  reviewCard: { background:'#f7f5ff', borderRadius:16, padding:18 },
  sidecard: {
    width:300, flexShrink:0, background:'white', borderRadius:24, padding:28,
    boxShadow:'0 8px 32px rgba(124,111,205,0.12)', position:'sticky', top:80,
    border:'1.5px solid #ede9ff',
  },
  enrollBtn: {
    width:'100%', padding:14, borderRadius:14, border:'none',
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white',
    fontWeight:700, fontSize:15, cursor:'pointer', boxShadow:'0 4px 16px rgba(124,111,205,0.35)',
    fontFamily:'Nunito,sans-serif',
  },
};

Object.assign(window, { WorkshopDetail, FaqItem, wdStyles });
