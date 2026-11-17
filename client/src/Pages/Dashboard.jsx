import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import ProfileEdits from "./ProfileEdits"; // your existing page, adjust the path if needed
import Insights from "../components/Dashboards/Insights";
import Links from "../components/Dashboards/Link";
import MyOrders from "../components/Dashboards/MyOrders";
import ShippingAddresses from "../components/Dashboards/ShippingAddresses";


/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
const THEME_KEY = "tfv-dashboard-theme"; // remembers a manual switch; first visit is always white
const HOME_PATH = "/"; // where "Back to home" goes
const PROFILE_URL = "/kevin"; // public profile page for "Preview my profile"

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Demo data. Later load these from your backend / MongoDB.            */
/* ------------------------------------------------------------------ */
const DEMO_USER = { name: "Kevin Bhatta", username: "kevin" };

const DEMO_NOTIFICATIONS = [
  { _id: "n1", title: "Order placed", text: "Classic Cream \u00d7 1, Rs. 799", when: "Just now", unread: true },
  { _id: "n2", title: "Payment verified", text: "Your payment was confirmed by our team.", when: "2 hours ago", unread: true },
  { _id: "n3", title: "Order shipped", text: "Your card is on its way.", when: "Yesterday", unread: false },
];

// Sidebar. Each item opens its own page. Profile Edits and Insights are real components;
// the others show a "not built yet" card until you add them.
const NAV = [
  { key: "profile", label: "Profile Edits", icon: "user" },
  { key: "insights", label: "Insights", icon: "bars" },
  { key: "links", label: "Links", icon: "link", route: "/dashboard/links", desc: "Add, edit, and remove contact and social links on your profile." },
  { key: "orders", label: "My Orders", icon: "box", route: "/dashboard/orders", desc: "Order list, newest first, with status chips and a Track button. Detail page has the tracking timeline." },
  { key: "addr", label: "Shipping Addresses", icon: "pin", route: "/dashboard/addresses", desc: "Up to 3 saved addresses with one default. Nepal fields: province, district, municipality, ward, landmark." },
  { key: "qr", label: "My QR & Card", icon: "qr", route: "/dashboard/qr", desc: "QR preview with PNG download, profile URL with copy, native share, NFC card status." },
  { key: "design", label: "Design", icon: "pal", route: "/dashboard/design", desc: "Template picker and accent colour, previewed inside a small phone frame." },
  { key: "view", label: "Preview my profile", icon: "ext", external: true },
  { key: "settings", label: "Settings", icon: "set", route: "/dashboard/settings", desc: "Account, Security, Privacy and Danger zone as four cards. Username is read-only." },
];

// Components shown for each sidebar item. Add yours here as you build them.
const PAGES = {
  profile: ProfileEdits,
  insights: Insights,
  links: Links,
  orders: MyOrders,
  addr: ShippingAddresses,
};

const ICONS = {
  user: "M4 21v-2a6 6 0 016-6h4a6 6 0 016 6v2M12 11a4 4 0 100-8 4 4 0 000 8",
  bars: "M5 21V10M12 21V4M19 21v-8",
  link: "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1",
  box: "M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10",
  pin: "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h3v3h-3zM20 14v6h-3",
  pal: "M12 3a9 9 0 100 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 003-3 9 9 0 00-8-11zM7.5 11h.01M10 7h.01M15 7h.01",
  ext: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5",
  set: "M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M6 15v4",
  home: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10",
  menu: "M4 7h16M4 12h16M4 17h16",
  bell: "M6 16v-5a6 6 0 1112 0v5l2 2H4zM10 20a2 2 0 004 0",
  out: "M10 4H5a1 1 0 00-1 1v14a1 1 0 001 1h5M16 8l4 4-4 4M20 12H9",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5",
  moon: "M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z",
};


function Icon({ name, className = "ic" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function Dashboard() {
  // Default is always white. A manual switch to dark is remembered.
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [view, setView] = useState("profile"); // key of the page being shown
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(DEMO_NOTIFICATIONS);

  useEffect(() => {
    document.title = "Dashboard | Tap For Visit";
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable: theme just won't be remembered */
    }
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const unread = notifs.filter((n) => n.unread).length;
  const current = NAV.find((n) => n.key === view);
  const Page = PAGES[view];
  const closeAll = () => {
    setMenuOpen(false);
    setNotifOpen(false);
  };

  function go(item) {
    setView(item.key);
    closeAll();
    window.scrollTo(0, 0);
  }

  function handleLogout() {
    // Later: clear your auth token / call your logout API, then navigate to /login
    console.log("logout");
  }

  const openNotifs = () => {
    const willOpen = !notifOpen;
    setMenuOpen(false);
    setNotifOpen(willOpen);
  };

  return (
    <div className="db" data-theme={theme}>
      <div className="app">
        <div className="scrim" hidden={!menuOpen && !notifOpen} onClick={closeAll} />

        {/* sidebar */}
        <aside className={"side" + (menuOpen ? " open" : "")} id="side" aria-label="Dashboard menu">
          <div className="who">
            <div className="av">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="24" r="11" />
                <path d="M10 60c2-14 12-20 22-20s20 6 22 20z" />
              </svg>
            </div>
            <div>
              <b>{DEMO_USER.name}</b>
              <small>@{DEMO_USER.username}</small>
            </div>
          </div>

          <Link className="navitem homelink" to={HOME_PATH} onClick={closeAll}>
            <Icon name="home" />
            <span>Back to home</span>
          </Link>

          <nav className="nav">
            {NAV.map((n) =>
              n.external ? (
                <a key={n.key} className="navitem" href={PROFILE_URL} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                  <Icon name={n.icon} />
                  <span>{n.label}</span>
                </a>
              ) : (
                <button
                  key={n.key}
                  type="button"
                  className="navitem"
                  aria-current={view === n.key ? "page" : undefined}
                  onClick={() => go(n)}
                >
                  <Icon name={n.icon} />
                  <span>{n.label}</span>
                </button>
              )
            )}
          </nav>

          <div className="out">
            <button type="button" onClick={handleLogout}>
              <Icon name="out" />
              Logout
            </button>
          </div>
        </aside>

        <div className="main">
          {/* top bar */}
          <header className="topbar">
            <button
              type="button"
              className="ib hb"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="side"
              onClick={() => {
                setNotifOpen(false);
                setMenuOpen(true);
              }}
            >
              <Icon name="menu" />
            </button>

            <h1>{current?.label}</h1>

            <div className="tools">
              <button
                type="button"
                className="ib"
                aria-label={theme === "dark" ? "Switch to white theme" : "Switch to dark theme"}
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              >
                <Icon name={theme === "dark" ? "sun" : "moon"} />
              </button>
              <button type="button" className="ib" aria-label="Notifications" aria-expanded={notifOpen} onClick={openNotifs}>
                <Icon name="bell" />
                {unread > 0 && <span className="dot">{unread}</span>}
              </button>
            </div>
          </header>

          {/* content */}
          <main className="content">
            {Page ? (
              <Page />
            ) : (
              <div className="gc stub">
                <h2>{current?.label}</h2>
                <code>{current?.route}</code>
                <p>{current?.desc}</p>
                <p className="small">Separate route. Not built yet.</p>
              </div>
            )}
          </main>
        </div>

        {/* notifications */}
        <section className="sheet" role="dialog" aria-label="Notifications" hidden={!notifOpen}>
          <header>
            <h2>Notifications</h2>
            <button type="button" onClick={() => setNotifs((l) => l.map((n) => ({ ...n, unread: false })))}>
              Mark all as read
            </button>
          </header>
          <div>
            {notifs.map((n) => (
              <button
                key={n._id}
                type="button"
                className={"nt" + (n.unread ? " unread" : "")}
                onClick={() => setNotifs((l) => l.map((x) => (x._id === n._id ? { ...x, unread: false } : x)))}
              >
                <i className="nd" />
                <div>
                  <b>{n.title}</b>
                  <span>{n.text}</span>
                  <small>{n.when}</small>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}