import React from 'react';
import { FaCrown } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

function Post({formData}) {
  return (
    <>
      <div className="rounded-pill badge">
        <FaCrown className="badge-icon"/>
       {formData?.job || 'CEO & FOUNDER'}
      </div>
    </>
  );
}

export default Post;