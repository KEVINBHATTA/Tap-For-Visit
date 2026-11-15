import React from "react";
import Field from "./Field";
import { LIMITS } from "./ProfileConfig";

function FeatureEdits({ formData, handleOnChange, errors = {} }) {
  const bind = (name) => ({
    name,
    value: formData[name],
    error: errors[name],
    onChange: (value) => handleOnChange(name, value),
  });

  return (
    <>
      <section className="pe-card">
        <header className="pe-card-head">
          <h2 className="pe-card-title">Basic info</h2>
          <p className="pe-card-sub">The essentials people see first.</p>
        </header>

        <div className="pe-grid">
          <div className="pe-span-2">
            <Field label="Full name" required placeholder="Your full name" autoComplete="name" {...bind("fullName")} />
          </div>
          <Field label="Job title" placeholder="e.g. Product Designer" {...bind("job")} />
          <Field label="Company" placeholder="e.g. Acme Inc." {...bind("company")} />
          <div className="pe-span-2">
            <Field label="Location" placeholder="City, Country" {...bind("location")} />
          </div>
        </div>
      </section>

      <section className="pe-card">
        <header className="pe-card-head">
          <h2 className="pe-card-title">About</h2>
          <p className="pe-card-sub">A short intro and a line that sums you up.</p>
        </header>

        <div className="pe-grid">
          <div className="pe-span-2">
            <Field
              label="Bio"
              multiline
              rows={4}
              maxLength={LIMITS.bio}
              placeholder="Tell people what you do…"
              {...bind("bio")}
            />
          </div>
          <div className="pe-span-2">
            <Field
              label="Signature quote"
              maxLength={LIMITS.quote}
              placeholder="A line you live by"
              {...bind("quote")}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default FeatureEdits;