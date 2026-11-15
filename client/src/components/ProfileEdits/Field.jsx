import React from "react";

/** Labelled text input / textarea with error message and character counter. */
function Field({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  maxLength,
  ...rest
}) {
  const id = `field-${name}`;
  const Tag = multiline ? "textarea" : "input";
  const text = value ?? "";

  return (
    <div className={`pe-field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="pe-req"> *</span>}
      </label>

      <Tag
        id={id}
        name={name}
        className="pe-input"
        value={text}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...(Tag === "input" ? { type: "text" } : {})}
        {...rest}
      />

      {(error || maxLength) && (
        <div className="pe-field-foot">
          {error ? (
            <span id={`${id}-error`} className="pe-error" role="alert">
              {error}
            </span>
          ) : (
            <span />
          )}
          {maxLength && (
            <span className="pe-count">
              {text.length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Field;