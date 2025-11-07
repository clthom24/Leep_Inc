import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./styles.module.css";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const isRecoveryParam = hash.includes("type=recovery");

    if (isRecoveryParam) {
      console.log("Detected recovery from URL → setting isPasswordRecovery");
      localStorage.setItem("isPasswordRecovery", "true");
    }

    const isRecovery = localStorage.getItem("isPasswordRecovery") === "true";
    if (!isRecovery) {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit() {
    localStorage.setItem("headerLock", "true");

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setIsSuccess(false);
    } else {
      setMessage("Your password has been updated successfully.");
      setIsSuccess(true);

      localStorage.removeItem("isPasswordRecovery");
      await supabase.auth.signOut();
      localStorage.removeItem("headerLock");
    }
  }

  return (
    <div className={styles.container} style={{ paddingTop: "11rem" }}>
      <div className={styles.box}>
        <div className={styles.boxLabel} style={{ fontSize: "2rem" }}>
          Set New Password
        </div>
        <input
          type="password"
          placeholder="New Password"
          className={styles.field}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={isSuccess ? styles.successMessage : styles.errorMessage}>
          {message}
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </div>
  );
}