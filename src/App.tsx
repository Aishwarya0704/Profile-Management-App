import { ProfileProvider } from "./context/ProfileContext";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProfileForm from "./pages/ProfileForm";
import ProfileDisplay from "./pages/ProfileDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={"/profile-form"}></Navigate>}
          />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/profile" element={<ProfileDisplay />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </ProfileProvider>
  );
}

export default App;
