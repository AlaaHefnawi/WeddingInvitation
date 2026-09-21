import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import "./InvitationMessage.css";

const InvitationMessage = () => {
  const sectionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [invitation, setInvitation] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const invitationId = params.get("rsvp");

  useEffect(() => {
    const loadInvitation = async () => {
      if (!invitationId) {
        return;
      }

      try {
        const invitationRef = doc(
          db,
          "invitations",
          invitationId
        );

        const invitationSnapshot = await getDoc(
          invitationRef
        );

        if (invitationSnapshot.exists()) {
          setInvitation(invitationSnapshot.data());
        } else {
          console.error("Invitation not found");
        }
      } catch (error) {
        console.error(
          "Error loading invitation:",
          error
        );
      }
    };

    loadInvitation();
  }, [invitationId]);

  useEffect(() => {
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const guestName =
    invitation?.guestName || "Guest Name";

  const additionalGuests =
    invitation?.additionalGuests || 0;

  const invitationDisplayName =
    additionalGuests > 0
      ? `${guestName} and family`
      : guestName;

  return (
    <section
      ref={sectionRef}
      id="invitation-message"
      className={`invitation-message ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="invitation-message-content">

        <div className="invitation-message-image">
          <img
            src="/images/hands.jpg"
            alt="Moaz and Rafah"
          />
        </div>

        <p className="invitation-message-small">
          Together with our families we
        </p>

        <h2 className="invitation-message-title">
          Moaz & Rafah
        </h2>

        <p className="invitation-message-intro">
          have the honor of inviting
        </p>

        <h3 className="guest-name">
  <span className="guest-name-main">
    {guestName}
  </span>

  {additionalGuests > 0 && (
    <span className="guest-name-family">
      and family
    </span>
  )}
</h3>

        <p className="invitation-message-ending">
          to celebrate our special day with us
        </p>

      </div>
    </section>
  );
};

export default InvitationMessage;