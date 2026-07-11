import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile.jsx";
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Template2 from "./Pages/Template2.jsx";
import Home from "./Pages/Home.jsx";
import {useState} from "react";
import YourProfile from "./Pages/YourProfile.jsx";

function App() {
  const [globalProfileData, setGlobalProfileData] = useState(() => {
    const saved = localStorage.getItem("profileFormData");
    return saved ? JSON.parse(saved) : {};
  });

  const handleUpdateGlobalData = (updatedData) => {
    setGlobalProfileData(updatedData);
    console.log("⭐ App.jsx Central Store Updated:", updatedData);
  };
 


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Template1" element={<Profile />} />
        <Route path="/ProfileEdits" element={<ProfileEdits />} />
        <Route path="/Template2" element={<Template2 />} />
       <Route path="/:username" element={<YourProfile profileData={globalProfileData} />} />

       </Routes>
     </Router>
  );
}

export default App;
