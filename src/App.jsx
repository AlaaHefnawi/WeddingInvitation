
import { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import InvitationIntro from '../components/InvitationIntro/InvitationIntro';
import NavBar from '../components/NavBar/NavBar';
import './App.css'
import InvitationMessage from '../components/InvitationMessage/InvitationMessage';
import QuranVerse from '../components/QuranVerse/QuranVerse';
import WeddingDate from '../components/WeddingDate/WeddingDate';
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';
import GuestArrangements from '../components/GuestArrangements/GuestArrangements';
import Footer from '../components/Footer/Footer';
import RSVP from '../components/RSVP/RSVP';
import AdminLogin from '../components/Admin/AdminLogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AdminDashboard from '../components/Admin/AdminDashboard';


const params = new URLSearchParams(window.location.search);

const invitationId = params.get("rsvp");

const navItems = [
  { content: "Home", url: "#hero" },
  { content: "Details", url: "#details" },
  { content: "Notes", url: "#notes" },
  // { content: "RSVP", url: "#rsvp" },
   {
    content: "RSVP",
    url: invitationId
      ? `?rsvp=${invitationId}#rsvp`
      : "#rsvp",
  },
];

function App() {

   const [adminUser, setAdminUser] = useState(undefined);

  useEffect(() => {
    if (window.location.pathname !== "/admin") {
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAdminUser(user);
      }
    );

    return () => unsubscribe();
  }, []);

  if (window.location.pathname === "/admin") {
    if (adminUser === undefined) {
      return (
        <section className="admin-login">
          <div className="admin-login-container">
            Loading...
          </div>
        </section>
      );
    }

    if (!adminUser) {
      return (
        <AdminLogin
          onLogin={(user) => setAdminUser(user)}
        />
      );
    }

    return <AdminDashboard />;
  }

    const [showNavbar, setShowNavbar] = useState(false);

  return (
    <>
      <InvitationIntro
        onFinish={() => setShowNavbar(true)}
      />

      {showNavbar && (
        <NavBar
          items={navItems}
        />
      )}
    <Hero/>
    <QuranVerse />
    <InvitationMessage />
    <WeddingDate/>
    <WeddingDetails/>
    <GuestArrangements />
    <RSVP/>
    <Footer/>
    </>
  )
}

export default App
