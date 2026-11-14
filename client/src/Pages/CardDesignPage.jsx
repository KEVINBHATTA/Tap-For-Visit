import { useEffect, useMemo, useState } from "react";
import "./CardDesignPage.css";
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Shape matches what you'll likely store in MongoDB. Later, replace   */
/* DEMO_GROUPS with the result of your API call (see useEffect below). */
/* Image lives in /public as BackPart.png.                         */
/* ------------------------------------------------------------------ */
const SAMPLE_IMAGE = "/BackPart.png";

const DEMO_GROUPS = [
  {
    _id: "standard-pvc",
    title: "Standard, PVC matte",
    price: 699,
    priceNote: "one-time",
    cards: [
      { _id: "c1", name: "Classic Cream", badge: "Popular", tags: ["Light", "Minimal"], image: SAMPLE_IMAGE },
      { _id: "c2", name: "Indigo Night", tags: ["Dark", "Bold"], image: SAMPLE_IMAGE },
      { _id: "c3", name: "Midnight", tags: ["Dark", "Minimal"], image: SAMPLE_IMAGE },
      { _id: "c4", name: "Slate", tags: ["Dark"], image: SAMPLE_IMAGE },
    ],
  },
  {
    _id: "premium-wood",
    title: "Premium, eco wood",
    price: 899,
    priceNote: "one-time, laser printed",
    cards: [
      { _id: "c5", name: "Wooden Matte", badge: "Eco choice", tags: ["Dark", "Bold"], image: SAMPLE_IMAGE },
      { _id: "c6", name: "Oak", tags: ["Light"], image: SAMPLE_IMAGE },
      { _id: "c7", name: "Walnut", tags: ["Dark"], image: SAMPLE_IMAGE },
      { _id: "c8", name: "Bamboo", tags: ["Light", "Minimal"], image: SAMPLE_IMAGE },
    ],
  },
];

const FILTERS = ["All", "Dark", "Light", "Minimal", "Bold"];

const SLIDES = [
  {
    title: "Customize a design",
    text: "Add your logo, colors, and text to any design below, at free cost.",
    cta: "Start customizing",
    href: "#",
  },
  {
    title: "Get help from our team",
    text: "Tell us what you want on WhatsApp and we\u2019ll design it with you, at free cost.",
    cta: "Message us",
    href: "#",
  },
];

/* ------------------------------------------------------------------ */
/* SMALL COMPONENTS                                                    */
/* ------------------------------------------------------------------ */
function Strip() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="strip"
      role="region"
      aria-roledescription="carousel"
      aria-label="Custom card options"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={() => setPaused(true)}
    >
      <div className="vp">
        <div className="track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {SLIDES.map((s) => (
            <div className="slide" key={s.title}>
              <div>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
              <a className="btn fill" href={s.href}>{s.cta}</a>
            </div>
          ))}
        </div>
      </div>
      <div className="ctl">
        <div className="dots">
          {SLIDES.map((s, k) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Show slide ${k + 1}`}
              aria-current={k === index ? "true" : undefined}
              onClick={() => setIndex(k)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardTile({ card }) {
  return (
    <a className="tile" href={`#card-${card._id}`}>
      <div className="card">
        <img src={card.image} alt={`${card.name} card design`} loading="lazy" />
      </div>
      <div className="nm">
        {card.name}
        {card.badge && <i>{card.badge}</i>}
      </div>
    </a>
  );
}

function MoreTile() {
  return (
    <a className="more-tile" href="#">
      <span className="mi">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
      <span>See more</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function CardDesigns() {
  const [groups, setGroups] = useState(DEMO_GROUPS);
  const [filter, setFilter] = useState("All");

  /* MongoDB later: call your backend (never connect to Mongo from the browser).
  useEffect(() => {
    fetch("/api/card-designs")
      .then((r) => r.json())
      .then(setGroups)
      .catch(console.error);
  }, []);
  */

  const visibleGroups = useMemo(
    () =>
      groups
        .map((g) => ({
          ...g,
          cards: filter === "All" ? g.cards : g.cards.filter((c) => c.tags?.includes(filter)),
        }))
        .filter((g) => g.cards.length > 0),
    [groups, filter]
  );

  return (
    <>
      <Navbar />

      <div className="wrap">
        <Strip />

        <section id="browse">
          <h2>Card designs to start from.</h2>
          <div className="chips" role="group" aria-label="Filter designs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {visibleGroups.map((g) => (
            <div className="group" key={g._id}>
              <div className="ghead">
                <h3>{g.title}</h3>
                <p>
                  Rs <b>{g.price}</b> {g.priceNote}
                </p>
              </div>
              <div className="grid">
                {g.cards.map((c) => (
                  <CardTile card={c} key={c._id} />
                ))}
                <MoreTile />
              </div>
            </div>
          ))}
        </section>

        <section className="help">
          <h2>Make it yours.</h2>
          <div className="hgrid">
            <a className="opt" href="#">
              <b>Customize a design</b>
              <span>Add your logo, colors, and text to any design above.</span>
              <em>Start customizing</em>
            </a>
            <a className="opt" href="#">
              <b>Get help from our team</b>
              <span>Tell us what you want on WhatsApp and we&rsquo;ll design it with you, at free cost.</span>
              <em>Message us</em>
            </a>
          </div>
        </section>
        <div className="foot" />
      </div>

      <Footer />
    </>
  );
}