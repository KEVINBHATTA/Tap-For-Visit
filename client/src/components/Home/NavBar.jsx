import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./NavBar.module.css";

const NAV_LINKS = [
  { label: "Card designs", to: "/CardDesign" },
  { label: "Profile templates", to: "/templates" },
  { label: "How it works", to: "/howitsworks" },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const { user, loading, logout } = useAuth();
  const greetingName = user?.username || user?.name;
  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Brand */}
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img className={styles.logo} src="/Logo.png" alt="" />
          <span className={styles.brandText}>
            <span className={styles.brandAccent}>Tap</span> For Visit
          </span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth + dashboard */}
        <div className={styles.actions}>
          {user ? (
            <div className={styles.userMenu}>
              <button type="button" className={styles.userGreeting}>
                Hi {greetingName}
              </button>
              <div className={styles.userMenuDropdown}>
                <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          ) : !loading && (
            <>
              <Link to="/signin" className={styles.authLink}>
                Sign in
              </Link>
              <span className={styles.divider}>/</span>
              <Link to="/signup" className={styles.authLink}>
                Sign up
              </Link>
            </>
          )}
          <Link to="/dashboard" className={styles.dashboardBtn}>
            Dashboard
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to} onClick={closeMenu} className={styles.mobileLink}>
            {link.label}
          </Link>
        ))}

        <div className={styles.mobileAuthRow}>
          {user ? (
            <>
              <span className={styles.authLink}>Hi {greetingName}</span>
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : !loading && (
            <>
              <Link to="/signin" onClick={closeMenu} className={styles.authLink}>
                Sign in
              </Link>
              <span className={styles.divider}>/</span>
              <Link to="/signup" onClick={closeMenu} className={styles.authLink}>
                Sign up
              </Link>
            </>
          )}
        </div>

        <Link to="/dashboard" onClick={closeMenu} className={styles.mobileDashboardBtn}>
          Dashboard
        </Link>
      </div>
    </header>
  );
}

export default NavBar;