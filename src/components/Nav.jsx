import NavItem from "./NavItem";

function Nav(props) {
  const { navItems } = props;
  const navList = [];
  navItems.forEach((item) => {
    navList.push(
      <NavItem
        key={item.href}
        href={item.href}
        displayText={item.displayText}
      />
    );
  });
  navList.push(
    <NavItem
      key="https://github.com/vagorebeka/vagorebeka-fe-crud"
      href="https://github.com/vagorebeka/vagorebeka-fe-crud"
      displayText="GitHub"
    />);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          Movies
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{navList}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;