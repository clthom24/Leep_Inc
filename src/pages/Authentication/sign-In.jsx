import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'

import leepLogo from '/src/assets/leep-logo.png';
import appleIcon from '/src/assets/apple-icon.svg';
import googleIcon from '/src/assets/google-icon.svg';
import linkedInIcon from '/src/assets/linkedin-icon.svg';
import spotifyIcon from '/src/assets/spotify-icon.svg';
import facebookIcon from '/src/assets/facebook-icon.svg';

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

  async function handleLogin() {
    localStorage.removeItem("isPasswordRecovery");
    if (!email || !password) return setErrorMessage('Please fill out all fields.');
    if (!isValidEmail(email)) return setErrorMessage('Please enter a valid email address.');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErrorMessage(error.message);
    navigate('/homeSignedIn');
  }

  async function handleSignUp() {
    localStorage.removeItem("isPasswordRecovery");
    if (!firstName || !lastName || !email || !password) return setErrorMessage('Please fill out all fields.');
    if (!isValidEmail(email)) return setErrorMessage('Please enter a valid email address.');

    const displayName = `${firstName} ${lastName}`.trim();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName },
        emailRedirectTo: `${window.location.origin}/account-startup`,
      },
    });

    if (error) return setErrorMessage(error.message);

    // Save email in localStorage (backup for page refresh)
    localStorage.setItem("pendingSignUpEmail", email);

    // Redirect to confirmation screen
    navigate("/email-confirmation", { state: { email } });
  }

  async function handleSocial(provider) {
    localStorage.removeItem("isPasswordRecovery");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
      options: {
        redirectTo: `${window.location.origin}/account-startup`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className={styles.container}>
      {/* Log In View */}
      {!isSignUp && (
        <div className={styles.box} style={{ marginTop: '3rem' }}>
          <img src={leepLogo} alt="Corner Icon" className={styles.leepLogo} />

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
            <button type="button" className={`${styles.socialBtn} ${styles.facebook}`} onClick={() => handleSocial('Facebook')}>
              <img src={facebookIcon} alt="Facebook logo" style={{ width: '28px', height: '28px'}} />
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
          <img src={leepLogo} alt="Corner Icon" className={styles.leepLogo} />

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
            <button type="button" className={`${styles.socialBtn} ${styles.facebook}`} onClick={() => handleSocial('Facebook')}>
              <img src={facebookIcon} alt="Facebook logo" style={{ width: '28px', height: '28px'}} />
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