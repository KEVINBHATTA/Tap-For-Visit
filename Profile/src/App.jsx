import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Template2 from "./Pages/Template2.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Template1" element={<Profile />} />
        <Route path="/ProfileEdits" element={<ProfileEdits />} />
         <Route path="/Template2" element={<Template2 />} />
       </Routes>
     </Router>
  );
}

export default App;
