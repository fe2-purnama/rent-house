import { Routes, Route } from "react-router-dom"

import NavbarComponent from "./components/NavbarComponent"

import LoginPage  from "./pages/LandingPage/LoginPage"
import RegisterPage  from "./pages/LandingPage/RegisterPage"

import HomePage from "./pages/LandingPage/HomePage"
import PropertyPage from "./pages/LandingPage/PropertyPage"
import TestimonialPage from "./pages/LandingPage/TestimonialPage"
// import OurTeamPage from "./pages/OurTeamPage"
import FaqPage from "./pages/LandingPage/FaqPage"

import FooterComponet from "./components/FooterComponent"
import DetailProperty from "./pages/LandingPage/DetailProperty"
import UserListPage from "./pages/LandingPage/UserlistPage"
import ProfilePage from "./pages/LandingPage/ProfilePage"
import InvoicePage from "./pages/LandingPage/InvoicePage"

function App() {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/register" Component={RegisterPage}/>
        <Route path="/userlist" Component={UserListPage}/>
        <Route path="/profile" Component={ProfilePage}/>
        <Route path="/" Component={HomePage}/>
        <Route path="/property" Component={PropertyPage}/>
        <Route path="/detail" Component={DetailProperty}/>
        <Route path="/testimonial" Component={TestimonialPage}/>
        <Route path="/faq" Component={FaqPage}/>
        <Route path="/buyers" Component={InvoicePage}/>
        {/* <Route path="/team" Component={OurTeamPage}/> */}
      </Routes>
      
      <FooterComponet />
    </div>
  )
}

export default App