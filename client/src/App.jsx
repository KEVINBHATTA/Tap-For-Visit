import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Template1 from './Pages/Template1.jsx';
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Template2 from "./Pages/Template2.jsx";
import Home from "./Pages/Home.jsx";
import {useState} from "react";
import YourProfile from "./Pages/YourProfile.jsx";
import AuthPage from "./Pages/AuthPage.jsx";
import HowItWorks from "./Pages/HowItsWork.jsx";
import AuthCallback from "./Pages/AuthCallback.jsx";
import CardDesignPage from "./Pages/CardDesignPage.jsx";
import ProfileDesignPage from "./Pages/ProfileDesignPage.jsx";
import CardOrder from "./Pages/CardOrder.jsx";
import ConfirmOrder from "./Pages/ConfirmOrder.jsx";
import OrderPlaced from "./Pages/OrderPlaced.jsx";
import Dashboard from "./Pages/Dashboard.jsx";



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
        <Route path="/signin" element={<AuthPage/>} />
        <Route path="/howitsworks" element={<HowItWorks/>}/>
        <Route path="/Template1" element={<Template1 />} />
        <Route path="/ProfileEdits" element={<ProfileEdits />} />
        <Route path="/Template2" element={<Template2 />} />
        <Route path="/:username" element={<YourProfile profileData={globalProfileData} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/CardDesign" element={<CardDesignPage/>} />
        <Route path="/ProfileDesign" element={<ProfileDesignPage/>} />
        <Route path="/CardDesign/:cardId" element={<CardOrder />} />
        <Route path="/CardDesign/:cardId/confirm" element={<ConfirmOrder />} />
        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/dashboard" element={<Dashboard/>} />
 
       </Routes>
     </Router>
  );
}

export default App;
