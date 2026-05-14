// Teacher Dashboard
const TeacherDashboard = ({ currentUser, setPage }) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [chatMsg, setChatMsg] = React.useState('');
  const [messages, setMessages] = React.useState([
    { from:'student', name:'Алексей', text:'Добрый день! Не могу применить промт из задания, получается шаблонный текст.', time:'10:15' },
    { from:'teacher', name:'Я', text:'Привет! Пришли свой промт — разберём вместе', time:'10:20' },
  ]);

  const students = [
    { name:'Алексей М.', progress:75, status:'active', task:'Сдал', emoji:'👨‍💼' },
    { name:'Марина К.', progress:100, status:'done', task:'Сдала', emoji:'👩‍🎨' },
    { name:'Дмитрий С.', progress:40, status:'active', task:'Не сдал', emoji:'👨‍💻' },
    { name:'Ольга Т.', progress:60, status:'active', task:'Сдала', emoji:'👩‍💼' },
    { name:'Иван Р.', progress:20, status:'behind', task:'Не сдал', emoji:'👨‍🔧' },
  ];

  const myWorkshops = [
    { id:1, title:'ChatGPT для предпринимателя', emoji:'🤖', date:'26 апр', enrolled:12, capacity:15, status:'active' },
    { id:2, title:'Нейросети для дизайнера', emoji:'🎨', date:'3 мая', enrolled:5, capacity:15, status:'upcoming' },
  ];

  const analytics = [
    { label:'Записей этот месяц', value:'17', icon:'👥', color:'#7C6FCD' },
    { label:'Средняя оценка', value:'4.9 ★', icon:'⭐', color:'#F5856A' },
    { label:'Выручка (апр)', value:'42 500 ₽', icon:'💰', color:'#6DC4A5' },
    { label:'Возврат учеников', value:'68%', icon:'🔄', color:'#7C6FCD' },
  ];

  const sendMsg = () => {
    if (!chatMsg.trim()) return;
    setMessages(m => [...m, { from:'teacher', name:'Я', text:chatMsg, time:'сейчас' }]);
    setChatMsg('');
  };

  const tabs = [
    { id:'overview', label:'Обзор' },
    { id:'students', label:'Ученики' },
    { id:'analytics', label:'Аналитика' },
    { id:'chat', label:'Чат с группой' },
    { id:'guide', label:'Гайд для новых' },
  ];

  return (
    <div style={tdStyles.page}>
      <div style={tdStyles.header}>
        <div style={tdStyles.headerInner}>
          <div style={tdStyles.welcome}>
            <div style={tdStyles.avatar}>{currentUser?.name?.[0] || 'П'}</div>
            <div>
              <div style={{fontSize:22, fontWeight:800, color:'#2D2640'}}>Кабинет преподавателя 🧑‍🏫</div>
              <div style={{fontSize:14, color:'#9990b0'}}>{currentUser?.name || 'Преподаватель'} · Азбука нейросетей</div>
            </div>
          </div>
          <div style={tdStyles.statsRow}>
            {analytics.slice(0,3).map(a => (
              <div key={a.label} style={tdStyles.statBox}>
                <div style={{fontSize:20}}>{a.icon}</div>
                <div style={{fontSize:18, fontWeight:800, color:a.color}}>{a.value}</div>
                <div style={{fontSize:11, color:'#9990b0', maxWidth:80, textAlign:'center'}}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={tdStyles.tabsBar}>
        <div style={tdStyles.tabsInner}>
          {tabs.map(t => (
            <button key={t.id} style={{...tdStyles.tab, ...(activeTab===t.id?tdStyles.tabActive:{})}}
              onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={tdStyles.container}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={tdStyles.grid2}>
            <div style={tdStyles.card}>
              <div style={tdStyles.cardTitle}>Мои воркшопы</div>
              {myWorkshops.map(w => (
                <div key={w.id} style={tdStyles.workshopRow}>
                  <span style={{fontSize:28}}>{w.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700, color:'#2D2640', fontSize:14, marginBottom:4}}>{w.title}</div>
                    <div style={{fontSize:12, color:'#9990b0'}}>📅 {w.date} · 👥 {w.enrolled}/{w.capacity}</div>
                    <div style={{marginTop:6, height:5, background:'#ede9ff', borderRadius:3, overflow:'hidden'}}>
                      <div style={{height:'100%', background:'linear-gradient(90deg,#7C6FCD,#9B8FE0)', width:(w.enrolled/w.capacity*100)+'%', borderRadius:3}}/>
                    </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:4}}>
                    <button style={tdStyles.btnMini} onClick={()=>setActiveTab('students')}>Ученики</button>
                    <button style={{...tdStyles.btnMini, background:'#fff0eb', color:'#F5856A'}}>Ред.</button>
                  </div>
                </div>
              ))}
              <button style={tdStyles.addBtn}>+ Создать воркшоп</button>
            </div>

            <div style={tdStyles.card}>
              <div style={tdStyles.cardTitle}>Требуют внимания</div>
              {students.filter(s=>s.status==='behind').map(s => (
                <div key={s.name} style={{...tdStyles.workshopRow, background:'#fff5f5', borderRadius:12, padding:12}}>
                  <span style={{fontSize:24}}>{s.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600, color:'#2D2640', fontSize:14}}>{s.name}</div>
                    <div style={{fontSize:12, color:'#F5856A'}}>⚠️ Отстаёт · {s.progress}% прогресс</div>
                  </div>
                  <button style={{...tdStyles.btnMini, background:'#F5856A', color:'white'}} onClick={()=>setActiveTab('chat')}>
                    Написать
                  </button>
                </div>
              ))}
              <div style={{...tdStyles.cardTitle, marginTop:20, borderTop:'1px solid #f0eef8', paddingTop:16, marginBottom:10}}>Последние отзывы</div>
              {[
                {text:'Очень практично! За 3 часа сделала то, на что уходили дни.', name:'Марина К.', stars:5},
                {text:'Хороший формат. Небольшая группа — можно задавать вопросы.', name:'Дмитрий С.', stars:4},
              ].map(r => (
                <div key={r.name} style={{padding:'10px 0', borderBottom:'1px solid #f7f5ff'}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                    <span style={{fontSize:13, fontWeight:600, color:'#2D2640'}}>{r.name}</span>
                    <span style={{fontSize:12}}>{'⭐'.repeat(r.stars)}</span>
                  </div>
                  <div style={{fontSize:13, color:'#7B7491', lineHeight:1.5}}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === 'students' && (
          <div style={tdStyles.card}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <div style={{...tdStyles.cardTitle, margin:0}}>Ученики — ChatGPT для предпринимателя</div>
              <button style={{background:'#f0edff', color:'#7C6FCD', border:'none', borderRadius:10, padding:'7px 16px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}>
                📤 Уведомление всем
              </button>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%', borderCollapse:'collapse', fontSize:14}}>
                <thead>
                  <tr style={{background:'#faf9ff'}}>
                    {['Ученик','Прогресс','Задание','Статус','Действие'].map(h=>(
                      <th key={h} style={{padding:'10px 14px', textAlign:'left', color:'#9990b0', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.name} style={{borderTop:'1px solid #f0eef8'}}>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{display:'flex', gap:10, alignItems:'center'}}>
                          <span style={{fontSize:20}}>{s.emoji}</span>
                          <span style={{fontWeight:600, color:'#2D2640'}}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <div style={{display:'flex', alignItems:'center', gap:8}}>
                          <div style={{width:80, height:6, background:'#ede9ff', borderRadius:4, overflow:'hidden'}}>
                            <div style={{height:'100%', background: s.progress===100?'#6DC4A5':s.progress<40?'#F5856A':'#7C6FCD', width:s.progress+'%'}}/>
                          </div>
                          <span style={{fontSize:12, color:'#7B7491'}}>{s.progress}%</span>
                        </div>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <span style={{fontSize:12, fontWeight:600, color: s.task.includes('Не')?'#F5856A':'#6DC4A5',
                          background: s.task.includes('Не')?'#fff0eb':'#e8f8f2', padding:'3px 10px', borderRadius:8}}>
                          {s.task}
                        </span>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <span style={{fontSize:12, fontWeight:600, color: s.status==='done'?'#6DC4A5':s.status==='behind'?'#F5856A':'#7C6FCD',
                          background: s.status==='done'?'#e8f8f2':s.status==='behind'?'#fff0eb':'#ede9ff', padding:'3px 10px', borderRadius:8}}>
                          {s.status==='done'?'✓ Готово':s.status==='behind'?'⚠️ Отстаёт':'● Активен'}
                        </span>
                      </td>
                      <td style={{padding:'12px 14px'}}>
                        <button style={tdStyles.btnMini} onClick={()=>setActiveTab('chat')}>Написать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{display:'flex', flexDirection:'column', gap:20}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16}}>
              {analytics.map(a => (
                <div key={a.label} style={{...tdStyles.card, textAlign:'center', padding:'28px 20px'}}>
                  <div style={{fontSize:36, marginBottom:8}}>{a.icon}</div>
                  <div style={{fontSize:28, fontWeight:800, color:a.color, marginBottom:4}}>{a.value}</div>
                  <div style={{fontSize:13, color:'#9990b0'}}>{a.label}</div>
                </div>
              ))}
            </div>
            <div style={tdStyles.card}>
              <div style={tdStyles.cardTitle}>Финансовая модель (апрель)</div>
              <div style={{display:'flex', flexDirection:'column', gap:12}}>
                {[
                  {label:'Воркшопы (15 чел. × 2 500 ₽ × 2)', sum:'75 000 ₽', color:'#7C6FCD'},
                  {label:'База знаний (30 подписчиков × 1 200 ₽)', sum:'36 000 ₽', color:'#6DC4A5'},
                  {label:'Консультации 1:1 (3 × 6 000 ₽)', sum:'18 000 ₽', color:'#F5856A'},
                  {label:'Расходы (Яндекс 360 + Облако)', sum:'−1 100 ₽', color:'#c0bad8'},
                ].map(r => (
                  <div key={r.label} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #f7f5ff'}}>
                    <span style={{fontSize:14, color:'#5a5270'}}>{r.label}</span>
                    <span style={{fontSize:16, fontWeight:800, color:r.color}}>{r.sum}</span>
                  </div>
                ))}
                <div style={{display:'flex', justifyContent:'space-between', padding:'12px 0', marginTop:4}}>
                  <span style={{fontSize:15, fontWeight:700, color:'#2D2640'}}>Итого / месяц</span>
                  <span style={{fontSize:20, fontWeight:800, color:'#6DC4A5'}}>≈ 128 000 ₽</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeTab === 'chat' && (
          <div style={{...tdStyles.card, maxWidth:640}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <div style={{...tdStyles.cardTitle, margin:0}}>Чат с группой</div>
              <button style={{background:'#f0edff', color:'#7C6FCD', border:'none', borderRadius:10, padding:'7px 16px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif'}}>
                📢 Массовое уведомление
              </button>
            </div>
            <div style={sdStyles.chatArea}>
              {messages.map((m,i) => (
                <div key={i} style={{...sdStyles.msgRow, justifyContent:m.from==='teacher'?'flex-end':'flex-start'}}>
                  {m.from==='student' && <div style={{...sdStyles.msgAvatar, background:'linear-gradient(135deg,#F5856A,#f0a882)'}}>{m.name[0]}</div>}
                  <div style={{...sdStyles.bubble, ...(m.from==='teacher'?sdStyles.bubbleStudent:sdStyles.bubbleTeacher)}}>
                    {m.from==='student' && <div style={{fontSize:11, color:'#9990b0', marginBottom:4, fontWeight:600}}>{m.name}</div>}
                    <div style={{fontSize:14}}>{m.text}</div>
                    <div style={{fontSize:11, color:m.from==='teacher'?'rgba(255,255,255,0.6)':'#c0bad8', marginTop:4, textAlign:'right'}}>{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={sdStyles.chatInput}>
              <input placeholder="Ответить или отправить уведомление..." value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&sendMsg()}
                style={{flex:1, padding:'10px 14px', borderRadius:12, border:'1.5px solid #ede9ff', fontSize:14, fontFamily:'Nunito,sans-serif', outline:'none'}}/>
              <button style={{background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none', color:'white', borderRadius:12, padding:'10px 20px', fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:'Nunito,sans-serif'}} onClick={sendMsg}>→</button>
            </div>
          </div>
        )}

        {/* GUIDE */}
        {activeTab === 'guide' && (
          <div style={{...tdStyles.card, maxWidth:720}}>
            <div style={tdStyles.cardTitle}>Гайд для новых преподавателей</div>
            <div style={{display:'flex', flexDirection:'column', gap:0}}>
              {[
                {n:1, title:'Регистрация в Яндекс 360', desc:'Получите Яндекс ID и подключитесь к рабочему пространству команды. Антон пришлёт приглашение на корпоративную почту.', done:true},
                {n:2, title:'Знакомство с инструментами', desc:'Яндекс.Телемост для эфиров, Яндекс.Диск для материалов, Яндекс.Формы для анкет участников. Тест-эфир с командой.', done:true},
                {n:3, title:'Создание первого воркшопа', desc:'Заполните карточку воркшопа: тема, дата, программа, целевая аудитория. Антон разместит на лендинге.', done:false},
                {n:4, title:'Запуск сбора участников', desc:'Анкета через Яндекс.Формы → оплата через ЮKassa → ссылка на Телемост участникам автоматически.', done:false},
                {n:5, title:'Проведение воркшопа', desc:'Живой эфир 2–3 часа. Запись автосохраняется. После — загрузите материалы на Яндекс.Диск.', done:false},
                {n:6, title:'Обратная связь и доработка', desc:'Соберите отзывы через Яндекс.Формы. Антон поможет с аналитикой и улучшением воркшопа.', done:false},
              ].map(step => (
                <div key={step.n} style={{display:'flex', gap:16, padding:'20px 0', borderBottom:'1px solid #f0eef8'}}>
                  <div style={{width:32, height:32, borderRadius:'50%', background: step.done?'#6DC4A5':'#ede9ff', color:step.done?'white':'#7C6FCD', fontWeight:800, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    {step.done?'✓':step.n}
                  </div>
                  <div>
                    <div style={{fontWeight:700, color:'#2D2640', fontSize:15, marginBottom:6}}>{step.title}</div>
                    <div style={{fontSize:14, color:'#7B7491', lineHeight:1.6}}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const tdStyles = {
  page: { background:'#faf9ff', minHeight:'100vh' },
  header: { background:'linear-gradient(135deg,#f0edff,#fff0eb)', padding:'36px 24px' },
  headerInner: { maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 },
  welcome: { display:'flex', alignItems:'center', gap:16 },
  avatar: { width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg,#F5856A,#f0a882)', color:'white', fontWeight:800, fontSize:24, display:'flex', alignItems:'center', justifyContent:'center' },
  statsRow: { display:'flex', gap:12, flexWrap:'wrap' },
  statBox: { background:'white', borderRadius:16, padding:'12px 16px', textAlign:'center', boxShadow:'0 2px 12px rgba(124,111,205,0.1)', display:'flex', flexDirection:'column', alignItems:'center', gap:4 },
  tabsBar: { borderBottom:'2px solid #ede9ff', background:'white' },
  tabsInner: { maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', overflowX:'auto' },
  tab: { padding:'14px 20px', background:'none', border:'none', fontSize:14, fontWeight:600, color:'#9990b0', cursor:'pointer', borderBottom:'2px solid transparent', marginBottom:-2, whiteSpace:'nowrap' },
  tabActive: { color:'#7C6FCD', borderBottomColor:'#7C6FCD' },
  container: { maxWidth:1200, margin:'0 auto', padding:'28px 24px' },
  grid2: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:20 },
  card: { background:'white', borderRadius:20, padding:24, boxShadow:'0 4px 20px rgba(124,111,205,0.08)' },
  cardTitle: { fontSize:16, fontWeight:700, color:'#2D2640', marginBottom:16, paddingBottom:12, borderBottom:'1px solid #f0eef8' },
  workshopRow: { display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid #f7f5ff' },
  btnMini: { background:'#f0edff', border:'none', color:'#7C6FCD', borderRadius:8, padding:'6px 14px', cursor:'pointer', fontWeight:700, fontSize:12, fontFamily:'Nunito,sans-serif', whiteSpace:'nowrap' },
  addBtn: { width:'100%', marginTop:12, padding:'10px', borderRadius:12, border:'1.5px dashed #7C6FCD', background:'none', color:'#7C6FCD', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'Nunito,sans-serif' },
};

Object.assign(window, { TeacherDashboard, tdStyles });
