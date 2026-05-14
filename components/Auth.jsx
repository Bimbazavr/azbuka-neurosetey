// Auth modal — login / register
const Auth = ({ mode, setMode, onClose, onLogin }) => {
  const [form, setForm] = React.useState({ name:'', email:'', password:'', role:'student' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const e = {};
    if (mode === 'register' && !form.name.trim()) e.name = 'Введите имя';
    if (!form.email.includes('@')) e.email = 'Некорректный email';
    if (form.password.length < 6) e.password = 'Минимум 6 символов';
    return e;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: form.name || form.email.split('@')[0], type: form.role, email: form.email });
      onClose();
    }, 800);
  };

  const field = (id, label, type='text', placeholder='') => (
    <div style={authStyles.field}>
      <label style={authStyles.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[id]}
        onChange={e => { setForm({...form, [id]: e.target.value}); setErrors({...errors, [id]: ''}); }}
        style={{ ...authStyles.input, ...(errors[id] ? authStyles.inputError : {}) }}
      />
      {errors[id] && <div style={authStyles.errorMsg}>{errors[id]}</div>}
    </div>
  );

  return (
    <div style={authStyles.overlay} onClick={onClose}>
      <div style={authStyles.modal} onClick={e => e.stopPropagation()}>
        <button style={authStyles.close} onClick={onClose}>✕</button>

        <div style={authStyles.logoArea}>
          <div style={authStyles.logoIcon}>А</div>
          <div style={authStyles.logoText}>Азбука нейросетей</div>
        </div>

        <div style={authStyles.tabs}>
          {['login','register'].map(m => (
            <button key={m} style={{...authStyles.tab, ...(mode===m ? authStyles.tabActive : {})}}
              onClick={() => { setMode(m); setErrors({}); }}>
              {m === 'login' ? 'Войти' : 'Регистрация'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:0}}>
          {mode === 'register' && field('name', 'Имя', 'text', 'Ваше имя')}
          {field('email', 'Email', 'email', 'example@mail.ru')}
          {field('password', 'Пароль', 'password', '••••••••')}

          {mode === 'register' && (
            <div style={authStyles.field}>
              <label style={authStyles.label}>Я регистрируюсь как</label>
              <div style={authStyles.roleRow}>
                {[['student','🎓 Ученик'],['teacher','🧑‍🏫 Преподаватель']].map(([val, lbl]) => (
                  <button key={val} type="button" style={{
                    ...authStyles.roleBtn,
                    ...(form.role === val ? authStyles.roleBtnActive : {})
                  }} onClick={() => setForm({...form, role: val})}>{lbl}</button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" style={authStyles.submit} disabled={loading}>
            {loading ? 'Загрузка...' : (mode === 'login' ? 'Войти' : 'Создать аккаунт')}
          </button>
        </form>

        {mode === 'login' && (
          <div style={authStyles.hint}>
            Нет аккаунта? <button style={authStyles.hintBtn} onClick={() => setMode('register')}>Зарегистрироваться</button>
          </div>
        )}
        {mode === 'register' && (
          <div style={authStyles.hint}>
            Уже есть аккаунт? <button style={authStyles.hintBtn} onClick={() => setMode('login')}>Войти</button>
          </div>
        )}

        <div style={authStyles.divider}><span>или</span></div>
        <button style={authStyles.yandexBtn} onClick={() => {
          onLogin({ name: mode==='register' ? (form.name||'Пользователь') : 'Пользователь', type: form.role||'student', email: 'ya@yandex.ru' });
          onClose();
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight:8}}>
            <circle cx="12" cy="12" r="12" fill="#FC3F1D"/>
            <text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Я</text>
          </svg>
          Войти через Яндекс ID
        </button>
      </div>
    </div>
  );
};

const authStyles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(30,20,60,0.45)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
  },
  modal: {
    background: 'white', borderRadius: 24, padding: '36px 32px',
    width: '100%', maxWidth: 420, position: 'relative',
    boxShadow: '0 24px 64px rgba(124,111,205,0.25)',
  },
  close: {
    position: 'absolute', top: 16, right: 16,
    background: '#f7f5ff', border: 'none', borderRadius: 10,
    width: 32, height: 32, fontSize: 14, cursor: 'pointer', color: '#7B7491',
  },
  logoArea: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 },
  logoIcon: {
    width: 36, height: 36, borderRadius: 10,
    background: 'linear-gradient(135deg, #7C6FCD, #9B8FE0)',
    color: 'white', fontWeight: 800, fontSize: 18,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 15, fontWeight: 700, color: '#2D2640' },
  tabs: {
    display: 'flex', background: '#f7f5ff', borderRadius: 14, padding: 4, marginBottom: 24,
  },
  tab: {
    flex: 1, padding: '9px 0', borderRadius: 11, border: 'none',
    background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#9990b0',
    transition: 'all 0.15s',
  },
  tabActive: { background: 'white', color: '#7C6FCD', boxShadow: '0 2px 8px rgba(124,111,205,0.15)' },
  field: { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 },
  label: { fontSize: 13, fontWeight: 600, color: '#5a5270' },
  input: {
    padding: '11px 14px', borderRadius: 12, border: '1.5px solid #ede9ff',
    fontSize: 14, color: '#2D2640', outline: 'none', transition: 'border-color 0.15s',
    fontFamily: 'Nunito, sans-serif',
  },
  inputError: { borderColor: '#f5856a' },
  errorMsg: { fontSize: 12, color: '#f5856a', marginTop: -2 },
  roleRow: { display: 'flex', gap: 8 },
  roleBtn: {
    flex: 1, padding: '10px 8px', borderRadius: 12, border: '1.5px solid #ede9ff',
    background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#9990b0',
    transition: 'all 0.15s',
  },
  roleBtnActive: { borderColor: '#7C6FCD', background: '#f0edff', color: '#7C6FCD' },
  submit: {
    width: '100%', padding: '13px', borderRadius: 14,
    background: 'linear-gradient(135deg, #7C6FCD, #9B8FE0)', border: 'none',
    color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(124,111,205,0.35)', marginTop: 8,
    fontFamily: 'Nunito, sans-serif',
  },
  hint: { textAlign: 'center', fontSize: 13, color: '#9990b0', marginTop: 14 },
  hintBtn: { background: 'none', border: 'none', color: '#7C6FCD', fontWeight: 700, cursor: 'pointer', fontSize: 13 },
  divider: {
    display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0',
    color: '#c0bad8', fontSize: 12,
    '::before': { content:'""', flex:1, height:1, background:'#ede9ff' },
  },
  yandexBtn: {
    width: '100%', padding: '12px', borderRadius: 14, border: '1.5px solid #ede9ff',
    background: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600,
    color: '#2D2640', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'Nunito, sans-serif',
  },
};

Object.assign(window, { Auth, authStyles });
