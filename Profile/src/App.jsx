import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Template2 from "./Pages/Template2.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/ProfileEdits" element={<ProfileEdits />} />
         <Route path="/Template2" element={<Template2 />} />
       </Routes>
     </Router>
  );
}

export default App;
