import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaBriefcase } from "react-icons/fa";

function StatEdits({formData, handleOnChange }) {
  if (!formData?.showStat) return null;

  const statField = [
    {
      id: "Top",
      icon: <FaPeopleGroup size="2rem" />,
      color: "Green",
      lblName: "statLabel1",
      valName: "statValue1",
    },
    {
      id: "Middle",
      icon: <SlCalender size="2rem" />,
      color: "Red",
      lblName: "statLabel2",
      valName: "statValue2",
    },
    {
      id: "Bottom",
      icon: <FaBriefcase size="2rem" />,
      color: "Blue",
      lblName: "statLabel3",
      valName: "statValue3",
    },
  ];

  return (
    <div className="Stat-Edits">
      <div className="Stat-Detail">
        {statField.map((field) => {
          return (
          <div
            key={field.lblName}
            className="Stat-Section"
            id={`Stat-${field.id}`}
          >
            <div className={`Stat-Icon ${field.color}`}>{field.icon}</div>
            <div className="Stat-Label-Value">
              <div className="Stat-Label">
                <p>Label</p>
                <input
                  type="text"
                  className="label3 form-control"
                  id="form1"
                  name={field.lblName}
                  placeholder="LABEL"
                  value={formData?.[field.lblName] || ""}
                  onChange={(e) => handleOnChange(field.lblName, e.target.value)}
                />
              </div>

              <div className="Stat-Value">
                <p>Value</p>
                <input
                  type="text"
                  className="label3 form-control"
                  id="form1"
                  name={field.valName}
                  placeholder="VALUE"
                  value={formData?.[field.valName] || ""}
                  onChange={(e) => handleOnChange(field.valName, e.target.value)}
                />
              </div>
            </div>
          </div>
          

);
})}

        <p id="Pre-Text"> Preview</p>

        <div className="Preview-Container">
          <div className="Pre-Box col-4" id="box-1">
            <p className="Pre-Top-text">{formData?.statValue1 || "500+"}</p>
            <p className="Pre-Bottom-text">{formData?.statLabel1 || "CLIENTS"}</p>
          </div>

          <div className="Pre-Box col-4" id="box-2">
            <p className="Pre-Top-text">{formData?.statValue2 || "2026"}</p>
            <p className="Pre-Bottom-text">{formData?.statLabel2 || "FOUNDED"}</p>
          </div>

          <div className="Pre-Box col-4" id="box-3">
            <p className="Pre-Top-text">{formData?.statValue3 || "NP"}</p>
            <p className="Pre-Bottom-text">{formData?.statLabel3 || "BASED"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatEdits;
