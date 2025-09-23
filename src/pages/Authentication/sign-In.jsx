import { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // checks if the entered email is in a valid format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // shows the forgot password screen
  const navigate = useNavigate();

  // brings the user to the forgot-password page
  function handleForgotPassword() {
    navigate('/forgot-password');
  }

  // clears all text fields
  function clearFields() {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setErrorMessage('');
    setShowPassword(false);
  }

  // checks login text fields for valid credentials
  function handleLogin() {
    if (!email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // TODO: check credentials against database and give error message if no match

    // TODO: redirect user to the home page with their session information
    alert('Redirecting to user home page...');
  }

  // checks sign-up text fields for valid credentials
  function handleSignUp() {
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // TOO: check credentials against database and give error message if account with new email already exists

    // TODO: redirect user to the your music page so they can go through the song upload tutorial
    alert('Redirecting to the Your Music page...');
  }

  return (
    <div className={styles.container}>
      {/* Log In Box */}
      {!isSignUp && (
        <div className={styles.box}>
          <div className={styles.boxLabel}>Log In</div>

          <div>
            <span className={styles.orText}>or&nbsp;</span>

            <span
              className={styles.switchSignInScreen}
              onClick={() => {
                setIsSignUp(true);
                clearFields();
              }}
            >
              Sign Up
            </span>
          </div>

          <input
            type="text"
            placeholder="Email"
            className={styles.field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.passwordField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
          </div>

          <div className={styles.forgotPassword} onClick={handleForgotPassword}>
            Forgot Password?
          </div>

          <div className={styles.errorMessage}>{errorMessage}</div>

          <button className={styles.button} onClick={handleLogin}>
            Log In
          </button>

          <Link to="/discovery" className={styles.switchSignInScreen} style = {{marginBottom: '0rem', marginTop: '0.25rem'}}>
            Back to Discovery
          </Link>
        </div>
      )}

      {/* Sign Up Box */}
      {isSignUp && (
        <div className={styles.box}>
          <div className={styles.boxLabel}>Sign Up</div>

          <div>
            <span className={styles.orText}>or&nbsp;</span>

            <span
              className={styles.switchSignInScreen}
              onClick={() => {
                setIsSignUp(false);
                clearFields();
              }}
            >
              Log In
            </span>
          </div>

          <input
            type="text"
            placeholder="First Name"
            className={styles.field}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className={styles.field}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className={styles.field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.passwordField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </span>
          </div>

          <div className={styles.errorMessage}>{errorMessage}</div>

          <button className={styles.button} onClick={handleSignUp}>
            Sign Me Up!
          </button>

          <Link to="/discovery" className={styles.switchSignInScreen} style = {{marginBottom: '0rem', marginTop: '0.25rem'}}>
            Back to Discovery
          </Link>
        </div>
      )}
    </div>
  );
}