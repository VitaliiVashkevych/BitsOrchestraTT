const NavBar = () => {
  const currentUrl = window.location.pathname;
  const style = {
    dashboard: currentUrl === '/dashboard' ? 'navbar__link link-active' : 'navbar__link',
    edit: currentUrl === '/edit' ? 'navbar__link link-active' : 'navbar__link',
  }

  return (
    <nav className="navbar">
      <a href="/dashboard" className={style.dashboard}>Dashboard</a>

      <a href="/edit" className={style.edit}>Add new book</a>
    </nav>
  );
};

export default NavBar;
