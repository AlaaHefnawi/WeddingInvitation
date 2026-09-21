import { useEffect, useRef, useState } from "react";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../src/firebase";
import "./RSVP.css";

const MAX_GUESTS = 50;

const RSVP = () => {
  const sectionRef = useRef(null);
  const successRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [invitation, setInvitation] = useState(null);
  const [loadingInvitation, setLoadingInvitation] = useState(true);

  const [rsvpData, setRsvpData] = useState({
    attendance: "",
    men: 0,
    women: 0,
  });

  const params = new URLSearchParams(window.location.search);
  const invitationId = params.get("rsvp");

  useEffect(() => {
    const loadInvitation = async () => {
      if (!invitationId) {
        setLoadingInvitation(false);
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
      } finally {
        setLoadingInvitation(false);
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
        threshold: 0.25,
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll to the confirmation message after submission
  useEffect(() => {
    if (!submitted) {
      return;
    }

    const timer = setTimeout(() => {
      successRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [submitted]);

  const guestName =
    invitation?.guestName || "Guest Name";

  const additionalGuests =
    invitation?.additionalGuests || 0;

  const maxMen =
    invitation?.maxMen || 0;

  const maxWomen =
    invitation?.maxWomen || 0;

  const totalAttending =
    rsvpData.men + rsvpData.women;

  const canAddGuest =
    totalAttending < MAX_GUESTS;

  const submitRSVP = async () => {
    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    if (!rsvpData.attendance) {
      alert("Please select your attendance.");
      return;
    }

    if (
      rsvpData.attendance === "accept" &&
      totalAttending === 0
    ) {
      alert(
        "Please include the invited guest in the total."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = {
        invitationId: invitationId,
        guestName: guestName,
        attendance: rsvpData.attendance,
        men: rsvpData.men,
        women: rsvpData.women,
        totalAttending:
          rsvpData.attendance === "accept"
            ? totalAttending
            : 0,
        submittedAt: serverTimestamp(),
      };

      await setDoc(
        doc(db, "rsvps", invitationId),
        response
      );

      console.log("RSVP saved successfully");

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Error submitting RSVP:",
        error
      );

      setIsSubmitting(false);

      alert(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className={`rsvp ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="rsvp-container">

        {!submitted ? (
          <>
            {/* LOGO */}

            <div className="rsvp-logo">
              <img
                src="/images/logo.png"
                alt="Moaz and Rafah"
              />
            </div>


            {/* HEADER */}

            <p className="rsvp-small">
              You're invited
            </p>

            <h2 className="rsvp-title">
              RSVP
            </h2>

            <p className="rsvp-message">
              Please let us know if you will be joining
              us before November 10, 2026
            </p>


            {/* INVITATION */}

            <div className="guest-card">

              <p className="guest-label">
                Invitation for
              </p>

              {loadingInvitation ? (

                <>
                  <h3>
                    Loading...
                  </h3>

                  <p className="guest-number">
                    Please wait
                  </p>
                </>

              ) : invitation ? (

                <h3 className="guest-name">
                  <span className="guest-name-main1">
                    {guestName}
                  </span>

                  {additionalGuests > 0 && (
                    <span className="guest-name-family">
                      and Family
                    </span>
                  )}
                </h3>

              ) : (

                <>
                  <h3>
                    Invitation Not Found
                  </h3>

                  <p className="guest-number">
                    Please check your invitation link.
                  </p>
                </>

              )}

            </div>


            {/* RSVP FORM */}

            {invitation && (
              <>

                {/* ATTENDANCE */}

                <div className="rsvp-question">

                  <p>
                    Will you be attending?
                  </p>

                  <div className="attendance-buttons">

                    <button
                      type="button"
                      className={
                        rsvpData.attendance === "accept"
                          ? "active"
                          : ""
                      }
                      disabled={isSubmitting}
                      onClick={() =>
                        setRsvpData({
                          ...rsvpData,
                          attendance: "accept",
                        })
                      }
                    >
                      Joyfully Accept
                    </button>

                    <button
                      type="button"
                      className={
                        rsvpData.attendance === "decline"
                          ? "active"
                          : ""
                      }
                      disabled={isSubmitting}
                      onClick={() =>
                        setRsvpData({
                          ...rsvpData,
                          attendance: "decline",
                          men: 0,
                          women: 0,
                        })
                      }
                    >
                      Regretfully Decline
                    </button>

                  </div>

                </div>


                {/* GUEST COUNTERS */}

                {rsvpData.attendance === "accept" && (
                  <div className="guest-counter">

                    <p className="guest-counter-title">
                      Guests attending
                    </p>


                    {/* MEN */}

                    {maxMen > 0 && (
                      <div className="counter-row">

                        <div className="counter-label">
                          <span>
                            Men
                          </span>
                        </div>


                        <div className="counter">

                          <button
                            type="button"
                            className="counter-button"
                            disabled={isSubmitting}
                            onClick={() =>
                              setRsvpData({
                                ...rsvpData,
                                men: Math.max(
                                  0,
                                  rsvpData.men - 1
                                ),
                              })
                            }
                          >
                            −
                          </button>


                          <span className="counter-number">
                            {rsvpData.men}
                          </span>


                          <button
                            type="button"
                            className="counter-button"
                            disabled={
                              isSubmitting ||
                              !canAddGuest
                            }
                            onClick={() =>
                              setRsvpData({
                                ...rsvpData,
                                men:
                                  rsvpData.men + 1,
                              })
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>
                    )}


                    {/* WOMEN */}

                    {maxWomen > 0 && (
                      <div className="counter-row">

                        <div className="counter-label">
                          <span>
                            Women
                          </span>
                        </div>


                        <div className="counter">

                          <button
                            type="button"
                            className="counter-button"
                            disabled={isSubmitting}
                            onClick={() =>
                              setRsvpData({
                                ...rsvpData,
                                women: Math.max(
                                  0,
                                  rsvpData.women - 1
                                ),
                              })
                            }
                          >
                            −
                          </button>


                          <span className="counter-number">
                            {rsvpData.women}
                          </span>


                          <button
                            type="button"
                            className="counter-button"
                            disabled={
                              isSubmitting ||
                              !canAddGuest
                            }
                            onClick={() =>
                              setRsvpData({
                                ...rsvpData,
                                women:
                                  rsvpData.women + 1,
                              })
                            }
                          >
                            +
                          </button>

                        </div>

                      </div>
                    )}


                    <p className="guest-counter-total">
                      {totalAttending}{" "}
                      {totalAttending === 1
                        ? "person"
                        : "people"}{" "}
                      attending
                    </p>

                  </div>
                )}


                {/* SUBMIT */}

                <button
                  type="button"
                  className={`submit-rsvp ${
                    isSubmitting
                      ? "submitting"
                      : ""
                  }`}
                  onClick={submitRSVP}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="submit-loading">
                      <span>Recording</span>

                      <span className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </span>
                  ) : (
                    "Submit RSVP"
                  )}
                </button>

              </>
            )}

          </>
        ) : (

          /* SUCCESS */

          <div
            ref={successRef}
            className="rsvp-success"
          >

            <div className="success-logo">
              <img
                src="/images/logo.png"
                alt="Moaz and Rafah"
              />
            </div>

            <p className="success-small">
              RSVP Confirmed
            </p>

            <h2>
              Thank you
            </h2>

            <p>
              Your attendance has been recorded.
            </p>

          </div>

        )}

      </div>
    </section>
  );
};

export default RSVP;