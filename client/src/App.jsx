import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileEdits from "./Pages/ProfileEdits.jsx";
import Home from "./Pages/Home.jsx";
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

const Template1 = lazy(() => import("./Pages/Profile_Template_Lists/Template1.jsx"));
const Template2 = lazy(() => import("./Pages/Profile_Template_Lists/Template2.jsx"));



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
        <Route
          path="/Template1"
          element={
            <Suspense fallback={<p role="status">Loading profile...</p>}>
              <Template1 />
            </Suspense>
          }
        />
        <Route path="/ProfileEdits" element={<ProfileEdits />} />
        <Route
          path="/Template2"
          element={
            <Suspense fallback={<p role="status">Loading profile...</p>}>
              <Template2 />
            </Suspense>
          }
        />
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
