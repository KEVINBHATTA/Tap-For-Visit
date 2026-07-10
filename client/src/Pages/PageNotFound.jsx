import React from 'react'

function PageNotFound({username}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: "72px", margin: "0", color: "#e11d48" }}>404</h1>
        <h2>Profile Not Found</h2>
        <p style={{ color: "#666" }}>The profile for "<strong>{username}</strong>" does not exist in our system.</p>
        <a href="/" style={{ marginTop: "15px", color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>← Go Back Home</a>
      </div>
  )
}

export default PageNotFound
