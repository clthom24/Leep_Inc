import { useState } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // checks if the entered email is in a valid format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // checks email text field for valid credentials
  async function handleResetPassword() {
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      setIsSuccess(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/new-password`,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsSuccess(false);
    } else {
      setErrorMessage('If this email exists, a reset link has been sent.');
      setIsSuccess(true);
    }
  } 

  return (
    <div className={styles.container} style={{paddingTop: '11rem'}}>
      <div className={styles.box}>
        <div className={styles.boxLabel} style={{fontSize: '2rem'}}>Password Reset</div>
        <p style={{ opacity: '60%', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Enter your email address to reset your password.
        </p>

        <input
          type="text"
          placeholder="Email"
          className={styles.field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div
          className={isSuccess ? styles.successMessage : styles.errorMessage}
        >
          {message}
        </div>

        <button className={styles.button} onClick={handleResetPassword}>
          Send Reset Link
        </button>
        
        <Link to="/sign-in" className={styles.switchSignInScreen} style = {{marginBottom: '0rem', marginTop: '0.25rem'}}>
          Back to Log In
        </Link>
      </div>
    </div>
  );
}