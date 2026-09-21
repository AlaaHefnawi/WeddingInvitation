import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../src/firebase";
import "./AdminDashboard.css";
import InvitationForm from "./InvitationForm";

const AdminDashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    try {
      const invitationsSnapshot = await getDocs(
        collection(db, "invitations")
      );

      const rsvpsSnapshot = await getDocs(
        collection(db, "rsvps")
      );

      const invitationsData =
        invitationsSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

      const rsvpsData =
        rsvpsSnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

      setInvitations(invitationsData);
      setRsvps(rsvpsData);
    } catch (error) {
      console.error(
        "Error loading admin data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getRsvpForInvitation = (invitationId) => {
    return rsvps.find(
      (rsvp) =>
        rsvp.invitationId === invitationId
    );
  };

  const getComingTotal = (rsvp) => {
    if (!rsvp || rsvp.attendance !== "accept") {
      return 0;
    }

    return (
      Number(rsvp.men || 0) +
      Number(rsvp.women || 0)
    );
  };

  const acceptedRsvps = rsvps.filter(
    (rsvp) => rsvp.attendance === "accept"
  );

  const declinedRsvps = rsvps.filter(
    (rsvp) => rsvp.attendance === "decline"
  );

  const pendingCount =
    invitations.length - rsvps.length;

  const totalComing = acceptedRsvps.reduce(
    (total, rsvp) =>
      total + getComingTotal(rsvp),
    0
  );

  const totalMen = acceptedRsvps.reduce(
    (total, rsvp) =>
      total + Number(rsvp.men || 0),
    0
  );

  const totalWomen = acceptedRsvps.reduce(
    (total, rsvp) =>
      total + Number(rsvp.women || 0),
    0
  );

  const createGuestSlug = (guestName) => {
    return guestName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const copyInvitationLink = async (
    guestName
  ) => {
    const guestSlug =
      createGuestSlug(guestName);

    const link =
      `${window.location.origin}/?rsvp=${encodeURIComponent(
        guestSlug
      )}`;

    try {
      await navigator.clipboard.writeText(link);

      alert("Invitation link copied.");
    } catch (error) {
      console.error(
        "Could not copy link:",
        error
      );
    }
  };

  const openInvitation = (
    guestName
  ) => {
    const guestSlug =
      createGuestSlug(guestName);

    const link =
      `/?rsvp=${encodeURIComponent(
        guestSlug
      )}`;

    window.open(link, "_blank");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(
        "Error signing out:",
        error
      );
    }
  };

  return (
    <section className="admin-dashboard">

      <div className="admin-dashboard-container">

        {/* HEADER */}

        <div className="admin-dashboard-header">

          <div>

            <p className="admin-dashboard-small">
              Wedding Dashboard
            </p>

            <h1>
              Invitations & RSVPs
            </h1>

          </div>


          <div className="admin-dashboard-actions">

            <button
              className="refresh-button"
              onClick={loadData}
              disabled={loading}
            >
              {loading
                ? "Refreshing..."
                : "Refresh"}
            </button>


            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Sign Out
            </button>

          </div>

        </div>


        {/* CREATE INVITATION */}

        <InvitationForm
          onCreated={loadData}
        />


        {/* SUMMARY */}

        <div className="admin-summary">

          <div className="summary-card">

            <span>
              Attending
            </span>

            <strong>
              {totalComing}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Men
            </span>

            <strong>
              {totalMen}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Women
            </span>

            <strong>
              {totalWomen}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Accepted
            </span>

            <strong>
              {acceptedRsvps.length}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Declined
            </span>

            <strong>
              {declinedRsvps.length}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Pending
            </span>

            <strong>
              {Math.max(
                0,
                pendingCount
              )}
            </strong>

          </div>

        </div>


        {/* TABLE */}

        <div className="admin-table-wrapper">

          {loading ? (

            <div className="admin-loading">
              Loading invitations...
            </div>

          ) : invitations.length === 0 ? (

            <div className="admin-empty">
              No invitations found.
            </div>

          ) : (

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Guest
                  </th>

                  <th>
                    Coming
                  </th>

                  <th>
                    Men
                  </th>

                  <th>
                    Women
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Invitation
                  </th>

                </tr>

              </thead>


              <tbody>

                {invitations.map(
                  (invitation) => {

                    const rsvp =
                      getRsvpForInvitation(
                        invitation.id
                      );

                    const coming =
                      getComingTotal(rsvp);

                    const men =
                      rsvp &&
                      rsvp.attendance ===
                        "accept"
                        ? Number(
                            rsvp.men || 0
                          )
                        : 0;

                    const women =
                      rsvp &&
                      rsvp.attendance ===
                        "accept"
                        ? Number(
                            rsvp.women || 0
                          )
                        : 0;

                    let status =
                      "Pending";

                    if (
                      rsvp?.attendance ===
                      "accept"
                    ) {
                      status = "Accepted";
                    }

                    if (
                      rsvp?.attendance ===
                      "decline"
                    ) {
                      status = "Declined";
                    }

                    return (

                      <tr
                        key={invitation.id}
                      >

                        <td>
                          {invitation.guestName}
                        </td>


                        <td>
                          {rsvp
                            ? coming
                            : "-"}
                        </td>


                        <td>
                          {rsvp
                            ? men
                            : "-"}
                        </td>


                        <td>
                          {rsvp
                            ? women
                            : "-"}
                        </td>


                        <td>

                          <span
                            className={`status status-${status.toLowerCase()}`}
                          >
                            {status}
                          </span>

                        </td>


                        <td>

                          <div className="invitation-actions">

                            <button
                              className="copy-link-button"
                              onClick={() =>
                                copyInvitationLink(
                                  invitation.guestName
                                )
                              }
                            >
                              Copy Link
                            </button>


                            <button
                              className="open-link-button"
                              onClick={() =>
                                openInvitation(
                                  invitation.guestName
                                )
                              }
                            >
                              Open
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </section>
  );
};

export default AdminDashboard;