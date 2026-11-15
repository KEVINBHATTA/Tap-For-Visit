import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaBriefcase } from "react-icons/fa";
import Field from "./Field";
import { LIMITS } from "./profileConfig";

const STAT_FIELDS = [
  { n: 1, icon: FaPeopleGroup, tone: "green", labelHint: "CLIENTS", valueHint: "500+" },
  { n: 2, icon: SlCalender, tone: "rose", labelHint: "FOUNDED", valueHint: "2026" },
  { n: 3, icon: FaBriefcase, tone: "blue", labelHint: "BASED", valueHint: "NP" },
];

function StatEdits({ formData, handleOnChange }) {
  if (!formData?.showStat) return null;

  return (
    <div className="pe-stats">
      {STAT_FIELDS.map(({ n, icon: Icon, tone, labelHint, valueHint }) => (
        <div className="pe-stat-row" key={n}>
          <div className={`pe-tile tone-${tone}`}>
            <Icon aria-hidden="true" />
          </div>
          <div className="pe-stat-inputs">
            <Field
              name={`statLabel${n}`}
              label="Label"
              placeholder={labelHint}
              maxLength={LIMITS.statLabel}
              value={formData[`statLabel${n}`]}
              onChange={(v) => handleOnChange(`statLabel${n}`, v)}
            />
            <Field
              name={`statValue${n}`}
              label="Value"
              placeholder={valueHint}
              maxLength={LIMITS.statValue}
              value={formData[`statValue${n}`]}
              onChange={(v) => handleOnChange(`statValue${n}`, v)}
            />
          </div>
        </div>
      ))}

      <p className="pe-stats-title">Preview</p>
      <div className="pe-stat-strip">
        {STAT_FIELDS.map(({ n, labelHint, valueHint }) => (
          <div className="pe-stat-box" key={n}>
            <strong>{formData[`statValue${n}`] || valueHint}</strong>
            <span>{formData[`statLabel${n}`] || labelHint}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatEdits;