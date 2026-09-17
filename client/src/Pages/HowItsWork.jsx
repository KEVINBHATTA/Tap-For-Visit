import { Link } from "react-router-dom";
import { useState } from "react";
import "./HowItWorks.css";
import NavBar from "../components/Home/NavBar";

// Swap this out for your existing shared <Navbar /> component if you have one —
// this is a cream-themed variant so it matches this page's background.
function HowItWorksNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="how-nav">
      <NavBar />
      {/* <div className="how-nav-inner">
        <Link to="/" className="how-nav-logo">
          Tap For Visit
        </Link>

        <nav className={`how-nav-links ${open ? "how-nav-links-open" : ""}`}>
          <Link to="/nfc-cards" onClick={() => setOpen(false)}>NFC card design</Link>
          <Link to="/templates" onClick={() => setOpen(false)}>Profile templates</Link>
          <Link to="/how-it-works" className="how-nav-active" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link to="/signin" onClick={() => setOpen(false)}>Sign in</Link>
          <Link to="/signup" className="how-nav-cta" onClick={() => setOpen(false)}>
            Sign up
          </Link>
        </nav>

        <button
          className="how-nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? "how-nav-x" : ""} />
        </button>
      </div> */}
    </header>
  );
}

const steps = [
  {
    title: "Create your account",
    copy: "Sign up with email or Google and claim your username. It becomes your permanent profile link — tapforvisit.com/@yourname — and it can't be changed later, so pick the one you want.",
  },
  {
    title: "Build your profile",
    copy: "Add your photo, title, bio, socials, and contact details from your dashboard. This is what people see the moment they tap or scan your card.",
  },
  {
    title: "Pick a card design",
    copy: "Browse the card catalog and choose the design you want printed. You can preview each one against your live profile before ordering.",
  },
  {
    title: "Place your order",
    copy: "Pay by scanning our QR code or choose cash on delivery, then confirm the order over WhatsApp. No account or gateway sign-up needed on your end.",
  },
  {
    title: "We verify and program it",
    copy: "Our team confirms your payment and writes your profile link to the card's NFC chip, so it's ready to tap the moment it arrives.",
  },
  {
    title: "Your card ships",
    copy: "We hand your card off for delivery. You'll get a WhatsApp update once it's on its way and once it's out for delivery.",
  },
  {
    title: "Tap, share, done",
    copy: "Hold your card near any phone to open your profile instantly, or let people scan the QR code instead — it works even without an internet connection.",
  },
];

export default function HowItWorks() {
  return (
    <div className="how-page">
      <HowItWorksNav />

      <main className="how-main">
        <section className="how-hero">
          <p className="how-hero-kicker">How it works</p>
          <h1 className="how-hero-title">
            From sign-up to your first tap, here's the whole journey.
          </h1>
          <p className="how-hero-sub">
            A two-minute walkthrough of setting up your profile, ordering a card,
            and sharing it — start to finish.
          </p>

          <div className="how-video-frame">
            <iframe
              src="https://www.youtube.com/embed/IRmE2AiabUY?si=LWv9qKHToT4u8O0p"
              title="How Tap For Visit works"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section className="how-steps" aria-label="Steps">
          <div className="how-steps-line" aria-hidden="true" />

          {steps.map((step, i) => (
            <article className="how-step" key={step.title}>
              <div className="how-step-index">{String(i + 1).padStart(2, "0")}</div>

              <div className="how-step-body">
                <h2 className="how-step-title">{step.title}</h2>
                <p className="how-step-copy">{step.copy}</p>
              </div>

              <div className="how-step-media">
                <img src="/templateimage.jpg" alt={step.title} />
              </div>
            </article>
          ))}
        </section>

        <section className="how-cta">
          <h2>Ready to get your own card?</h2>
          <p>Claim your username and have your profile live in under a minute.</p>
          <Link to="/signup" className="how-cta-button">
            Get your card
          </Link>
        </section>
      </main>
    </div>
  );
}