import React, { useState } from 'react';
import { FaRegUser, FaUserAlt, FaPhone, FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [oldUser, setOldUser] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // To track successful registration
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password match during registration
    if (!oldUser && password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }

    const formData = { firstName, lastName, phoneNumber, email, password };
    const loginData = { email, password };

    try {
      const response = await fetch(`http://localhost:8080/api/users/${oldUser ? 'login' : 'register'}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oldUser ? loginData : formData),
      });

      if (response.status === 200) {
        const token = await response.text();
        setMessage(oldUser ? "Login successful!" : "Registration successful! Please Verify your Email to login");
        localStorage.setItem('authToken', `Bearer ${token}`);
        if (oldUser) {
          localStorage.setItem("email",email);
          localStorage.setItem("Isalert","false");
          navigate('/dashboard');
        } else {
          setSuccess(true); // Mark success for registration // Clear message after 5 seconds
        }
      } else if (response.status === 401) {
        setMessage("Login failed: Invalid credentials. Please try again.");
      } else if (response.status === 403) {
        const errorMessage = await response.text();
        setMessage(oldUser ? errorMessage : "Registration successful!");
      } else if (response.status === 409) {
        const errorMessage = await response.text();
        setMessage(`Registration failed: ${errorMessage}`);
      } else {
        setMessage(`${oldUser ? "Login" : "Registration"} failed: Unexpected error. Please try again later.`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(`An error occurred during ${oldUser ? "login" : "registration"}. Please try again.`);
    }

    setLoading(false);
  };

  const usageChanged = () => {
    setOldUser(!oldUser);
    setMessage('');
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSuccess(false); // Reset success state when switching
  };

  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#F0F8FF',
      padding: '20px',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '2rem',
      color: '#0a2f5e',
    },
    inputBox: {
      position: 'relative',
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem 2.5rem 0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '5px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    icon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '1.25rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#FF7F6E',
      border: 'none',
      borderRadius: '5px',
      color: '#ffffff',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
      color: '#6b7280',
    },
    message: {
      textAlign: 'center',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.formHeader}>{oldUser ? "Login" : "Register"}</h1>
        {message && (
          <p style={{ ...styles.message, color: message.includes('failed') || message.includes('Passwords') ? 'red' : 'green' }}>
            {message}
          </p>
        )}
        {!success && !oldUser && (
          <>
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <FaRegUser style={styles.icon} />
            </div>
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <FaUserAlt style={styles.icon} />
            </div>
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <FaPhone style={styles.icon} />
            </div>
          </>
        )}
        {!success && (
          <>
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <IoMdMail style={styles.icon} />
            </div>
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaLock style={styles.icon} />
            </div>
          </>
        )}
        {!success && !oldUser && (
          <div style={styles.inputBox}>
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FaLock style={styles.icon} />
          </div>
        )}
        {!success && (
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Loading..." : oldUser ? "Login" : "Register"}
          </button>
        )}
        {!success && (
          <div style={styles.registerLink}>
            <p>
              {oldUser ? "Don't have an account?" : "Already have an account?"}{" "}
              <span style={{ cursor: 'pointer', color: '#0a2f5e', fontWeight: 'bold' }} onClick={usageChanged}>
                {oldUser ? "Register" : "Login"}
              </span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
