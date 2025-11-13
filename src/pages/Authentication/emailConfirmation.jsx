import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function EmailConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Email passed from Sign-Up page via navigate("/email-confirmation", { state: { email }})
  const passedEmail = location.state?.email;

  const [email, setEmail] = useState(passedEmail || "");

  // If user refreshed or no state was passed, fallback gracefully
  useEffect(() => {
    if (!passedEmail) {
      const saved = localStorage.getItem("pendingSignUpEmail");
      if (saved) setEmail(saved);
    }
  }, [passedEmail]);

  // If still no email, redirect to sign-in
  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
    }
  }, [email, navigate]);

  if (!email) return null;

  return (
    <div className={styles.container} style={{ paddingTop: "11rem" }}>
      <div className={styles.box}>

        <div className={styles.boxLabel} style={{ fontSize: "2rem" }}>
          Check Your Email
        </div>

        <p
          style={{
            opacity: "70%",
            fontSize: "0.95rem",
            marginTop: "0.5rem",
            marginBottom: "1.5rem",
            lineHeight: "1.5"
          }}
        >
          We’ve sent a confirmation link to:
          <br />
          <strong style={{ color: "white" }}>{email}</strong>
          <br />
          <br />
          Please open the email and click the link to activate your Leep Audio account.
        </p>

        <Link
          to="/sign-in"
          className={styles.button}
          style={{ marginTop: "1rem", textAlign: "center", textDecoration: "none" }}
        >
          Return to Log In
        </Link>
      </div>
    </div>
  );
}
