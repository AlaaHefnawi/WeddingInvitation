import { useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../src/firebase";
import "./InvitationForm.css";

const InvitationForm = ({ onCreated }) => {
  const [guestName, setGuestName] = useState("");
  const [additionalGuests, setAdditionalGuests] = useState(0);
  const [maxMen, setMaxMen] = useState(0);
  const [maxWomen, setMaxWomen] = useState(0);

  const [loading, setLoading] = useState(false);
  const [createdInvitation, setCreatedInvitation] = useState(null);
  const [error, setError] = useState("");

  const createGuestSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");
    setCreatedInvitation(null);

    if (!guestName.trim()) {
      setError("Please enter the guest name.");
      return;
    }

    const guestSlug = createGuestSlug(guestName);

    if (!guestSlug) {
      setError(
        "Please use a guest name with English letters or numbers."
      );
      return;
    }

    try {
      setLoading(true);

      const invitationRef = doc(
        db,
        "invitations",
        guestSlug
      );

      // Check whether this guest already has an invitation
      const existingInvitation = await getDoc(
        invitationRef
      );

      if (existingInvitation.exists()) {
        setError(
          "An invitation with this guest name already exists."
        );
        return;
      }

      const invitationData = {
        guestName: guestName.trim(),
        additionalGuests: Number(additionalGuests),
        maxMen: Number(maxMen),
        maxWomen: Number(maxWomen),
      };

      await setDoc(
        invitationRef,
        invitationData
      );

      const invitationLink =
        `${window.location.origin}/?rsvp=${encodeURIComponent(
          guestSlug
        )}`;

      setCreatedInvitation({
        id: guestSlug,
        guestName: invitationData.guestName,
        link: invitationLink,
      });

      setGuestName("");
      setAdditionalGuests(0);
      setMaxMen(0);
      setMaxWomen(0);

      if (onCreated) {
        onCreated();
      }

    } catch (error) {
      console.error(
        "Error creating invitation:",
        error
      );

      setError(
        "Something went wrong while creating the invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!createdInvitation) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        createdInvitation.link
      );
    } catch (error) {
      console.error(
        "Could not copy invitation link:",
        error
      );
    }
  };

  return (
    <div className="invitation-form">

      <div className="invitation-form-header">
        <p className="invitation-form-small">
          New Invitation
        </p>

        <h2>
          Create Invitation
        </h2>
      </div>

      <form onSubmit={handleCreate}>

        <div className="invitation-form-grid">

          <div className="invitation-field invitation-field-full">
            <label htmlFor="guestName">
              Guest Name
            </label>

            <input
              id="guestName"
              type="text"
              value={guestName}
              onChange={(e) =>
                setGuestName(e.target.value)
              }
              placeholder="e.g. Alaa Hefnawi"
            />
          </div>

          <div className="invitation-field">
            <label htmlFor="additionalGuests">
              Additional Guests
            </label>

            <input
              id="additionalGuests"
              type="number"
              min="0"
              value={additionalGuests}
              onChange={(e) =>
                setAdditionalGuests(e.target.value)
              }
            />
          </div>

          <div className="invitation-field">
            <label htmlFor="maxMen">
              Men Allowed
            </label>

            <input
              id="maxMen"
              type="number"
              min="0"
              value={maxMen}
              onChange={(e) =>
                setMaxMen(e.target.value)
              }
            />
          </div>

          <div className="invitation-field">
            <label htmlFor="maxWomen">
              Women Allowed
            </label>

            <input
              id="maxWomen"
              type="number"
              min="0"
              value={maxWomen}
              onChange={(e) =>
                setMaxWomen(e.target.value)
              }
            />
          </div>

        </div>

        {error && (
          <p className="invitation-form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="create-invitation-button"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Invitation"}
        </button>

      </form>

      {createdInvitation && (
        <div className="created-invitation">

          <p className="created-invitation-small">
            Invitation Created
          </p>

          <h3>
            {createdInvitation.guestName}
          </h3>

          <div className="created-link">

            <input
              type="text"
              value={createdInvitation.link}
              readOnly
            />

            <button
              type="button"
              onClick={copyLink}
            >
              Copy Link
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default InvitationForm;