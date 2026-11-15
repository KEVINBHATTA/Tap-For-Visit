import { useMemo, useState } from "react";
import "./Insights.css";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Demo data. Later load it from your backend / MongoDB.               */
/* `daily` = visits per day, oldest first.                             */
/* ------------------------------------------------------------------ */
const DEMO_INSIGHTS = {
  7: {
    daily: [47, 38, 33, 41, 55, 60, 44],
    nfc: 168,
    qr: 52,
    saved: 24,
    links: [["Instagram", 58], ["Website", 41], ["LinkedIn", 33]],
  },
  30: {
    daily: [22, 30, 35, 28, 40, 52, 47, 38, 33, 41, 55, 60, 44, 36, 31, 45, 58, 62, 49, 39, 34, 42, 57, 66, 53, 41, 37, 46, 52, 11],
    nfc: 702,
    qr: 231,
    saved: 97,
    links: [["Instagram", 211], ["Website", 158], ["LinkedIn", 117]],
  },
};

const RANGES = [7, 30];

const sum = (a) => a.reduce((x, y) => x + y, 0);
const fmt = (n) => n.toLocaleString("en-IN");

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* Drop it anywhere: <Insights />. It uses the surrounding page's      */
/* colour variables (--ink, --panel, ...) and falls back to white.     */
/* ------------------------------------------------------------------ */
export default function Insights() {
  const [range, setRange] = useState(7);

  /* MongoDB later: replace DEMO_INSIGHTS[range] with data fetched for the range, e.g.
  useEffect(() => {
    fetch(`/api/insights?range=${range}`).then((r) => r.json()).then(setData).catch(console.error);
  }, [range]);
  */
  const data = DEMO_INSIGHTS[range];

  const labels = useMemo(() => {
    const day = (offset) => {
      const d = new Date();
      d.setDate(d.getDate() - offset);
      return d;
    };
    if (range === 7) {
      return Array.from({ length: 7 }, (_, i) => day(6 - i).toLocaleDateString("en-US", { weekday: "short" }));
    }
    const md = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return [md(day(29)), md(day(14)), md(day(0))];
  }, [range]);

  const total = sum(data.daily);
  const max = Math.max(...data.daily);
  const channels = data.nfc + data.qr;
  const rangeText = `last ${range} days`;

  return (
    <section className="ins" id="insights" aria-label="Insights">
      <div className="ins-head">
        <h2>Insights</h2>
        <div className="ins-seg" role="group" aria-label="Range">
          {RANGES.map((r) => (
            <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)}>
              {r} days
            </button>
          ))}
        </div>
      </div>

      <div className="ins-grid">
        <div className="ins-card ins-stat">
          <small>Total views</small>
          <strong>{fmt(total)}</strong>
          <p>Last {range} days</p>
        </div>

        <div className="ins-card ins-stat">
          <small>Saved contacts</small>
          <strong>{fmt(data.saved)}</strong>
          <p>vCard downloads</p>
        </div>

        <div className="ins-card ins-stat ins-wide">
          <small>NFC taps vs QR scans</small>
          <div className="ins-split" aria-hidden="true">
            <i style={{ width: channels ? (data.nfc / channels) * 100 + "%" : 0, background: "var(--ins-c1)" }} />
            <i style={{ width: channels ? (data.qr / channels) * 100 + "%" : 0, background: "var(--ins-c2)" }} />
          </div>
          <div className="ins-legend">
            <span>
              <em style={{ background: "var(--ins-c1)" }} />
              NFC taps <b>{fmt(data.nfc)}</b>
            </span>
            <span>
              <em style={{ background: "var(--ins-c2)" }} />
              QR scans <b>{fmt(data.qr)}</b>
            </span>
          </div>
        </div>

        <div className="ins-card ins-chartcard">
          <small className="ins-label">Visits, {rangeText}</small>
          {total === 0 ? (
            <div className="ins-empty">
              <b>No visits yet.</b>
              <span>Tap your card or share your QR.</span>
            </div>
          ) : (
            <>
              <div
                className={"ins-chart" + (range === 7 ? " ins-chart-7" : "")}
                role="img"
                aria-label="Bar chart of daily visits"
              >
                {data.daily.map((v, i) => (
                  <i key={i} style={{ height: Math.max(3, (v / max) * 100) + "%" }} title={`${v} visits`} />
                ))}
              </div>
              <div className="ins-axis">
                {labels.map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="ins-card ins-stat ins-links">
          <small>Top links by clicks</small>
          <ul>
            {total === 0 || data.links.length === 0 ? (
              <li className="ins-none">No link clicks yet.</li>
            ) : (
              data.links.map(([name, clicks], i) => (
                <li key={name}>
                  <i>{i + 1}</i>
                  <span>{name}</span>
                  <b>{fmt(clicks)}</b>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
