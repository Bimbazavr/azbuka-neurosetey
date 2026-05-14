// Catalog page — filters + workshop grid
const WORKSHOPS_DATA = [
  { id:1, title:'ChatGPT для предпринимателя', emoji:'🤖', tag:'Бизнес', level:'Начинающий', format:'Онлайн', price:2500, seats:3, date:'26 апр', teacher:'Катя', duration:'2–3 ч', desc:'Автоматизируйте рутину, создавайте контент и КП с помощью ChatGPT. Работаем с вашей конкретной задачей.' },
  { id:2, title:'Нейросети для дизайнера', emoji:'🎨', tag:'Дизайн', level:'Начинающий', format:'Онлайн', price:2000, seats:8, date:'3 мая', teacher:'Таня', duration:'2–3 ч', desc:'Midjourney, DALL-E и Stable Diffusion на практике — карточки WB, иллюстрации, соцсети.' },
  { id:3, title:'AI-контент для соцсетей', emoji:'✍️', tag:'Контент', level:'Начинающий', format:'Онлайн', price:2000, seats:6, date:'10 мая', teacher:'Катя', duration:'2–3 ч', desc:'Создавайте посты, тексты и сценарии для видео с помощью нейросетей быстро и без шаблонного результата.' },
  { id:4, title:'Нейросети для малого бизнеса', emoji:'🏪', tag:'Бизнес', level:'Начинающий', format:'Онлайн', price:3000, seats:10, date:'17 мая', teacher:'Таня', duration:'2–3 ч', desc:'Для мясных цехов, ателье, салонов — автоматизация процессов и создание контента.' },
  { id:5, title:'Промт-инжиниринг: продвинутый', emoji:'⚙️', tag:'Технологии', level:'Продвинутый', format:'Онлайн', price:3500, seats:5, date:'24 мая', teacher:'Антон', duration:'3 ч', desc:'Углублённый воркшоп по написанию промтов для сложных задач. Агенты, цепочки, автоматизация.' },
  { id:6, title:'Нейросети для преподавателей', emoji:'📚', tag:'Образование', level:'Начинающий', format:'Онлайн', price:2500, seats:12, date:'31 мая', teacher:'Катя', duration:'2–3 ч', desc:'Автоматизация анализа документов, создание учебных материалов и презентаций.' },
];

const Catalog = ({ setPage, setAuthModal, currentUser }) => {
  const [filters, setFilters] = React.useState({ tag:'', level:'', format:'', maxPrice:5000, search:'' });
  const [sort, setSort] = React.useState('date');
  const [savedIds, setSavedIds] = React.useState([]);

  const tags = ['Бизнес','Дизайн','Контент','Технологии','Образование'];
  const levels = ['Начинающий','Продвинутый'];
  const formats = ['Онлайн'];

  const filtered = WORKSHOPS_DATA
    .filter(w => (!filters.tag || w.tag === filters.tag)
      && (!filters.level || w.level === filters.level)
      && (!filters.format || w.format === filters.format)
      && (w.price <= filters.maxPrice)
      && (!filters.search || w.title.toLowerCase().includes(filters.search.toLowerCase()))
    )
    .sort((a,b) => sort === 'price' ? a.price - b.price : sort === 'seats' ? a.seats - b.seats : 0);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedIds(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  };

  const filterChip = (key, val, label) => (
    <button key={val} style={{
      ...catStyles.chip,
      ...(filters[key] === val ? catStyles.chipActive : {})
    }} onClick={() => setFilters(f => ({...f, [key]: f[key]===val ? '' : val}))}>
      {label}
    </button>
  );

  return (
    <div style={catStyles.page}>
      <div style={catStyles.header}>
        <div style={catStyles.headerInner}>
          <h1 style={catStyles.h1}>Воркшопы</h1>
          <p style={catStyles.sub}>Живые занятия с практическим результатом</p>
        </div>
      </div>

      <div style={catStyles.body}>
        {/* Sidebar filters */}
        <aside style={catStyles.sidebar}>
          <div style={catStyles.filterBlock}>
            <div style={catStyles.filterTitle}>Поиск</div>
            <input
              placeholder="Название воркшопа..."
              value={filters.search}
              onChange={e => setFilters(f=>({...f, search:e.target.value}))}
              style={catStyles.searchInput}
            />
          </div>
          <div style={catStyles.filterBlock}>
            <div style={catStyles.filterTitle}>Тема</div>
            <div style={catStyles.chipsRow}>
              {tags.map(t => filterChip('tag', t, t))}
            </div>
          </div>
          <div style={catStyles.filterBlock}>
            <div style={catStyles.filterTitle}>Уровень</div>
            <div style={catStyles.chipsRow}>
              {levels.map(l => filterChip('level', l, l))}
            </div>
          </div>
          <div style={catStyles.filterBlock}>
            <div style={catStyles.filterTitle}>Стоимость до: <strong style={{color:'#7C6FCD'}}>{filters.maxPrice.toLocaleString()} ₽</strong></div>
            <input type="range" min={1000} max={10000} step={500}
              value={filters.maxPrice}
              onChange={e => setFilters(f=>({...f, maxPrice:+e.target.value}))}
              style={{width:'100%', accentColor:'#7C6FCD'}}
            />
            <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'#c0bad8'}}>
              <span>1 000 ₽</span><span>10 000 ₽</span>
            </div>
          </div>
          {(filters.tag || filters.level || filters.maxPrice < 5000 || filters.search) && (
            <button style={catStyles.clearBtn} onClick={() => setFilters({ tag:'', level:'', format:'', maxPrice:5000, search:'' })}>
              Сбросить фильтры ✕
            </button>
          )}
        </aside>

        {/* Main grid */}
        <main style={catStyles.main}>
          <div style={catStyles.sortRow}>
            <span style={{fontSize:14, color:'#9990b0'}}>Найдено: <strong style={{color:'#2D2640'}}>{filtered.length}</strong></span>
            <div style={{display:'flex', gap:8}}>
              {[['date','По дате'],['price','По цене'],['seats','По местам']].map(([v,l]) => (
                <button key={v} style={{...catStyles.sortBtn, ...(sort===v ? catStyles.sortBtnActive : {})}}
                  onClick={() => setSort(v)}>{l}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={catStyles.empty}>
              <div style={{fontSize:48, marginBottom:16}}>🔍</div>
              <div style={{fontWeight:700, color:'#2D2640', marginBottom:8}}>Ничего не найдено</div>
              <div style={{color:'#9990b0', fontSize:14}}>Попробуй изменить фильтры</div>
            </div>
          ) : (
            <div style={catStyles.grid}>
              {filtered.map(w => (
                <div key={w.id} style={catStyles.card} onClick={() => setPage('workshop-'+w.id)}>
                  <div style={catStyles.cardTop}>
                    <span style={{fontSize:40}}>{w.emoji}</span>
                    <button style={{...catStyles.saveBtn, color: savedIds.includes(w.id) ? '#F5856A' : '#c0bad8'}}
                      onClick={e => toggleSave(w.id, e)}>
                      {savedIds.includes(w.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div style={{display:'flex', gap:6, marginBottom:10}}>
                    <span style={catStyles.tag}>{w.tag}</span>
                    <span style={{...catStyles.tag, background:'#fff0eb', color:'#F5856A'}}>{w.level}</span>
                  </div>
                  <h3 style={catStyles.cardTitle}>{w.title}</h3>
                  <p style={catStyles.cardDesc}>{w.desc}</p>
                  <div style={catStyles.cardMeta}>
                    <span>📅 {w.date}</span>
                    <span>⏱ {w.duration}</span>
                    <span>👩‍🏫 {w.teacher}</span>
                  </div>
                  <div style={catStyles.cardFooter}>
                    <div>
                      <div style={catStyles.price}>{w.price.toLocaleString()} ₽</div>
                      <div style={{fontSize:12, color: w.seats<=3?'#F5856A':'#9990b0', fontWeight:600}}>
                        {w.seats<=3 ? `🔥 ${w.seats} места` : `👥 ${w.seats} мест`}
                      </div>
                    </div>
                    <button style={catStyles.enroll} onClick={e=>{e.stopPropagation(); setAuthModal('register');}}>
                      Записаться
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const catStyles = {
  page: { background:'#faf9ff', minHeight:'100vh' },
  header: { background:'linear-gradient(135deg,#f7f5ff,#fff0eb)', padding:'48px 24px 32px' },
  headerInner: { maxWidth:1200, margin:'0 auto' },
  h1: { fontSize:'clamp(28px,4vw,44px)', fontWeight:800, color:'#2D2640', margin:'0 0 8px' },
  sub: { fontSize:16, color:'#9990b0', margin:0 },
  body: { maxWidth:1200, margin:'0 auto', padding:'32px 24px', display:'flex', gap:28, alignItems:'flex-start' },
  sidebar: {
    width:240, flexShrink:0, background:'white', borderRadius:20, padding:24,
    boxShadow:'0 4px 20px rgba(124,111,205,0.08)', position:'sticky', top:80,
  },
  filterBlock: { marginBottom:20 },
  filterTitle: { fontSize:13, fontWeight:700, color:'#5a5270', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' },
  searchInput: {
    width:'100%', padding:'9px 12px', borderRadius:12, border:'1.5px solid #ede9ff',
    fontSize:13, color:'#2D2640', outline:'none', boxSizing:'border-box', fontFamily:'Nunito,sans-serif',
  },
  chipsRow: { display:'flex', flexWrap:'wrap', gap:6 },
  chip: {
    padding:'5px 12px', borderRadius:10, border:'1.5px solid #ede9ff',
    background:'none', fontSize:12, fontWeight:600, color:'#9990b0', cursor:'pointer', transition:'all 0.15s',
  },
  chipActive: { borderColor:'#7C6FCD', background:'#f0edff', color:'#7C6FCD' },
  clearBtn: {
    width:'100%', padding:'8px', borderRadius:12, border:'1.5px dashed #f5856a',
    background:'none', color:'#F5856A', fontSize:12, fontWeight:600, cursor:'pointer',
  },
  main: { flex:1, minWidth:0 },
  sortRow: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:10 },
  sortBtn: {
    padding:'5px 14px', borderRadius:10, border:'1.5px solid #ede9ff',
    background:'none', fontSize:12, fontWeight:600, color:'#9990b0', cursor:'pointer',
  },
  sortBtnActive: { borderColor:'#7C6FCD', background:'#f0edff', color:'#7C6FCD' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18 },
  card: {
    background:'white', borderRadius:20, padding:24, cursor:'pointer',
    boxShadow:'0 4px 20px rgba(124,111,205,0.07)', border:'1.5px solid transparent',
    transition:'transform 0.15s, box-shadow 0.15s',
  },
  cardTop: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 },
  saveBtn: { background:'none', border:'none', fontSize:22, cursor:'pointer', padding:0 },
  tag: { fontSize:11, fontWeight:700, color:'#7C6FCD', background:'#ede9ff', padding:'3px 10px', borderRadius:8 },
  cardTitle: { fontSize:16, fontWeight:700, color:'#2D2640', margin:'0 0 8px', lineHeight:1.35 },
  cardDesc: { fontSize:13, color:'#9990b0', lineHeight:1.6, margin:'0 0 12px' },
  cardMeta: { display:'flex', gap:10, fontSize:12, color:'#9990b0', flexWrap:'wrap', marginBottom:14 },
  cardFooter: { display:'flex', justifyContent:'space-between', alignItems:'flex-end', paddingTop:14, borderTop:'1px solid #f0eef8' },
  price: { fontSize:20, fontWeight:800, color:'#7C6FCD', marginBottom:2 },
  enroll: {
    background:'linear-gradient(135deg,#7C6FCD,#9B8FE0)', border:'none',
    color:'white', borderRadius:12, padding:'9px 20px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'Nunito,sans-serif',
  },
  empty: { textAlign:'center', padding:'80px 20px', background:'white', borderRadius:20 },
};

Object.assign(window, { Catalog, WORKSHOPS_DATA, catStyles });
