import React from "react";
import { FiSave } from "react-icons/fi";

/** Sticky bottom bar: the single place to save or discard changes. */
function SaveChange({ onSave, onDiscard, isDirty, saving }) {
  return (
    <div className="pe-savebar">
      <div className="pe-savebar-inner">
        <span className="pe-savebar-msg">
          {isDirty ? "You have unsaved changes" : "No changes to save"}
        </span>

        <div className="pe-savebar-actions">
          {isDirty && !saving && (
            <button type="button" className="pe-btn pe-btn-ghost" onClick={onDiscard}>
              Discard
            </button>
          )}

          <button
            type="button"
            className="pe-btn pe-btn-primary"
            onClick={onSave}
            disabled={!isDirty || saving}
          >
            {saving ? (
              <>
                <span className="pe-spinner" aria-hidden="true" /> Saving…
              </>
            ) : (
              <>
                <FiSave aria-hidden="true" /> Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveChange;