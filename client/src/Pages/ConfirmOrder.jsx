import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ConfirmOrder.css";
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
// Route of the card designs list page (same value as in CardOrder.jsx)
const LIST_PATH = "/CardDesign";
// Key CardOrder.jsx uses to hand the order over (also lets a page refresh keep it)
const ORDER_KEY = "tfv-pending-order";
// Where the finished order is handed to the Order placed page, and that page's route
const PLACED_KEY = "tfv-placed-order";
const PLACED_PATH = "/order-placed";

// DEMO ONLY: check promo codes on your backend later.
const DEMO_PROMOS = { TAP10: { percent: 10 } };

const PAYMENTS = [
  { key: "qr", label: "Pay by QR on WhatsApp" },
  { key: "cod", label: "Cash on delivery" },
];

const formatRs = (n) => "Rs. " + n.toLocaleString("en-IN");
const digits = (s) => (s || "").replace(/\D/g, "");

function loadOrder(state, cardId) {
  let order = state?.order ?? null;
  if (!order) {
    try {
      order = JSON.parse(sessionStorage.getItem(ORDER_KEY) || "null");
    } catch {
      order = null;
    }
  }
  return order && order.cardId === cardId ? order : null;
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function ConfirmOrder() {
  const { cardId } = useParams(); // route: /CardDesign/:cardId/confirm
  const { state } = useLocation();
  const navigate = useNavigate();

  const [order] = useState(() => loadOrder(state, cardId));
  const [ship, setShip] = useState(() => ({
    name: order?.name ?? "",
    phone: order?.phone ?? "",
    address: order ? `${order.delivery.place}, ${order.delivery.region}` : "",
    landmark: "",
  }));
  const [editing, setEditing] = useState(() => !(order?.name && order?.phone));
  const [waSame, setWaSame] = useState(false);
  const [waNumber, setWaNumber] = useState("");
  const [pay, setPay] = useState("qr");
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null); // { code, percent }
  const [promoMsg, setPromoMsg] = useState("");
  const [errors, setErrors] = useState({});

  const shipRef = useRef(null);
  const waRef = useRef(null);

  useEffect(() => {
    document.title = "Confirm your order | Tap For Visit";
  }, []);

  // No order to confirm (opened the link directly): go back to the order page
  if (!order) return <Navigate to={`${LIST_PATH}/${cardId}`} replace />;

  const itemsTotal = order.unitPrice * order.quantity;
  const fee = order.delivery.fee;
  const discount = promo ? Math.round((itemsTotal * promo.percent) / 100) : 0;
  const total = itemsTotal + fee - discount;
  const waValue = waSame ? ship.phone : waNumber;

  const onShip = (e) => setShip((s) => ({ ...s, [e.target.name]: e.target.value }));

  function applyPromo() {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    const found = DEMO_PROMOS[code];
    if (found) {
      setPromo({ code, ...found });
      setPromoMsg(`Promo ${code} applied.`);
    } else {
      setPromo(null);
      setPromoMsg("That promo code isn\u2019t valid.");
    }
  }

  function handlePlace() {
    const next = {};
    if (!ship.name.trim()) next.ship = "Please enter the name for delivery.";
    else if (digits(ship.phone).length < 7) next.ship = "Please enter a valid phone number.";
    if (digits(waValue).length < 7) next.wa = "Please enter your WhatsApp number.";
    setErrors(next);

    if (next.ship) {
      setEditing(true);
      shipRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (next.wa) {
      waRef.current?.focus();
      return;
    }

    const { logo, ...rest } = order; // logo is a File: send it with FormData
    const finalOrder = {
      ...rest,
      orderNo: "TFV-" + Math.floor(10000 + Math.random() * 90000), // your backend should issue the real order number
      placedAt: new Date().toISOString(),
      logoName: logo ? logo.name : rest.logoName ?? null,
      shipping: ship,
      whatsapp: waValue.trim(),
      payment: pay,
      promoCode: promo ? promo.code : null,
      itemsTotal,
      deliveryFee: fee,
      discount,
      total,
    };
    console.log("place order", finalOrder);
    // MongoDB later: send to your backend (use FormData if you upload the logo)
    // await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(finalOrder) });
    sessionStorage.removeItem(ORDER_KEY);
    try {
      sessionStorage.setItem(PLACED_KEY, JSON.stringify(finalOrder));
    } catch {
      /* storage unavailable: router state still carries the order */
    }
    navigate(PLACED_PATH, { replace: true, state: { order: finalOrder } });
  }

  /* ---------- confirm ---------- */
  return (
    <>
    <Navbar />
    <div className="cf">
      <Navbar />

      <div className="wrap">
        <Link className="back" to={`${LIST_PATH}/${cardId}`}>
          &lsaquo; Back to {order.cardName}
        </Link>
        <h1>Confirm your order.</h1>

        <div className="page">
          <div className="main">
            {/* shipping address */}
            <section className="pnl" aria-label="Shipping address" ref={shipRef}>
              <div className="hd">
                <h2>Shipping address</h2>
                <button
                  type="button"
                  className="lnk"
                  onClick={() => {
                    if (editing && (!ship.name.trim() || digits(ship.phone).length < 7)) return;
                    setEditing((v) => !v);
                  }}
                >
                  {editing ? "DONE" : "EDIT"}
                </button>
              </div>

              {editing ? (
                <div className="efields">
                  <label className="ef">
                    <span>Full name</span>
                    <input type="text" name="name" value={ship.name} onChange={onShip} maxLength={40} autoComplete="name" />
                  </label>
                  <label className="ef">
                    <span>Phone number</span>
                    <input type="text" name="phone" value={ship.phone} onChange={onShip} maxLength={20} inputMode="tel" autoComplete="tel" />
                  </label>
                  <label className="ef full">
                    <span>Address</span>
                    <input type="text" name="address" value={ship.address} onChange={onShip} maxLength={120} autoComplete="street-address" />
                  </label>
                  <label className="ef full">
                    <span>Landmark (optional)</span>
                    <input type="text" name="landmark" value={ship.landmark} onChange={onShip} maxLength={80} placeholder="Near the main chowk" />
                  </label>
                </div>
              ) : (
                <>
                  <p className="who">
                    {ship.name}
                    <span>{ship.phone}</span>
                  </p>
                  <p className="addr">
                    <span className="tag">HOME</span>
                    {ship.address}
                    {ship.landmark && <small>{ship.landmark}</small>}
                  </p>
                </>
              )}
              {errors.ship && (
                <p className="err" role="alert">
                  {errors.ship}
                </p>
              )}

              <div className="wa">
                <label htmlFor="wa-n">
                  <span>Please give your WhatsApp number</span>
                </label>
                <input
                  ref={waRef}
                  type="text"
                  id="wa-n"
                  inputMode="tel"
                  maxLength={20}
                  placeholder="9841234567"
                  autoComplete="tel"
                  value={waValue}
                  readOnly={waSame}
                  onChange={(e) => setWaNumber(e.target.value)}
                  aria-invalid={errors.wa ? "true" : undefined}
                />
                <label className="same">
                  <input
                    type="checkbox"
                    checked={waSame}
                    onChange={(e) => {
                      setWaSame(e.target.checked);
                      if (!e.target.checked) setWaNumber("");
                    }}
                  />
                  My WhatsApp number is the same as my phone number
                </label>
                {errors.wa ? (
                  <small className="err" role="alert">
                    {errors.wa}
                  </small>
                ) : (
                  <small>Our team will contact you on this number.</small>
                )}
              </div>
            </section>

            {/* package */}
            <section className="pnl" aria-label="Package">
              <div className="hd">
                <h2>Package 1 of 1</h2>
                <span>Fulfilled by Tap For Visit</span>
              </div>
              <p className="dlabel">Delivery</p>
              <div className="dopt">
                <span className="ck">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <div>
                  <b>{formatRs(fee)}</b>
                  <span>{order.delivery.method}</span>
                  <span>{order.delivery.eta}</span>
                </div>
              </div>

              <div className="item">
                <img className="thumb" src={order.image} alt={`${order.cardName} card`} />
                <div>
                  <h3>{order.cardName}</h3>
                  <p className="s">NFC business card, {order.material}</p>
                  <p className="s">
                    Printed: {order.name}
                    {order.title ? `, ${order.title}` : ""}
                  </p>
                  <div className="pr">
                    <b>{formatRs(order.unitPrice)}</b>
                    <span>Qty: {order.quantity}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* payment */}
            <section className="pnl" aria-label="Payment">
              <div className="hd">
                <h2>Payment</h2>
              </div>
              {PAYMENTS.map((p) => (
                <label className="pay" key={p.key}>
                  <input type="radio" name="pay" checked={pay === p.key} onChange={() => setPay(p.key)} />
                  <span className="rd" />
                  <span>{p.label}</span>
                </label>
              ))}
            </section>
          </div>

          {/* summary */}
          <aside className="pnl sum" aria-label="Order summary">
            <h2>Promotion</h2>
            <div className="promo">
              <input
                type="text"
                placeholder="Enter promo code"
                aria-label="Promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
              />
              <button type="button" className="apply" onClick={applyPromo}>
                APPLY
              </button>
            </div>
            {promoMsg && (
              <p className={"pmsg" + (promo ? " ok" : " bad")} role="status">
                {promoMsg}
              </p>
            )}

            <h2>Order detail</h2>
            <div className="d">
              Items total ({order.quantity} {order.quantity === 1 ? "item" : "items"})<b>{formatRs(itemsTotal)}</b>
            </div>
            <div className="d">
              Delivery fee<b>{formatRs(fee)}</b>
            </div>
            <div className="d">
              Promotion<b>{discount > 0 ? "\u2212" + formatRs(discount) : formatRs(0)}</b>
            </div>
            <div className="t">
              <span>Total:</span>
              <strong>{formatRs(total)}</strong>
            </div>
            <p className="tx">All taxes included</p>
            <button type="button" className="btn fill desk" onClick={handlePlace}>
              Place order
            </button>
            <p className="note">
              Our team will contact you on your WhatsApp number within 24 hours to share your card design for your review.
            </p>
          </aside>
        </div>
      </div>

      <Footer />

      {/* mobile order bar */}
      <div className="bar">
        <div className="tt">
          Total<b>{formatRs(total)}</b>
        </div>
        <button type="button" className="btn fill" onClick={handlePlace}>
          Place order
        </button>
      </div>
    </div>
    </>
  );
}