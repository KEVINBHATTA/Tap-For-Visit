import { useMemo, useState } from "react"; // add useEffect here when you enable the fetch below
import "./ProfileDesignPage.css";
// Adjust these paths to where your components live
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* Shape matches what you'll likely store in MongoDB. Later, replace   */
/* DEMO_GROUPS with the result of your API call (see useEffect below). */
/* Put the profile picture in /public and match the name below.        */
/* ------------------------------------------------------------------ */
const SAMPLE_IMAGE = "/profile.jpg";

const DEMO_GROUPS = [
  {
    _id: "professionals",
    title: "For professionals",
    templates: [
      {
        _id: "t1",
        name: "Clinic Dark",
        badge: "Popular",
        tags: ["Doctor"],
        image: SAMPLE_IMAGE,
      },
      {
        _id: "t2",
        name: "Clean White",
        tags: ["Doctor", "Minimal"],
        image: SAMPLE_IMAGE,
      },
      {
        _id: "t3",
        name: "Indigo Night",
        tags: ["Business"],
        image: SAMPLE_IMAGE,
      },
      {
        _id: "t7",
        name: "Slate",
        tags: ["Student", "Minimal"],
        image: SAMPLE_IMAGE,
      },
    ],
  },
  {
    _id: "business",
    title: "For business and shops",
    templates: [
      { _id: "t4", name: "Forest", tags: ["Business"], image: SAMPLE_IMAGE },
      {
        _id: "t5",
        name: "Sand",
        badge: "New",
        tags: ["Business", "Minimal"],
        image: SAMPLE_IMAGE,
      },
      { _id: "t6", name: "Rose", tags: ["Creator"], image: SAMPLE_IMAGE },
      { _id: "t8", name: "Sunset", tags: ["Creator"], image: SAMPLE_IMAGE },
    ],
  },
];

const FILTERS = ["All", "Doctor", "Business", "Creator", "Student", "Minimal"];

/* ------------------------------------------------------------------ */
/* SMALL COMPONENTS                                                    */
/* ------------------------------------------------------------------ */
function TemplateTile({ template }) {
  return (
    <a className="tile" href={`#template-${template._id}`}>
      <div className="ph">
        <img
          src={template.image}
          alt={`${template.name} profile template`}
          loading="lazy"
        />
        <span className="ph-preview">Preview</span>
      </div>
      <div className="nm">
        {template.name}
        {template.badge && <i>{template.badge}</i>}
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
export default function ProfileDesignPage() {
  const [groups, setGroups] = useState(DEMO_GROUPS);
  const [filter, setFilter] = useState("All");

  /* MongoDB later: call your backend (never connect to Mongo from the browser).
  useEffect(() => {
    fetch("/api/profile-templates")
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
          templates:
            filter === "All"
              ? g.templates
              : g.templates.filter((t) => t.tags?.includes(filter)),
        }))
        .filter((g) => g.templates.length > 0),
    [groups, filter],
  );

  return (
    <>
      {" "}
      <Navbar />
      <div className="pt">
        <div className="wrap">
          <h1>Profile templates.</h1>

          <div className="chips" role="group" aria-label="Filter templates">
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
            <section className="group" key={g._id}>
              <div className="ghead">
                <h3>{g.title}</h3>
              </div>
              <div className="grid">
                {g.templates.map((t) => (
                  <TemplateTile template={t} key={t._id} />
                ))}
                <MoreTile />
              </div>
            </section>
          ))}

          <section className="help">
            <h2>Make it yours.</h2>
            <div className="hgrid">
              <a className="opt" href="#">
                <b>Customize Your Profile By Yourself</b>
                <span>
                  Add your photo, links, and colors to any template above.
                </span>
                <em>Start customizing</em>
              </a>
              <a className="opt" href="#">
                <b>Get help from our team</b>
                <span>
                  Tell us what you want on WhatsApp and we&rsquo;ll set it up
                  with you, at free cost.
                </span>
                <em>Message us</em>
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
