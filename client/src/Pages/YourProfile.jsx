import { lazy, Suspense, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import api from "../utils/api";
import { loadProfile } from "../components/ProfileEdits/ProfileConfig";

const Profile = lazy(() => import("./Profile_Template_Lists/Template1"));
const Template = lazy(() => import("./Profile_Template_Lists/Template2"));

function normalizeProfileData(profile) {
  const stats = profile.stats ?? [];
  return {
    ...profile,
    ...(profile.socials ?? {}),
    statLabel1: profile.statLabel1 ?? stats[0]?.label ?? "",
    statValue1: profile.statValue1 ?? stats[0]?.value ?? "",
    statLabel2: profile.statLabel2 ?? stats[1]?.label ?? "",
    statValue2: profile.statValue2 ?? stats[1]?.value ?? "",
    statLabel3: profile.statLabel3 ?? stats[2]?.label ?? "",
    statValue3: profile.statValue3 ?? stats[2]?.value ?? "",
  };
}

function YourProfile({ profileData }) {
  const { username } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    // 1. Use the profile just saved by the editor before any cached copy.
    const navigatedProfile = location.state;
    if (
      navigatedProfile &&
      (navigatedProfile.userName?.toLowerCase() === username?.toLowerCase() ||
        navigatedProfile.username?.toLowerCase() === username?.toLowerCase())
    ) {
      setData(navigatedProfile);
      setLoading(false);
      return;
    }

    // 2. MATCH PASSING PROPS FIRST (Active Session Creator)
    if (profileData && Object.keys(profileData).length > 0 && 
       (profileData.userName?.toLowerCase() === username?.toLowerCase() || profileData.username?.toLowerCase() === username?.toLowerCase())) {
      setData(profileData);
      setLoading(false);
      return;
    }

    // 3. MATCH LOCAL STORAGE SECOND (Fresh Signup/Refresh Fallback)
    const localFormData = loadProfile().saved;
    if (localFormData && 
       (localFormData.userName?.toLowerCase() === username?.toLowerCase() || localFormData.username?.toLowerCase() === username?.toLowerCase())) {
      setData(localFormData);
      setLoading(false);
      return;
    }

    // 4. NO LOCAL MATCH? THEN GO QUERY THE PUBLIC INTERNET/DATABASE
    const fetchProfile = async () => {
      try {
        const { data: result } = await api.get(`/profile/${encodeURIComponent(username)}`);

        if (result.success && result.data) {
          setData(normalizeProfileData(result.data));
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching live profile from backend:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, profileData, location.state]);

  // Loading State Screen
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h3>Loading beautiful profile...</h3>
      </div>
    );
  }

  // 404 Trigger State
  if (notFound) {
    return <PageNotFound username={username} />;
  }

  // Normal Layout Rendering
  const finalData = data || {};
  const chosenTemplate = finalData.template || finalData.selectedTemplate;
  const SelectedTemplate = chosenTemplate === "template2" ? Template : Profile;

  return (
    <Suspense fallback={<p role="status">Loading profile...</p>}>
      <SelectedTemplate profileData={finalData} urlUsername={username} />
    </Suspense>
  );
}

export default YourProfile;