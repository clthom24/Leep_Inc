import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import appleIcon from '/src/assets/apple-icon.svg';
import googleIcon from '/src/assets/google-icon.svg';
import linkedInIcon from '/src/assets/linkedin-icon.svg';
import spotifyIcon from '/src/assets/spotify-icon.svg';

export default function SignInPage() {
  const location = useLocation();
  const isSignUpRoute = location.pathname.includes('sign-up');

  const [isSignUp, setIsSignUp] = useState(isSignUpRoute);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Keep local state in sync when user hits back/forward or lands directly
  useEffect(() => {
    setIsSignUp(isSignUpRoute);
  }, [isSignUpRoute]);

  const navigate = useNavigate();

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleForgotPassword() {
    navigate('/forgot-password');
  }

  function clearFields() {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setErrorMessage('');
    setShowPassword(false);
  }

  function handleLogin() {
    if (!email || !password) return setErrorMessage('Please fill out all fields.');
    if (!isValidEmail(email)) return setErrorMessage('Please enter a valid email address.');
    alert('Redirecting to user home page...');
  }

  function handleSignUp() {
    if (!firstName || !lastName || !email || !password) return setErrorMessage('Please fill out all fields.');
    if (!isValidEmail(email)) return setErrorMessage('Please enter a valid email address.');
    alert('Redirecting to the Your Music page...');
  }

  function handleSocial(provider) {
    const mode = isSignUp ? 'Sign Up' : 'Log In';
    alert(`${mode} with ${provider} — placeholder for Supabase`);
  }

  return (
    <div className={styles.container}>
      {/* Log In View */}
      {!isSignUp && (
        <div className={styles.box} style={{ marginTop: '3rem' }}>
          <div className={styles.boxLabel}>Log In</div>

          <div>
            <span className={styles.orText}>or&nbsp;</span>
            <Link
              to="/sign-up"
              className={styles.switchSignInScreen}
              onClick={clearFields}
            >
              Sign Up
            </Link>
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

          <div className={styles.boxLabel} style={{ fontSize: '1.5rem' }}>
            Log In with Social Account
          </div>

          <div className={styles.socialButtons}>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Google')}>
              <img src={googleIcon} alt="Google logo" width={28} height={28} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Apple')}>
              <img src={appleIcon} alt="Apple logo" width={28} height={28} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('LinkedIn')}>
              <img src={linkedInIcon} alt="LinkedIn logo" width={36} height={36} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Spotify')}>
              <img src={spotifyIcon} alt="Spotify logo" width={28} height={28} />
            </button>
          </div>

          <Link to="/SignedOut" className={styles.switchSignInScreen} style={{ margin: '0.25rem 0 0' }}>
            Back to Discovery
          </Link>
        </div>
      )}

      {/* Sign Up View */}
      {isSignUp && (
        <div className={styles.box}>
          <div className={styles.boxLabel}>Sign Up</div>

          <div>
            <span className={styles.orText}>or&nbsp;</span>
            <Link
              to="/sign-in"
              className={styles.switchSignInScreen}
              onClick={clearFields}
            >
              Log In
            </Link>
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

          <div className={styles.boxLabel} style={{ fontSize: '1.5rem' }}>
            Sign Up with Social Account
          </div>

          <div className={styles.socialButtons}>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Google')}>
              <img src={googleIcon} alt="Google logo" width={28} height={28} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Apple')}>
              <img src={appleIcon} alt="Apple logo" width={28} height={28} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('LinkedIn')}>
              <img src={linkedInIcon} alt="LinkedIn logo" width={36} height={36} />
            </button>
            <button type="button" className={`${styles.socialBtn} ${styles.google}`} onClick={() => handleSocial('Spotify')}>
              <img src={spotifyIcon} alt="Spotify logo" width={28} height={28} />
            </button>
          </div>

          <Link to="/SignedOut" className={styles.switchSignInScreen} style={{ margin: '0.25rem 0 0' }}>
            Back to Discovery
          </Link>
        </div>
      )}
    </div>
  );
}
