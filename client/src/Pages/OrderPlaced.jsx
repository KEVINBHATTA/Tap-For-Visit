import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import "./OrderPlaced.css";
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
const HOME_PATH = "/";
const LIST_PATH = "/CardDesign";
const DASHBOARD_PATH = "/dashboard"; // change to your real dashboard route
// Key ConfirmOrder.jsx saves the finished order under (lets a refresh keep this page)
const PLACED_KEY = "tfv-placed-order";
const WHATSAPP_NUMBER = "977XXXXXXXXXX"; // your business number: country code + number, digits only

const PAYMENT_LABELS = { qr: "Pay by QR on WhatsApp", cod: "Cash on delivery" };

const formatRs = (n) => "Rs. " + n.toLocaleString("en-IN");
const digits = (s) => (s || "").replace(/\D/g, "");

function loadOrder(state) {
  if (state?.order) return state.order;
  try {
    return JSON.parse(sessionStorage.getItem(PLACED_KEY) || "null");
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* PAGE                                                                */
/* ------------------------------------------------------------------ */
export default function OrderPlaced() {
  const { state } = useLocation();

  const [order] = useState(() => loadOrder(state));
  const [whatsapp, setWhatsapp] = useState(() => order?.whatsapp ?? "");
  const [editingWa, setEditingWa] = useState(false);
  const [waInput, setWaInput] = useState("");
  const [waError, setWaError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Order placed | Tap For Visit";
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  // Nothing to show (opened the link directly): go to the card designs
  if (!order) return <Navigate to={LIST_PATH} replace />;

  async function copyOrderNo() {
    try {
      await navigator.clipboard.writeText(order.orderNo);
    } catch {
      /* clipboard blocked: still show the confirmation */
    }
    setCopied(true);
  }

  function saveWhatsapp() {
    if (digits(waInput).length < 7) {
      setWaError("Please enter a valid WhatsApp number.");
      return;
    }
    setWaError("");
    setWhatsapp(waInput.trim());
    setEditingWa(false);
    // MongoDB later: update the number on the order
    // fetch(`/api/orders/${order.orderNo}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ whatsapp: waInput.trim() }) });
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Tap For Visit, I just placed order ${order.orderNo} (${order.cardName}).`
  )}`;

  const steps = [
    { title: "Confirmation message", text: "Delivered to your WhatsApp number.", done: true },
    {
      title: "Design review",
      text: "Our team will contact you within 24 hours to share your card design for your review.",
    },
    {
      title: "Print and delivery",
      text: `Once you approve, your card is printed and delivered in ${order.delivery?.eta?.replace("Get by ", "") ?? "3-5 days"}.`,
    },
  ];

  return (
    <div className="op">
      <Navbar />

      <main className="opw">
        <section className="opc" aria-labelledby="op-title">
          <div className="tick" aria-hidden="true">
            <svg viewBox="0 0 52 52">
              <circle className="c" cx="26" cy="26" r="26" />
              <path className="p" d="M15 27l8 8 14-16" />
            </svg>
          </div>
          <h1 id="op-title">Order placed.</h1>
          <p className="lead">
            Thank you, {order.shipping.name}. Your order confirmation message will be delivered to your WhatsApp number{" "}
            <b>{whatsapp}</b>.
          </p>

          <div className="ord">
            <span>Order no.</span>
            <b>{order.orderNo}</b>
            <button type="button" onClick={copyOrderNo}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className={"n" + (s.done ? " done" : "")}>
                  {s.done ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <div>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </div>
              </li>
            ))}
          </ol>

          <div className="sum">
            <div className="r">
              {order.cardName} &times; {order.quantity}
              <b>{formatRs(order.itemsTotal)}</b>
            </div>
            <div className="r">
              Delivery fee<b>{formatRs(order.deliveryFee)}</b>
            </div>
            {order.discount > 0 && (
              <div className="r">
                Promotion{order.promoCode ? ` (${order.promoCode})` : ""}
                <b>&minus;{formatRs(order.discount)}</b>
              </div>
            )}
            <div className="r">
              Payment<b>{PAYMENT_LABELS[order.payment] ?? order.payment}</b>
            </div>
            <div className="t">
              <span>Total:</span>
              <strong>{formatRs(order.total)}</strong>
            </div>
          </div>

          <div className="acts">
            <Link className="btn fill" to={HOME_PATH}>
              Back to home
            </Link>
            <a className="btn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Open WhatsApp
            </a>
          </div>

          {editingWa ? (
            <div className="wa-edit">
              <label htmlFor="op-wa">
                <span>Your WhatsApp number</span>
              </label>
              <div className="wa-row">
                <input
                  id="op-wa"
                  type="text"
                  inputMode="tel"
                  maxLength={20}
                  autoComplete="tel"
                  placeholder="9841234567"
                  value={waInput}
                  onChange={(e) => setWaInput(e.target.value)}
                  aria-invalid={waError ? "true" : undefined}
                  autoFocus
                />
                <button type="button" className="save" onClick={saveWhatsapp}>
                  SAVE
                </button>
              </div>
              {waError && (
                <p className="err" role="alert">
                  {waError}
                </p>
              )}
            </div>
          ) : (
            <p className="fine">
              Wrong number?{" "}
              <button
                type="button"
                className="linkbtn"
                onClick={() => {
                  setWaInput(whatsapp);
                  setEditingWa(true);
                }}
              >
                Change it
              </button>
            </p>
          )}

          <div className="wait">
            <b>While you wait</b>
            <span>Set up your profile page now. You can edit it anytime.</span>
            <br />
            <Link to={DASHBOARD_PATH}>Open dashboard</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}