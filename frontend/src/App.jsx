import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import LoginPage from "./pages/LandingPage/LoginPage";
import RegisterPage from "./pages/LandingPage/RegisterPage";
import HomePage from "./pages/LandingPage/HomePage";
import PropertyPage from "./pages/LandingPage/PropertyPage";
import TestimonialPage from "./pages/LandingPage/TestimonialPage";
import FaqPage from "./pages/LandingPage/FaqPage";
import FooterComponent from "./components/FooterComponent";
import DetailProperty from "./pages/LandingPage/DetailProperty";
import UserListPage from "./pages/LandingPage/UserlistPage";
import ProfilePage from "./pages/LandingPage/ProfilePage";
import InvoicePage from "./pages/LandingPage/InvoicePage";
import AddPropertyPage from "./pages/LandingPage/AddPropertyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/detail" element={<DetailProperty />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/buyers" element={<InvoicePage />} />

        <Route element={<ProtectedRoute roles={["2", "4"]} />}>
          <Route path="/userlist" element={<UserListPage />} />
        </Route>
        <Route element={<ProtectedRoute roles={["3"]} />}>
          <Route path="/addproperty" element={<AddPropertyPage />} />
        </Route>
        <Route element={<ProtectedRoute roles={["4"]} />}>
          <Route path="/owners" element={<UserListPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </AuthProvider>
  );
}

export default App;
{
  /* <Route path="/team" Component={OurTeamPage}/> */
}
