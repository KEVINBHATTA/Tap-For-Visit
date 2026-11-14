// client/src/pages/CardDesignPage.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CardDesignPage.css";

/* Placeholder prices (NPR) - replace with real ones or load from your API */
const FINISHES = [
  { id: "midnight", name: "Midnight", note: "Matte black, purple edge", price: 1499 },
  { id: "violet", name: "Violet", note: "Purple to blue gradient", price: 1799 },
  { id: "pearl", name: "Pearl", note: "Soft white, dark print", price: 1599 },
];

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "9779800000000";

/* ---------- small reusable pieces ---------- */

function NfcMark() {
  return (
    <svg className="cd-nfc" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8c2.5 2.5 2.5 5.5 0 8M10 5.5c4 3.5 4 9.5 0 13M14 3c5.5 5 5.5 13 0 18" />
    </svg>
  );
}

/* Placeholder QR pattern - swap for a real QR (e.g. qrcode.react) later */
function QrPlaceholder({ seed }) {
  const cells = useMemo(() => {
    const size = 15;
    let h = 0;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const out = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const finder =
          (x < 5 && y < 5) || (x > 9 && y < 5) || (x < 5 && y > 9);
        h = (h * 1664525 + 1013904223) >>> 0;
        if (!finder && h % 100 < 48) out.push(`${x}-${y}`);
      }
    }
    return { size, out };
  }, [seed]);

  const f = (x, y) => (
    <g key={`${x}${y}`}>
      <rect x={x} y={y} width="5" height="5" />
      <rect x={x + 1} y={y + 1} width="3" height="3" className="cd-qr-hole" />
      <rect x={x + 2} y={y + 2} width="1" height="1" />
    </g>
  );

  return (
    <svg className="cd-qr" viewBox="0 0 15 15" aria-label="QR code preview">
      {f(0, 0)}
      {f(10, 0)}
      {f(0, 10)}
      {cells.out.map((k) => {
        const [x, y] = k.split("-");
        return <rect key={k} x={x} y={y} width="1" height="1" />;
      })}
    </svg>
  );
}

function CardPreview({ finish, name, title, side }) {
  return (
    <div className={`cd-card cd-card--${finish}`} role="img"
      aria-label={`Card preview, ${side} side`}>
      <div className={`cd-face cd-front ${side === "front" ? "is-on" : ""}`}>
        <NfcMark />
        <div className="cd-print">
          <p className="cd-print-name">{name || "Your name"}</p>
          <p className="cd-print-title">{title || "Your title"}</p>
        </div>
      </div>
      <div className={`cd-face cd-rear ${side === "back" ? "is-on" : ""}`}>
        <QrPlaceholder seed={name || "tapforvisit"} />
        <p className="cd-back-text">
          Scan if the tap doesn't work. It opens offline too.
        </p>
      </div>
    </div>
  );
}

function SideToggle({ side, onChange }) {
  return (
    <div className="cd-toggle" role="group" aria-label="Card side">
      {["front", "back"].map((s) => (
        <button
          key={s}
          type="button"
          className={side === s ? "is-active" : ""}
          aria-pressed={side === s}
          onClick={() => onChange(s)}
        >
          {s === "front" ? "Front" : "Back"}
        </button>
      ))}
    </div>
  );
}

function FinishPicker({ value, onChange }) {
  return (
    <fieldset className="cd-finishes">
      <legend className="cd-h2">Finish</legend>
      {FINISHES.map((f) => (
        <label key={f.id} className={`cd-finish ${value === f.id ? "is-active" : ""}`}>
          <input
            type="radio"
            name="finish"
            value={f.id}
            checked={value === f.id}
            onChange={() => onChange(f.id)}
          />
          <span className={`cd-swatch cd-swatch--${f.id}`} />
          <span className="cd-finish-text">
            <strong>{f.name}</strong>
            <small>{f.note}</small>
          </span>
          <span className="cd-finish-price">Rs {f.price.toLocaleString("en-IN")}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Field({ label, value, onChange, max, placeholder }) {
  return (
    <label className="cd-field">
      <span>{label}</span>
      <input
        type="text"
        value={value}
        maxLength={max}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/* ---------- page ---------- */

export default function CardDesignPage() {
  const [finish, setFinish] = useState("violet");
  const [side, setSide] = useState("front");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const selected = FINISHES.find((f) => f.id === finish);

  const waLink = useMemo(() => {
    const msg = [
      "Hi Tap For Visit, I want to order a card.",
      `Finish: ${selected.name}`,
      `Name on card: ${name || "-"}`,
      `Title on card: ${title || "-"}`,
    ].join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [selected, name, title]);

  return (
    <main className="cd-page">
      <header className="cd-head">
        <Link to="/" className="cd-home" aria-label="Back to home">&larr; Home</Link>
        <h1 className="cd-h1">Design your card</h1>
        <p className="cd-lead">
          Pick a finish and type what gets printed. Your profile link is
          already built in.
        </p>
      </header>

      <section className="cd-stage">
        <CardPreview finish={finish} name={name} title={title} side={side} />
        <SideToggle side={side} onChange={setSide} />
      </section>

      <section className="cd-panel">
        <FinishPicker value={finish} onChange={setFinish} />
      </section>

      <section className="cd-panel">
        <h2 className="cd-h2">Printed text</h2>
        <Field label="Name" value={name} onChange={setName} max={28} placeholder="Kevin Bhatta" />
        <Field label="Title" value={title} onChange={setTitle} max={36} placeholder="Founder, Tap For Visit" />
      </section>

      <footer className="cd-bar">
        <div className="cd-total">
          <small>{selected.name}</small>
          <strong>Rs {selected.price.toLocaleString("en-IN")}</strong>
        </div>
        <a className="cd-cta" href={waLink} target="_blank" rel="noopener noreferrer">
          Order on WhatsApp
        </a>
      </footer>
    </main>
  );
}