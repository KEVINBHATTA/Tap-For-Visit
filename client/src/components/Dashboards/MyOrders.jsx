import { useMemo, useState } from "react";
import "./MyOrders.css";
import OrderDetail from "./OrderDetail";
import {
  CANCELLED,
  DEMO_ORDERS,
  STEPS,
  Progress,
  formatDate,
  formatRs,
  isActive,
  isDelivered,
  orderTotal,
} from "./orderShared";

const BROWSE_PATH = "/CardDesign"; // shown in the empty state

const FILTERS = [
  { key: "all", label: "All" },
  { key: "progress", label: "In progress" },
  { key: "delivered", label: "Delivered" },
];

/* ------------------------------------------------------------------ */
/* ORDER CARD                                                          */
/* ------------------------------------------------------------------ */
function OrderCard({ order, onOpen }) {
  const stage = order.cancelled ? CANCELLED : STEPS[order.step - 1];

  return (
    <article className="mo-card">
      <div className="mo-top">
        <div className="mo-thumb">
          <img src={order.image} alt={`${order.cardName} card`} loading="lazy" />
        </div>

        <div className="mo-info">
          <p className="mo-no">{order.orderNo}</p>
          <h3>
            {order.cardName}
            {order.quantity > 1 && <span> &times; {order.quantity}</span>}
          </h3>
          <p className="mo-meta">
            {order.material} <i aria-hidden="true">&middot;</i> {formatDate(order.date)}
          </p>
        </div>

        <div className="mo-side">
          <span className={"mo-chip mo-tone-" + stage.tone}>
            <i aria-hidden="true" />
            {stage.title}
          </span>
          <p className="mo-total">{formatRs(orderTotal(order))}</p>
          <button type="button" className="mo-track" onClick={onOpen} aria-label={`Track order ${order.orderNo}`}>
            Track
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {!order.cancelled && <Progress step={order.step} />}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* Drop it anywhere: <MyOrders />. It follows the surrounding page's   */
/* white / dark theme and falls back to white on its own.              */
/* ------------------------------------------------------------------ */
export default function MyOrders() {
  /* MongoDB later: load the signed-in user's orders, e.g.
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders/mine").then((r) => r.json()).then(setOrders).catch(console.error);
  }, []);
  */
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const sorted = useMemo(() => [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)), [orders]);

  const counts = useMemo(
    () => ({
      all: sorted.length,
      progress: sorted.filter(isActive).length,
      delivered: sorted.filter(isDelivered).length,
    }),
    [sorted]
  );

  const visible = sorted.filter((o) =>
    filter === "all" ? true : filter === "delivered" ? isDelivered(o) : isActive(o)
  );

  const selected = orders.find((o) => o._id === selectedId);

  function open(id) {
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  function cancelOrder(id) {
    // MongoDB later: tell your backend, e.g. fetch(`/api/orders/${id}/cancel`, { method: "POST" })
    setOrders((list) => list.map((o) => (o._id === id ? { ...o, cancelled: true } : o)));
  }

  /* ---------- one order in full ---------- */
  if (selected) {
    return (
      <section className="mo" aria-label="Order details">
        <OrderDetail order={selected} onBack={() => setSelectedId(null)} onCancel={cancelOrder} />
      </section>
    );
  }

  /* ---------- the list ---------- */
  return (
    <section className="mo" aria-label="My orders">
      <div className="mo-tabs" role="group" aria-label="Filter orders">
        {FILTERS.map((f) => (
          <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
            <span>{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mo-empty">
          <div className="mo-empty-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10" />
            </svg>
          </div>
          <b>No orders here yet.</b>
          <span>When you order a card, it shows up here.</span>
          <a href={BROWSE_PATH}>Browse card designs</a>
        </div>
      ) : (
        <div className="mo-list">
          {visible.map((o) => (
            <OrderCard key={o._id} order={o} onOpen={() => open(o._id)} />
          ))}
        </div>
      )}
    </section>
  );
}
