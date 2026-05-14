// Nav component — top navigation bar
const Nav = ({ currentPage, setPage, currentUser, setAuthModal, setCurrentUser }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const navLinks = [
    { label: 'Воркшопы', page: 'catalog' },
    { label: 'Как это работает', page: 'how' },
    { label: 'О проекте', page: 'about' },
    { label: 'FAQ', page: 'faq' },
  ];

  const handleNav = (page) => {
    setPage(page);
    setMobileOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    setDropdownOpen(false);
    setPage('landing');
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.inner}>
        {/* Logo */}
        <div style={navStyles.logo} onClick={() => handleNav('landing')}>
          <div style={navStyles.logoIcon}>А</div>
          <div>
            <div style={navStyles.logoTitle}>Азбука</div>
            <div style={navStyles.logoSub}>нейросетей</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={navStyles.links}>
          {navLinks.map(l => (
            <button key={l.page} style={{
              ...navStyles.link,
              color: currentPage === l.page ? '#7C6FCD' : '#5a5270',
              fontWeight: currentPage === l.page ? 700 : 500,
            }} onClick={() => handleNav(l.page)}>{l.label}</button>
          ))}
        </div>

        {/* Auth area */}
        <div style={navStyles.authArea}>
          {currentUser ? (
            <div style={{position:'relative'}}>
              <button style={navStyles.userBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div style={navStyles.avatar}>{currentUser.name[0]}</div>
                <span style={{fontSize:14, color:'#2D2640', fontWeight:600}}>{currentUser.name}</span>
                <span style={{fontSize:12, color:'#9990b0'}}>▾</span>
              </button>
              {dropdownOpen && (
                <div style={navStyles.dropdown}>
                  <button style={navStyles.dropItem} onClick={() => { setPage(currentUser.type === 'teacher' ? 'teacher-dashboard' : 'student-dashboard'); setDropdownOpen(false); }}>
                    Личный кабинет
                  </button>
                  <div style={{height:1, background:'#f0eef8', margin:'4px 0'}}/>
                  <button style={{...navStyles.dropItem, color:'#e07060'}} onClick={logout}>Выйти</button>
                </div>
              )}
            </div>
          ) : (
            <div style={{display:'flex', gap:8}}>
              <button style={navStyles.loginBtn} onClick={() => setAuthModal('login')}>Войти</button>
              <button style={navStyles.signupBtn} onClick={() => setAuthModal('register')}>Записаться</button>
            </div>
          )}
          {/* Mobile hamburger */}
          <button style={navStyles.hamburger} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={navStyles.mobileMenu}>
          {navLinks.map(l => (
            <button key={l.page} style={navStyles.mobileLink} onClick={() => handleNav(l.page)}>{l.label}</button>
          ))}
          <div style={{borderTop:'1px solid #ede9ff', paddingTop:12, marginTop:4, display:'flex', gap:8}}>
            {currentUser ? (
              <button style={navStyles.loginBtn} onClick={logout}>Выйти</button>
            ) : (
              <>
                <button style={navStyles.loginBtn} onClick={() => { setAuthModal('login'); setMobileOpen(false); }}>Войти</button>
                <button style={navStyles.signupBtn} onClick={() => { setAuthModal('register'); setMobileOpen(false); }}>Записаться</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const navStyles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #ede9ff',
    boxShadow: '0 2px 16px rgba(124,111,205,0.07)',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
  },
  logoIcon: {
    width: 40, height: 40, borderRadius: 12,
    background: 'linear-gradient(135deg, #7C6FCD 0%, #9B8FE0 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'white', fontWeight: 800, fontSize: 20, fontFamily: 'Nunito, sans-serif',
  },
  logoTitle: { fontSize: 16, fontWeight: 800, color: '#2D2640', lineHeight: 1.2 },
  logoSub: { fontSize: 11, color: '#9990b0', fontWeight: 500, lineHeight: 1.2 },
  links: { display: 'flex', gap: 4 },
  link: {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px 14px', borderRadius: 10, fontSize: 14,
    transition: 'all 0.15s',
  },
  authArea: { display: 'flex', alignItems: 'center', gap: 8 },
  loginBtn: {
    background: 'none', border: '1.5px solid #7C6FCD', color: '#7C6FCD',
    borderRadius: 12, padding: '8px 18px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.15s',
  },
  signupBtn: {
    background: 'linear-gradient(135deg, #7C6FCD, #9B8FE0)', border: 'none',
    color: 'white', borderRadius: 12, padding: '8px 18px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,111,205,0.35)',
  },
  userBtn: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: '#f7f5ff', border: '1.5px solid #ede9ff',
    borderRadius: 12, padding: '6px 14px', cursor: 'pointer',
  },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    background: 'linear-gradient(135deg, #7C6FCD, #F5856A)',
    color: 'white', fontWeight: 700, fontSize: 13,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute', top: '110%', right: 0,
    background: 'white', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '1px solid #ede9ff', minWidth: 180, padding: '6px',
    zIndex: 200,
  },
  dropItem: {
    width: '100%', textAlign: 'left', background: 'none', border: 'none',
    padding: '10px 14px', borderRadius: 10, fontSize: 14, cursor: 'pointer',
    color: '#2D2640', fontWeight: 500,
  },
  hamburger: {
    display: 'none', background: 'none', border: 'none',
    fontSize: 20, cursor: 'pointer', padding: 4, color: '#2D2640',
    '@media (max-width: 768px)': { display: 'block' },
  },
  mobileMenu: {
    padding: '12px 24px 16px',
    display: 'flex', flexDirection: 'column', gap: 4,
    borderTop: '1px solid #ede9ff',
    background: 'white',
  },
  mobileLink: {
    background: 'none', border: 'none', textAlign: 'left',
    padding: '10px 4px', fontSize: 15, color: '#2D2640',
    fontWeight: 500, cursor: 'pointer',
  },
};

Object.assign(window, { Nav });
