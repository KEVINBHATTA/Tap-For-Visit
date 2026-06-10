import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile.jsx';
import ProfileEdits from './Pages/ProfileEdits.jsx';

function App() {
  return (
    <Router>

      <Routes>

        {/* "/" renders the Home page by default */}

        <Route path="/" element={<Profile />} />

        {/* "/about" renders the About page */}

        <Route path="/ProfileEdits" element={<ProfileEdits />} />

      </Routes>
    </Router>
  );
}

export default App;