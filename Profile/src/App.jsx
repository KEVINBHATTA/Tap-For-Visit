import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Template2 from "./Pages/Template2.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* "/" renders the Home page by default */}

        <Route path="/" element={<Profile />} />

        {/* "/about" renders the About page */}

        <Route path="/ProfileEdits" element={<ProfileEdits />} />

        <Route
          path="/Template2"
          element={<Template2 />}
        />
        
      </Routes>
    </Router>
  );
}

export default App;
