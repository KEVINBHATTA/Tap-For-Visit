import { useEffect, useRef, useState } from "react";
import "./CardOrder.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
// Default picture for each view (files live in /public)
const DEFAULT_IMAGES = {
  front: "/FrontPart.png",
  back: "/BackPart.png",
  profile: "/profile.jpg",
};
// Route of the card designs list page (the order page is /CardDesign/:cardId)
const LIST_PATH = "/CardDesign";
const WHATSAPP_NUMBER = "977XXXXXXXXXX"; // country code + number, digits only

const DELIVERY = {
  place: "Bharatpur, Chitwan",
  region: "Bagmati Province",
  method: "Standard delivery",
  eta: "Get by 3-5 days",
  fee: 100,
  payment: "Pay by QR on WhatsApp or cash on delivery",
};

const INCLUDED = [
  "NFC chip and printed QR",
  "Hosted profile page, free forever",
  "Unlimited edits from your dashboard",
  "Waterproof and scratch-resistant",
];

const FIELDS = [
  { name: "name", label: "Name on card", placeholder: "Anjali Sharma", max: 28, required: true },
  { name: "title", label: "Title", placeholder: "Dentist", max: 36 },
  { name: "company", label: "Company name (optional)", placeholder: "Smile Dental Clinic", max: 40 },
  { name: "phone", label: "Phone number (optional)", placeholder: "98XXXXXXXX", max: 20, inputMode: "tel" },
  { name: "website", label: "Website (optional)", placeholder: "www.yourwebsite.com", max: 80, inputMode: "url" },
  { name: "instagram", label: "Instagram page (optional)", placeholder: "instagram.com/yourpage", max: 80 },
];

const EMPTY_FORM = { name: "", title: "", company: "", phone: "", website: "", instagram: "", message: "" };

const VIEWS = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "profile", label: "Profile" },
];

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* One document per card. Later this comes from MongoDB.               */
/* `images` is optional: any missing view uses DEFAULT_IMAGES above.   */
/* ------------------------------------------------------------------ */
const PVC = { groupId: "standard-pvc", groupTitle: "Standard, PVC matte", material: "PVC matte", price: 699, priceNote: "one-time, free profile page included" };
const WOOD = { groupId: "premium-wood", groupTitle: "Premium, eco wood", material: "Eco wood", price: 899, priceNote: "one-time, laser printed, free profile page included" };

const DEMO_CARDS = [
  { _id: "c1", name: "Classic Cream", badge: "Popular", ...PVC },
  { _id: "c2", name: "Indigo Night", ...PVC },
  { _id: "c3", name: "Midnight", ...PVC },
  { _id: "c4", name: "Slate", ...PVC },
  { _id: "c5", name: "Wooden Matte", badge: "Eco choice", ...WOOD },
  { _id: "c6", name: "Oak", ...WOOD },
  { _id: "c7", name: "Walnut", ...WOOD },
  { _id: "c8", name: "Bamboo", ...WOOD },
].map((c) => ({ subtitle: "NFC business card with printed QR", images: {}, ...c }));

async function fetchCard(id) {
  // MongoDB later: call your backend (never connect to Mongo from the browser).
  // const res = await fetch(`/api/cards/${id}`);
  // if (!res.ok) return null;
  // return res.json();
  return DEMO_CARDS.find((c) => c._id === id) ?? null;
}

const formatRs = (n) => "Rs. " + n.toLocaleString("en-IN");

/* ------------------------------------------------------------------ */
/* SMALL COMPONENTS                                                    */
/* ------------------------------------------------------------------ */
function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function CardOrder() {
  const { cardId } = useParams(); // route: /CardDesign/:cardId

  const [card, setCard] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | missing | error
  const [view, setView] = useState("front");
  const [form, setForm] = useState(EMPTY_FORM);
  const [qty, setQty] = useState(1);
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const logoRef = useRef(null);

  /* load the card whenever the id changes, and reset the order form */
  useEffect(() => {
    let live = true;
    setStatus("loading");
    setView("front");
    setForm(EMPTY_FORM);
    setQty(1);
    setLogo(null);
    setError("");
    fetchCard(cardId)
      .then((c) => {
        if (!live) return;
        setCard(c);
        setStatus(c ? "ready" : "missing");
      })
      .catch(() => live && setStatus("error"));
    return () => {
      live = false;
    };
  }, [cardId]);

  useEffect(() => {
    if (card) document.title = `${card.name} | Order | Tap For Visit`;
  }, [card]);

  const onField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const changeQty = (n) => setQty(Math.max(1, Math.min(50, n)));

  const total = card ? card.price * qty : 0;

  function buildOrder() {
    return {
      cardId: card._id,
      cardName: card.name,
      quantity: qty,
      unitPrice: card.price,
      total,
      ...form,
      logoName: logo ? logo.name : null,
    };
  }

  function handleOrder() {
    if (!form.name.trim()) {
      setError("Please enter the name for your card.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    const order = buildOrder();
    console.log("order", order);
    // MongoDB later: send to your backend (use FormData if you upload the logo)
    // await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) });
  }

  const whatsappHref = card
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi Tap For Visit, I'm interested in the ${card.name} card (${formatRs(card.price)}).` +
          (form.name.trim() ? ` Name on card: ${form.name.trim()}.` : "")
      )}`
    : "#";

  /* ---------- states ---------- */
  if (status !== "ready") {
    return (
      <div className="co">
        <Navbar />
        <div className="wrap">
          <p className="state" role="status">
            {status === "loading" && "Loading design\u2026"}
            {status === "missing" && "We couldn\u2019t find that design."}
            {status === "error" && "Something went wrong. Please try again."}
          </p>
          {status !== "loading" && (
            <Link className="btn fill state-btn" to={LIST_PATH}>
              Back to card designs
            </Link>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  const imageFor = (key) => card.images?.[key] || DEFAULT_IMAGES[key];

  return (
    <><Navbar />
    <div className="co">
      

      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={LIST_PATH}>Card designs</Link>
          <span>&rsaquo;</span>
          <Link to={`${LIST_PATH}#${card.groupId}`}>{card.groupTitle}</Link>
          <span>&rsaquo;</span>
          <b>{card.name}</b>
        </nav>

        <div className="page">
          {/* gallery */}
          <section className="pnl" aria-label="Card preview">
            <div className="stage">
              {VIEWS.map((v) => {
                const on = view === v.key ? " on" : "";
                const alt = `${card.name} card, ${v.label.toLowerCase()}`;
                return v.key === "profile" ? (
                  /* profile: a card-sized window; the tall picture scrolls inside it on mobile */
                  <div key={v.key} className={"v profile" + on} tabIndex={0} aria-label={`${alt} (scrollable)`}>
                    <img src={imageFor(v.key)} alt={alt} />
                  </div>
                ) : (
                  <img key={v.key} className={"v" + on} src={imageFor(v.key)} alt={alt} />
                );
              })}
            </div>
            <div className="thumbs" role="group" aria-label="Preview view">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  aria-pressed={view === v.key}
                  onClick={() => setView(v.key)}
                >
                  {v.label}
                </button>
              ))}
            </div>
            <p className="note">
              Your profile details (photo, links, contact info) can be changed anytime after your order is complete.
            </p>
          </section>

          {/* details */}
          <section className="pnl" aria-label="Order details">
            {card.badge && <span className="badge">{card.badge}</span>}
            <h1>{card.name}</h1>
            <p className="sub">{card.subtitle}</p>
            <p className="meta">
              Material: {card.material} &nbsp;|&nbsp; <Link to={`${LIST_PATH}#${card.groupId}`}>More designs like this</Link>
            </p>

            <div className="price">
              <strong>{formatRs(card.price)}</strong>
              <span>{card.priceNote}</span>
            </div>

            <div className="fields">
              {FIELDS.map((f) => (
                <label className="field" key={f.name}>
                  <span>{f.label}</span>
                  <input
                    ref={f.name === "name" ? nameRef : undefined}
                    type="text"
                    name={f.name}
                    value={form[f.name]}
                    onChange={onField}
                    maxLength={f.max}
                    placeholder={f.placeholder}
                    inputMode={f.inputMode}
                    autoComplete="off"
                    aria-required={f.required ? "true" : undefined}
                    aria-invalid={f.name === "name" && error ? "true" : undefined}
                  />
                </label>
              ))}

              <div className="field full">
                <span>Logo (optional)</span>
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
                />
                <button type="button" className="logo" onClick={() => logoRef.current?.click()}>
                  {logo ? `Change logo (${logo.name})` : "Upload logo"}
                </button>
              </div>

              <label className="field full">
                <span>Message (optional)</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onField}
                  maxLength={300}
                  rows={3}
                  placeholder="Tell us anything about your design, colors, or delivery."
                />
              </label>
            </div>

            <div className="qtyrow">
              <span>Quantity</span>
              <div className="qty">
                <button type="button" aria-label="Decrease quantity" onClick={() => changeQty(qty - 1)}>
                  &minus;
                </button>
                <output aria-live="polite">{qty}</output>
                <button type="button" aria-label="Increase quantity" onClick={() => changeQty(qty + 1)}>
                  +
                </button>
              </div>
              <div className="total">
                Total<b>{formatRs(total)}</b>
              </div>
            </div>

            {error && (
              <p className="err" role="alert">
                {error}
              </p>
            )}

            <div className="btns">
              <button type="button" className="btn fill" onClick={handleOrder}>
                Order now
              </button>
              <a className="btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
            <p className="note">
              Our team will contact you on your WhatsApp number within 24 hours to share your card design for your review.
            </p>
          </section>

          {/* sidebar */}
          <aside className="pnl side" aria-label="Delivery and included">
            <div className="sec">
              <h3>Delivery options</h3>
              <div className="row">
                <div>
                  {DELIVERY.place}
                  <small>{DELIVERY.region}</small>
                </div>
                <button type="button" className="chg">
                  CHANGE
                </button>
              </div>
              <div className="row">
                <div>
                  {DELIVERY.method}
                  <small>{DELIVERY.eta}</small>
                </div>
                <strong>{formatRs(DELIVERY.fee)}</strong>
              </div>
              <div className="row">
                <div>{DELIVERY.payment}</div>
              </div>
            </div>

            <div className="sec">
              <h3>Included</h3>
              <ul className="inc">
                {INCLUDED.map((t) => (
                  <li key={t}>
                    <Check />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sec">
              <a className="help" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <b>Need a different design?</b>
                <span>Our team designs it with you on WhatsApp, at free cost.</span>
                <em>Get help</em>
              </a>
            </div>
          </aside>
        </div>
      </div>

      <Footer />

      {/* mobile order bar */}
      <div className="bar">
        <div className="t">
          Total<b>{formatRs(total)}</b>
        </div>
        <button type="button" className="btn fill" onClick={handleOrder}>
          Order now
        </button>
      </div>
    </div>
    </>
  );
}