import { useState } from "react";
import "./MyOrders.css"; // status chips and the progress bar live here
import "./OrderDetail.css";
import {
  CANCELLED,
  STEPS,
  WHATSAPP_NUMBER,
  Progress,
  formatDateTime,
  formatRs,
  formatShort,
  orderTotal,
  paymentText,
  subtotal,
} from "./orderShared";

/* ------------------------------------------------------------------ */
/* One order in full. MyOrders.jsx shows it when you press Track.      */
/* <OrderDetail order={order} onBack={...} onCancel={...} />           */
/* ------------------------------------------------------------------ */
export default function OrderDetail({ order, onBack, onCancel }) {
  const [showTracking, setShowTracking] = useState(true);

  const cancelled = !!order.cancelled;
  const stage = cancelled ? CANCELLED : STEPS[order.step - 1];
  const lastTime = order.times?.[order.step - 1];
  const canCancel = !cancelled && order.step < 3; // before printing starts

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Tap For Visit, I need help with order ${order.orderNo}.`
  )}`;

  // newest first
  const history = STEPS.slice(0, order.step)
    .map((s, i) => ({ ...s, time: order.times?.[i] }))
    .reverse();

  function handleCancel() {
    if (!window.confirm(`Cancel order ${order.orderNo}?`)) return;
    onCancel?.(order._id);
  }

  return (
    <div className="mo od">
      <button type="button" className="od-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        My Orders
      </button>

      {/* package */}
      <section className="od-card" aria-label="Package">
        <header className="od-pkg-head">
          <div>
            <b>Tap For Visit</b>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp
            </a>
          </div>
          <span className={"mo-chip mo-tone-" + stage.tone}>
            <i aria-hidden="true" />
            {stage.title}
          </span>
        </header>

        <div className="od-status">
          <div className="od-status-row">
            <div>
              <p className="od-delivery">
                Standard delivery <b>{formatRs(order.deliveryFee)}</b>
              </p>
              <p className="od-stage">
                <b>{stage.title}</b>
                {!cancelled && lastTime && <span>{formatShort(lastTime)}</span>}
              </p>
            </div>
            {!cancelled && (
              <button
                type="button"
                className="od-toggle"
                aria-expanded={showTracking}
                aria-controls="od-history"
                onClick={() => setShowTracking((v) => !v)}
              >
                {showTracking ? "Hide tracking" : "Show tracking"}
              </button>
            )}
          </div>
          {!cancelled && <Progress step={order.step} labels={false} />}
          {cancelled && <p className="od-cancelled">This order was cancelled.</p>}
        </div>

        {!cancelled && showTracking && (
          <div className="od-history" id="od-history">
            <h3>Tracking history</h3>
            <ol>
              {history.map((h, i) => (
                <li key={h.title} className={i === 0 ? "now" : ""}>
                  <span className="od-dot" aria-hidden="true" />
                  <div>
                    <b>{h.title}</b>
                    <p>{h.history}</p>
                    {h.time && <small>{formatDateTime(h.time)}</small>}
                  </div>
                </li>
              ))}
            </ol>
            <p className="od-note">Delivery usually takes 3-5 days after your card ships.</p>
          </div>
        )}

        <div className="od-item">
          <div className="od-thumb">
            <img src={order.image} alt={`${order.cardName} card`} loading="lazy" />
          </div>
          <div className="od-item-info">
            <b>{order.cardName}</b>
            <p>
              {order.material} <i aria-hidden="true">&middot;</i> Printed: {order.printed.name}
              {order.printed.title ? `, ${order.printed.title}` : ""}
            </p>
            <p className="od-price">
              <b>{formatRs(order.unitPrice)}</b>
              <span>Qty: {order.quantity}</span>
            </p>
          </div>
          {canCancel && (
            <button type="button" className="od-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </section>

      {/* order info */}
      <section className="od-card od-info" aria-label="Order information">
        <h3>Order {order.orderNo}</h3>
        {STEPS.slice(0, order.step).map((s, i) => {
          const t = order.times?.[i];
          if (!t) return null;
          return (
            <p key={s.title}>
              {i === 0 ? "Placed" : s.title} on {formatDateTime(t)}
            </p>
          );
        })}
        <p className="od-pay">{paymentText(order)}</p>
      </section>

      {/* address + total */}
      <div className="od-pair">
        <section className="od-card od-ship" aria-label="Shipping address">
          <h3>Shipping address</h3>
          <p className="od-name">{order.shipping.name}</p>
          <p className="od-addr">
            {order.shipping.tag && <span className="od-tag">{order.shipping.tag}</span>}
            {order.shipping.address}
          </p>
          {order.shipping.landmark && <p className="od-addr">Landmark: {order.shipping.landmark}</p>}
          <p className="od-addr">{order.shipping.phone}</p>
          <p className="od-note">Saved as it was when you ordered. Later address edits don&rsquo;t change this order.</p>
        </section>

        <section className="od-card od-sum" aria-label="Total summary">
          <h3>Total summary</h3>
          <div className="od-line">
            <span>Subtotal ({order.quantity} {order.quantity === 1 ? "item" : "items"})</span>
            <b>{formatRs(subtotal(order))}</b>
          </div>
          <div className="od-line">
            <span>Shipping fee</span>
            <b>{formatRs(order.deliveryFee)}</b>
          </div>
          <div className="od-total">
            <span>Total</span>
            <strong>{formatRs(orderTotal(order))}</strong>
          </div>
          <p className="od-note">{paymentText(order)}</p>
        </section>
      </div>
    </div>
  );
}
