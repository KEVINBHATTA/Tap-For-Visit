import { useEffect, useMemo, useRef, useState } from "react";
import "./ShippingAddresses.css";

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* ------------------------------------------------------------------ */
const MAX_ADDRESSES = 3;

const PROVINCES = [
  "Koshi Province",
  "Madhesh Province",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province",
  "Sudurpashchim Province",
];

const LABELS = ["Home", "Office", "Other"];

const EMPTY_FORM = {
  name: "",
  phone: "",
  label: "Home",
  province: "Bagmati Province",
  district: "",
  municipality: "",
  ward: "",
  landmark: "",
  note: "",
  isDefault: false,
};

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Demo data. Later load/save through your backend / MongoDB.          */
/* ------------------------------------------------------------------ */
const DEMO_ADDRESSES = [
  {
    _id: "a1",
    name: "Kevin Bhatta",
    phone: "9765637618",
    label: "Home",
    province: "Bagmati Province",
    district: "Chitwan",
    municipality: "Khairahani",
    ward: "6",
    landmark: "Near the main chowk",
    note: "",
    isDefault: true,
  },
  {
    _id: "a2",
    name: "Kevin Bhatta",
    phone: "9765637618",
    label: "Office",
    province: "Bagmati Province",
    district: "Chitwan",
    municipality: "Bharatpur",
    ward: "10",
    landmark: "Opposite the bus park",
    note: "Call before delivery.",
    isDefault: false,
  },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
const addressLine = (a) => `${a.municipality}-${a.ward}, ${a.district}, ${a.province}`;

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = "Enter the name for delivery.";
  if (!/^9[78]\d{8}$/.test(f.phone)) e.phone = "Enter a 10-digit mobile number, like 98XXXXXXXX.";
  if (!f.province) e.province = "Choose a province.";
  if (!f.district.trim()) e.district = "Enter the district.";
  if (!f.municipality.trim()) e.municipality = "Enter the municipality.";
  const ward = Number(f.ward);
  if (!f.ward || !Number.isInteger(ward) || ward < 1 || ward > 35) e.ward = "Enter a ward from 1 to 35.";
  return e;
}

const FIELD_ORDER = ["name", "phone", "province", "district", "municipality", "ward"];

function Icon({ d, className = "sa-ic" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const PIN = "M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12a2 2 0 100-4 2 2 0 000 4";
const PHONE = "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2";
const FLAG = "M5 21V4M5 4h11l-2 4 2 4H5";

/* ------------------------------------------------------------------ */
/* ADDRESS CARD                                                        */
/* ------------------------------------------------------------------ */
function AddressCard({ address, confirming, onEdit, onDefault, onAskDelete, onCancelDelete, onDelete }) {
  return (
    <article className={"sa-card" + (address.isDefault ? " is-default" : "")}>
      <header className="sa-card-head">
        <h3>{address.name}</h3>
        <span className="sa-tag">{address.label}</span>
        {address.isDefault && <span className="sa-default">Default</span>}
      </header>

      <div className="sa-lines">
        <p>
          <Icon d={PIN} />
          {addressLine(address)}
        </p>
        {address.landmark && (
          <p>
            <Icon d={FLAG} />
            Landmark: {address.landmark}
          </p>
        )}
        <p>
          <Icon d={PHONE} />
          {address.phone}
        </p>
        {address.note && <p className="sa-note-line">Note: {address.note}</p>}
      </div>

      {confirming ? (
        <footer className="sa-actions sa-confirm" role="alert">
          <span>Delete this address?</span>
          <button type="button" className="sa-danger" onClick={onDelete}>
            Yes, delete
          </button>
          <button type="button" className="sa-link" onClick={onCancelDelete}>
            Cancel
          </button>
        </footer>
      ) : (
        <footer className="sa-actions">
          <button type="button" className="sa-edit" onClick={onEdit}>
            Edit
          </button>
          {!address.isDefault && (
            <button type="button" className="sa-link" onClick={onDefault}>
              Set as default
            </button>
          )}
          <button type="button" className="sa-delete" onClick={onAskDelete}>
            Delete
          </button>
        </footer>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* ADD / EDIT FORM (dialog)                                            */
/* ------------------------------------------------------------------ */
function AddressForm({ initial, isEditing, lockDefault, onSave, onClose }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const refs = useRef({});

  // close on Escape, stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  function submit(e) {
    e.preventDefault();
    const found = validate(form);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      setErrors(found);
      refs.current[first]?.focus();
      return;
    }
    onSave({
      ...form,
      name: form.name.trim(),
      district: form.district.trim(),
      municipality: form.municipality.trim(),
      landmark: form.landmark.trim(),
      note: form.note.trim(),
      ward: String(Number(form.ward)),
    });
  }

  const field = (name, label, props = {}) => (
    <label className="sa-field">
      <span>{label}</span>
      <input
        ref={(el) => {
          refs.current[name] = el;
        }}
        type="text"
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        aria-invalid={errors[name] ? "true" : undefined}
        aria-describedby={errors[name] ? `sa-err-${name}` : undefined}
        {...props}
      />
      {errors[name] && (
        <small className="sa-err" id={`sa-err-${name}`} role="alert">
          {errors[name]}
        </small>
      )}
    </label>
  );

  return (
    <div className="sa-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="sa-dialog" role="dialog" aria-modal="true" aria-labelledby="sa-form-title" onSubmit={submit} noValidate>
        <header className="sa-dialog-head">
          <h2 id="sa-form-title">{isEditing ? "Edit address" : "Add new address"}</h2>
          <button type="button" className="sa-x" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="sa-grid">
          {field("name", "Full name", { autoFocus: true, maxLength: 40, autoComplete: "name", placeholder: "Anjali Sharma" })}
          {field("phone", "Mobile number", {
            inputMode: "tel",
            maxLength: 10,
            autoComplete: "tel",
            placeholder: "98XXXXXXXX",
            onChange: (e) => set("phone", e.target.value.replace(/\D/g, "")),
          })}

          <div className="sa-field sa-full">
            <span>Label</span>
            <div className="sa-seg" role="group" aria-label="Address label">
              {LABELS.map((l) => (
                <button key={l} type="button" aria-pressed={form.label === l} onClick={() => set("label", l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <label className="sa-field">
            <span>Province</span>
            <select
              ref={(el) => {
                refs.current.province = el;
              }}
              value={form.province}
              onChange={(e) => set("province", e.target.value)}
              aria-invalid={errors.province ? "true" : undefined}
            >
              {PROVINCES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            {errors.province && <small className="sa-err">{errors.province}</small>}
          </label>
          {field("district", "District", { maxLength: 40, placeholder: "Chitwan" })}
          {field("municipality", "Municipality", { maxLength: 50, placeholder: "Bharatpur" })}
          {field("ward", "Ward no.", {
            inputMode: "numeric",
            maxLength: 2,
            placeholder: "10",
            onChange: (e) => set("ward", e.target.value.replace(/\D/g, "")),
          })}

          <div className="sa-full">
            {field("landmark", "Landmark (optional)", { maxLength: 80, placeholder: "Near the main chowk" })}
          </div>

          <label className="sa-field sa-full">
            <span>Delivery note (optional)</span>
            <textarea
              rows={2}
              maxLength={120}
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="Call before delivery."
            />
            <small className="sa-count">{form.note.length}/120</small>
          </label>

          <label className={"sa-check sa-full" + (lockDefault ? " is-locked" : "")}>
            <input
              type="checkbox"
              checked={form.isDefault}
              disabled={lockDefault}
              onChange={(e) => set("isDefault", e.target.checked)}
            />
            <span>
              Make this my default address
              {lockDefault && <small>This is already your default address.</small>}
            </span>
          </label>
        </div>

        <p className="sa-fine">Past orders keep the address they were placed with. Saving here never changes them.</p>

        <footer className="sa-dialog-foot">
          <button type="button" className="sa-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="sa-primary">
            {isEditing ? "Save changes" : "Save address"}
          </button>
        </footer>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* Drop it anywhere: <ShippingAddresses />. It follows the surrounding */
/* page's white / dark theme and falls back to white on its own.       */
/* ------------------------------------------------------------------ */
export default function ShippingAddresses() {
  /* MongoDB later: load the signed-in user's addresses, e.g.
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("/api/addresses").then((r) => r.json()).then(setAddresses).catch(console.error);
  }, []);
  and call your API inside saveAddress / makeDefault / removeAddress below. */
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [dialog, setDialog] = useState(null); // null | { id: string | null }
  const [confirmId, setConfirmId] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(t);
  }, [notice]);

  const sorted = useMemo(() => [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault)), [addresses]);
  const full = addresses.length >= MAX_ADDRESSES;
  const editing = dialog?.id ? addresses.find((a) => a._id === dialog.id) : null;

  function saveAddress(data) {
    setAddresses((list) => {
      const first = list.length === 0 || (editing && list.length === 1);
      const makeDefault = data.isDefault || first;
      const cleared = makeDefault ? list.map((a) => ({ ...a, isDefault: false })) : list;
      if (editing) {
        return cleared.map((a) =>
          a._id === editing._id ? { ...a, ...data, isDefault: makeDefault || a.isDefault } : a
        );
      }
      return [...cleared, { ...data, _id: "a" + Date.now(), isDefault: makeDefault }];
    });
    setNotice(editing ? "Address updated." : "Address saved.");
    setDialog(null);
  }

  function makeDefault(id) {
    setAddresses((list) => list.map((a) => ({ ...a, isDefault: a._id === id })));
    setNotice("Default address changed.");
  }

  function removeAddress(id) {
    setAddresses((list) => {
      const rest = list.filter((a) => a._id !== id);
      // if the default was deleted, the first remaining address becomes the default
      if (rest.length && !rest.some((a) => a.isDefault)) rest[0] = { ...rest[0], isDefault: true };
      return rest;
    });
    setConfirmId(null);
    setNotice("Address deleted.");
  }

  const initialForm = editing
    ? { ...EMPTY_FORM, ...editing }
    : { ...EMPTY_FORM, isDefault: addresses.length === 0 };
  const lockDefault = editing ? editing.isDefault : addresses.length === 0;

  return (
    <section className="sa" aria-label="Shipping addresses">
      <div className="sa-top">
        <div>
          <p className="sa-count-line">
            {addresses.length} of {MAX_ADDRESSES} saved
          </p>
          <p className="sa-hint">Past orders keep the address they were placed with. Changing or deleting an address here never changes them.</p>
        </div>
        <button
          type="button"
          className="sa-primary sa-add"
          onClick={() => setDialog({ id: null })}
          disabled={full}
          title={full ? "You can save up to 3 addresses. Delete one to add another." : undefined}
        >
          + Add new address
        </button>
      </div>

      {full && <p className="sa-limit">You&rsquo;ve saved the maximum of {MAX_ADDRESSES} addresses. Delete one to add another.</p>}

      {sorted.length === 0 ? (
        <div className="sa-empty">
          <div className="sa-empty-ic" aria-hidden="true">
            <Icon d={PIN} className="sa-ic" />
          </div>
          <b>No saved addresses yet.</b>
          <span>Add one so checkout is faster next time.</span>
        </div>
      ) : (
        <div className="sa-list">
          {sorted.map((a) => (
            <AddressCard
              key={a._id}
              address={a}
              confirming={confirmId === a._id}
              onEdit={() => setDialog({ id: a._id })}
              onDefault={() => makeDefault(a._id)}
              onAskDelete={() => setConfirmId(a._id)}
              onCancelDelete={() => setConfirmId(null)}
              onDelete={() => removeAddress(a._id)}
            />
          ))}
        </div>
      )}

      <div className="sa-toast" role="status" aria-live="polite">
        {notice}
      </div>

      {dialog && (
        <AddressForm
          initial={initialForm}
          isEditing={!!editing}
          lockDefault={lockDefault}
          onSave={saveAddress}
          onClose={() => setDialog(null)}
        />
      )}
    </section>
  );
}
