/* Shared by MyOrders.jsx and OrderDetail.jsx: settings, demo data, helpers, progress bar. */

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
export const WHATSAPP_NUMBER = "977XXXXXXXXXX"; // your business number: country code + number, digits only

// The five stages of an order. `step` on an order = how many stages are done (1 to 5).
export const STEPS = [
  {
    title: "Order placed",
    short: "Placed",
    tone: "neutral",
    history: "Order received. Our team will contact you on WhatsApp within 24 hours to share your design.",
  },
  { title: "Payment verified", short: "Paid", tone: "info", history: "Payment verified." },
  { title: "Printing", short: "Printing", tone: "warn", history: "Your card is being printed." },
  { title: "Shipped", short: "Shipped", tone: "ship", history: "Your card is on its way." },
  { title: "Delivered", short: "Delivered", tone: "ok", history: "Your card has arrived." },
];

export const CANCELLED = { title: "Cancelled", short: "Cancelled", tone: "bad" };

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Demo data. Later load it from your backend / MongoDB.               */
/* `times[i]` = when stage i was completed.                            */
/* ------------------------------------------------------------------ */
const ADDRESS = {
  name: "Kevin Bhatta",
  tag: "HOME",
  address: "Khairahani-6, Chitwan, Bagmati Province",
  landmark: "Near the main chowk",
  phone: "9765637618",
};

export const DEMO_ORDERS = [
  {
    _id: "o1",
    orderNo: "TFV-10482",
    cardName: "Classic Cream",
    material: "PVC matte",
    image: "/FrontPart.png",
    quantity: 1,
    unitPrice: 699,
    deliveryFee: 100,
    payment: "qr",
    printed: { name: "Kevin Bhatta", title: "Founder & CEO" },
    shipping: ADDRESS,
    date: "2026-11-15",
    step: 2,
    times: ["2026-11-15T20:40:00", "2026-11-16T11:05:00"],
  },
  {
    _id: "o2",
    orderNo: "TFV-10377",
    cardName: "Wooden Matte",
    material: "Eco wood",
    image: "/FrontPart.png",
    quantity: 2,
    unitPrice: 899,
    deliveryFee: 100,
    payment: "cod",
    printed: { name: "Kevin Bhatta", title: "Founder & CEO" },
    shipping: ADDRESS,
    date: "2026-11-12",
    step: 4,
    times: ["2026-11-12T09:05:00", "2026-11-12T11:30:00", "2026-11-13T16:20:00", "2026-11-14T08:45:00"],
  },
  {
    _id: "o3",
    orderNo: "TFV-10215",
    cardName: "Indigo Night",
    material: "PVC matte",
    image: "/FrontPart.png",
    quantity: 1,
    unitPrice: 699,
    deliveryFee: 100,
    payment: "qr",
    printed: { name: "Kevin Bhatta", title: "Founder & CEO" },
    shipping: ADDRESS,
    date: "2026-10-19",
    step: 5,
    times: ["2026-10-19T14:02:00", "2026-10-19T15:10:00", "2026-10-20T12:00:00", "2026-10-21T09:30:00", "2026-10-24T17:15:00"],
  },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
export const formatRs = (n) => "Rs. " + n.toLocaleString("en-IN");
export const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const formatShort = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
export const formatDateTime = (d) =>
  `${formatDate(d)}, ${new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

export const isDelivered = (o) => !o.cancelled && o.step >= STEPS.length;
export const isActive = (o) => !o.cancelled && o.step < STEPS.length;
export const subtotal = (o) => o.unitPrice * o.quantity;
export const orderTotal = (o) => subtotal(o) + o.deliveryFee;

export function paymentText(o) {
  if (o.payment === "cod") return "Cash on delivery";
  return o.step >= 2 ? "Paid by QR on WhatsApp" : "Pay by QR on WhatsApp";
}

/* ------------------------------------------------------------------ */
/* PROGRESS BAR (styled in MyOrders.css, so render it inside .mo)      */
/* ------------------------------------------------------------------ */
export function Progress({ step, labels = true }) {
  return (
    <div className={"mo-progress" + (step >= STEPS.length ? " is-done" : "")}>
      <div className="mo-bar" role="progressbar" aria-valuemin={0} aria-valuemax={STEPS.length} aria-valuenow={step} aria-label="Order progress">
        {STEPS.map((s, i) => (
          <i key={s.title} className={i < step ? "on" : ""} style={{ "--i": i }} />
        ))}
      </div>
      {labels && (
        <ol className="mo-labels" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li key={s.title} className={i === step - 1 ? "now" : i < step ? "past" : ""}>
              {s.short}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
