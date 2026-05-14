// Student Dashboard
const StudentDashboard = ({ currentUser, setPage, setAuthModal }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [chatMsg, setChatMsg] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from:'teacher', name:'Катя', text:'Привет! Как продвигается практика после воркшопа?', time:'вчера' },
    { from:'student', name:'Я', text:'Всё хорошо, уже применила промты для своих КП!', time:'вчера' },
    { from:'teacher', name:'Катя', text:'Отлично! Если будут вопросы — пиши 😊', time:'10:30' },
  ]);

  const myWorkshops = [
    { id:1, title:'ChatGPT для предпринимателя', emoji:'🤖', date:'26 апр', progress:75, status:'active' },
    { id:2, title:'Нейросети для дизайнера', emoji:'🎨', date:'3 мая', progress:0, status:'upcoming' },
  ];

  const materials = [
    { title:'Запись воркшопа — ChatGPT для бизнеса', type:'video', size:'1.2 ГБ', date:'20 апр' },
    { title:'Шаблоны промтов — базовый набор', type:'doc', size:'245 КБ', date:'20 апр' },
    { title:'Алгоритм написания КП через ChatGPT', type:'doc', size:'118 КБ', date:'20 апр' },
    { title:'Домашнее задание — Практика промтов', type:'task', size:'—', date:'20 апр' },
  ];

  const recommended = [
    { id:3, title:'AI-контент для соцсетей', emoji:'✍️', price:2000, date:'10 мая' },
    { id:5, title:'Промт-инжиниринг: продвинутый', emoji:'⚙️', price:3500, date:'24 мая' },
  ];

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMessages(m => [...m, { from:'student', name:'Я', text:chatMsg, time:'сейчас' }]);
    setChatMsg('');
    setTimeout(() => {
      setMessages(m => [...m, { from:'teacher', name:'Катя', text:'Спасибо за вопрос! Отвечу в ближайшее время 👍', time:'сейчас' }]);
    }, 1200);
  };

  const tabs = [
    { id:'overview', label:'Обзор' },
    { id:'materials', label:'Материалы' },
    { id:'progress', label:'Прогресс' },
    { id:'chat', label:'Чат' },
  ];

  return (
    <div style={sdStyles.page}>
      {/* Header */}
      <div style={sdStyles.header}>
        <div style={sdStyles.headerInner}>
          <div style={sdStyles.welcome}>
            <div style={sdStyles.avatar}>{currentUser?.name?.[0] || 'У'}</div>
            <div>
              <div style={{fontSize:22, fontWeight:800, color:'#2D2640'}}>Привет, {currentUser?.name || 'Ученик'}! 👋</div>
              <div style={{fontSize:14, color:'#9990b0'}}>Личный кабинет ученика</div>
            </div>
          </div>
          <div style={sdStyles.statsRow}>
            {[['2', 'Воркшопа'], ['75%', 'Прогресс'], ['3', 'Материала']].map(([n,l]) => (
              <div key={l} style={sdStyles.statBox}>
                <div style={sdStyles.statNum}>{n}</div>
                <div style={sdStyles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={sdStyles.tabsBar}>
        <div style={sdStyles.tabsInner}>
          {tabs.map(t => (
            <button key={t.id} style={{...sdStyles.tab, ...(activeTab===t.id?sdStyles.tabActive:{})}}
              onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={sdStyles.container}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={sdStyles.grid2}>
            <div style={{display:'flex', flexDirection:'column', gap:20}}>
              <div style={sdStyles.card}>
                <div style={sdStyles.cardTitle}>Мои воркшопы</div>
                {myWorkshops.map(w => (
                  <div key={w.id} style={sdStyles.workshopRow}>
                    <span style={{fontSize:28}}>{w.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700, color:'#2D2640', fontSize:14, marginBottom:4}}>{w.title}</div>
                      <div style={{fontSize:12, color:'#9990b0', marginBottom:6}}>📅 {w.date} · {w.status === 'active' ? '🟢 Идёт сейчас' : '🔵 Предстоит'}</div>
                      {w.status === 'active' && (
                        <div style={sdStyles.progressBar}>
                          <div style={{...sdStyles.progressFill, width: w.progress+'%'}}/>
                        </div>
                      )}
                    </div>
                    <button style={sdStyles.btnMini} onClick={() => setPage('workshop-'+w.id)}>→</button>
                  </div>
                ))}
              </div>

              <div style={sdStyles.card}>
                <div style={sdStyles.cardTitle}>Рекомендуем для вас</div>
                {recommended.map(r => (
                  <div key={r.id} style={{...sdStyles.workshopRow, cursor:'pointer'}} onClick={() => setPage('workshop-'+r.id)}>
                    <span style={{fontSize:28}}>{r.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600, color:'#2D2640', fontSize:14}}>{r.title}</div>
                      <div style={{fontSize:12, color:'#9990b0'}}>📅 {r.date} · {r.price.toLocaleString()} ₽</div>
                    </div>
                    <span style={{fontSize:13, fontWeight:700, color:'#7C6FCD'}}>Записаться →</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex', flexDirection:'column', gap:20}}>
              <div style={sdStyles.card}>
                <div style={sdStyles.cardTitle}>Последние материалы</div>
                {materials.slice(0,3).map(m => (
                  <div key={m.title} style={sdStyles.materialRow}>
                    <span style={{fontSize:22}}>{m.type==='video'?'🎥':m.type==='task'?'📌':'📄'}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13, fontWeight:600, color:'#2D2640'}}>{m.title}</div>
                      <div style={{fontSize:11, color:'#9990b0'}}>{m.date} · {m.size}</div>
                    </div>
                    <button style={sdStyles.btnMini}>↓</button>
                  </div>
                ))}
                <button style={sdStyles.linkBtn} onClick={() => setActiveTab('materials')}>Все материалы →</button>
              </div>

              <div style={{...sdStyles.card, background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white'}}>
                <div style={{fontWeight:700, fontSize:16, marginBottom:8}}>База знаний</div>
                <div style={{fontSize:13, opacity:0.85, marginBottom:16}}>Шаблоны промтов, алгоритмы и видеонарезки всех воркшопов</div>
                <button style={{background:'white', color:'#7C6FCD', border:'none', borderRadius:12, padding:'9px 20px', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}>
                  990 ₽/мес → Подключить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MATERIALS */}
        {activeTab === 'materials' && (
          <div style={sdStyles.card}>
            <div style={sdStyles.cardTitle}>Учебные материалы</div>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              {materials.map(m => (
                <div key={m.title} style={{...sdStyles.materialRow, padding:'14px 16px', background:'#faf9ff', borderRadius:14}}>
                  <span style={{fontSize:28}}>{m.type==='video'?'🎥':m.type==='task'?'📌':'📄'}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600, color:'#2D2640', fontSize:14, marginBottom:2}}>{m.title}</div>
                    <div style={{fontSize:12, color:'#9990b0'}}>{m.date} · {m.size}</div>
                  </div>
                  <button style={{...sdStyles.btnMini, background:'#7C6FCD', color:'white', borderRadius:10, padding:'7px 14px', fontSize:12}}>
                    {m.type==='task' ? 'Открыть' : 'Скачать'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === 'progress' && (
          <div style={sdStyles.grid2}>
            <div style={sdStyles.card}>
              <div style={sdStyles.cardTitle}>Прогресс по воркшопу</div>
              {myWorkshops.filter(w=>w.status==='active').map(w => (
                <div key={w.id}>
                  <div style={{fontWeight:600, color:'#2D2640', marginBottom:12}}>{w.emoji} {w.title}</div>
                  <div style={{display:'flex', flexDirection:'column', gap:12}}>
                    {[['Сессия 1 — Вводная',true],['Практика дома',true],['Сессия 2 — Разбор',false],['Домашнее задание',false]].map(([t,done])=>(
                      <div key={t} style={{display:'flex', gap:12, alignItems:'center'}}>
                        <div style={{width:20, height:20, borderRadius:'50%', background: done?'#6DC4A5':'#ede9ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:done?'white':'#c0bad8', flexShrink:0}}>{done?'✓':''}</div>
                        <span style={{fontSize:14, color: done?'#2D2640':'#9990b0'}}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{marginTop:16}}>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:6}}>
                      <span style={{color:'#7B7491'}}>Общий прогресс</span>
                      <span style={{fontWeight:700, color:'#7C6FCD'}}>{w.progress}%</span>
                    </div>
                    <div style={sdStyles.progressBar}>
                      <div style={{...sdStyles.progressFill, width:w.progress+'%'}}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={sdStyles.card}>
              <div style={sdStyles.cardTitle}>Достижения</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {[['🎓','Первый воркшоп','Завершён'],['⚡','Быстрый старт','В первый день'],['💬','Активный участник','5+ вопросов'],['📚','Практик','Сдал задание']].map(([e,t,d])=>(
                  <div key={t} style={{background:'#f7f5ff', borderRadius:14, padding:'16px', textAlign:'center'}}>
                    <div style={{fontSize:32, marginBottom:8}}>{e}</div>
                    <div style={{fontSize:12, fontWeight:700, color:'#2D2640'}}>{t}</div>
                    <div style={{fontSize:11, color:'#9990b0'}}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeTab === 'chat' && (
          <div style={{...sdStyles.card, maxWidth:640}}>
            <div style={sdStyles.cardTitle}>Чат с преподавателем</div>
            <div style={sdStyles.chatArea}>
              {messages.map((m,i) => (
                <div key={i} style={{...sdStyles.msgRow, justifyContent: m.from==='student'?'flex-end':'flex-start'}}>
                  {m.from==='teacher' && <div style={sdStyles.msgAvatar}>{m.name[0]}</div>}
                  <div style={{...sdStyles.bubble, ...(m.from==='student'?sdStyles.bubbleStudent:sdStyles.bubbleTeacher)}}>
                    {m.from==='teacher' && <div style={{fontSize:11, color:'#9990b0', marginBottom:4, fontWeight:600}}>{m.name}</div>}
                    <div style={{fontSize:14}}>{m.text}</div>
                    <div style={{fontSize:11, color: m.from==='student'?'rgba(255,255,255,0.6)':'#c0bad8', marginTop:4, textAlign:'right'}}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={sdStyles.chatInput}>
              <input placeholder="Напишите сообщение..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                onKeyDown={e => e.key==='Enter' && sendMsg()}
                style={{flex:1, padding:'10px 14px', borderRadius:12, border:'1.5px solid #ede9ff', fontSize:14, fontFamily:'Nunito,sans-serif', outline:'none'}}/>
              <button style={{background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none', color:'white', borderRadius:12, padding:'10px 20px', fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:'Nunito,sans-serif'}}
                onClick={sendMsg}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const sdStyles = {
  page: { background:'#faf9ff', minHeight:'100vh' },
  header: { background:'linear-gradient(135deg,#f7f5ff,#fff0eb)', padding:'36px 24px' },
  headerInner: { maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 },
  welcome: { display:'flex', alignItems:'center', gap:16 },
  avatar: { width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#7C6FCD,#F5856A)', color:'white', fontWeight:800, fontSize:24, display:'flex', alignItems:'center', justifyContent:'center' },
  statsRow: { display:'flex', gap:16 },
  statBox: { background:'white', borderRadius:16, padding:'12px 20px', textAlign:'center', boxShadow:'0 2px 12px rgba(124,111,205,0.1)' },
  statNum: { fontSize:22, fontWeight:800, color:'#7C6FCD' },
  statLabel: { fontSize:12, color:'#9990b0' },
  tabsBar: { borderBottom:'2px solid #ede9ff', background:'white' },
  tabsInner: { maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', gap:0, overflowX:'auto' },
  tab: { padding:'14px 20px', background:'none', border:'none', fontSize:14, fontWeight:600, color:'#9990b0', cursor:'pointer', borderBottom:'2px solid transparent', marginBottom:-2, whiteSpace:'nowrap' },
  tabActive: { color:'#7C6FCD', borderBottomColor:'#7C6FCD' },
  container: { maxWidth:1200, margin:'0 auto', padding:'28px 24px' },
  grid2: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:20 },
  card: { background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(124,111,205,0.08)' },
  cardTitle: { fontSize:16, fontWeight:700, color:'#2D2640', marginBottom:16, paddingBottom:12, borderBottom:'1px solid #f0eef8' },
  workshopRow: { display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #f7f5ff' },
  progressBar: { height:6, background:'#ede9ff', borderRadius:4, overflow:'hidden' },
  progressFill: { height:'100%', background:'linear-gradient(90deg,#7C6FCD,#9B8FE0)', borderRadius:4, transition:'width 0.3s' },
  materialRow: { display:'flex', alignItems:'center', gap:12, padding:'8px 0' },
  btnMini: { background:'#f7f5ff', border:'none', color:'#7C6FCD', borderRadius:8, padding:'6px 12px', cursor:'pointer', fontWeight:700, fontSize:13 },
  linkBtn: { background:'none', border:'none', color:'#7C6FCD', fontWeight:700, fontSize:13, cursor:'pointer', marginTop:8, padding:0 },
  chatArea: { display:'flex', flexDirection:'column', gap:12, minHeight:280, maxHeight:360, overflowY:'auto', padding:'8px 0', marginBottom:16 },
  msgRow: { display:'flex', gap:8, alignItems:'flex-end' },
  msgAvatar: { width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  bubble: { maxWidth:'75%', padding:'10px 14px', borderRadius:16, lineHeight:1.5 },
  bubbleTeacher: { background:'#f7f5ff', color:'#2D2640', borderBottomLeftRadius:4 },
  bubbleStudent: { background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', color:'white', borderBottomRightRadius:4 },
  chatInput: { display:'flex', gap:10 },
};

Object.assign(window, { StudentDashboard, sdStyles });
