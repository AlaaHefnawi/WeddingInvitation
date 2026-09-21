import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../src/firebase";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onLogin(user);
      }
    });

    return () => unsubscribe();
  }, [onLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      onLogin(userCredential.user);
    } catch (error) {
      console.error(error);

      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login">
      <div className="admin-login-container">

        <div className="admin-login-logo">
          <img
            src="/images/logo.png"
            alt="Moaz and Rafah"
          />
        </div>

        <p className="admin-login-small">
          Wedding Dashboard
        </p>

        <h1>
          Welcome
        </h1>

        <p className="admin-login-message">
          Sign in to manage invitations and RSVPs.
        </p>

        <form onSubmit={handleLogin}>

          <div className="admin-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default AdminLogin;