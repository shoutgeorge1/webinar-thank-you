import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ThankYouPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get URL parameters
    const { firstName, email, topic, zoomLink } = router.query;
    
    if (firstName && email) {
      sendConfirmationEmail();
    } else {
      setLoading(false);
    }
  }, [router.query]);

  const sendConfirmationEmail = async () => {
    try {
      const { firstName, email, topic, zoomLink } = router.query;
      
      const response = await fetch('/api/sendWebinarEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          topic: topic || 'DrBalcony Webinar',
          zoomLink: zoomLink || 'https://zoom.us/j/123456789'
        })
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setEmailSent(true);
      } else {
        setError(result.error || 'Failed to send confirmation email');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Sending your confirmation email...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>DrBalcony</h1>
          <h2 style={styles.subtitle}>
            {emailSent ? 'Thank You!' : 'Registration Complete'}
          </h2>
        </div>

        {emailSent ? (
          <div style={styles.success}>
            <div style={styles.checkmark}>✓</div>
            <h3 style={styles.successTitle}>You're All Set!</h3>
            <p style={styles.successText}>
              Your webinar registration is confirmed. Check your email for details and the Zoom link.
            </p>
            <div style={styles.nextSteps}>
              <h4>What's Next:</h4>
              <ul>
                <li>Check your email for confirmation details</li>
                <li>Save the webinar date and time</li>
                <li>Reply to the email with any questions</li>
              </ul>
            </div>
          </div>
        ) : error ? (
          <div style={styles.error}>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div style={styles.info}>
            <h3>Registration Received</h3>
            <p>Thank you for registering for the DrBalcony webinar.</p>
            <p>If you need immediate assistance, please call us at (805) 312-8508.</p>
          </div>
        )}

        <div style={styles.footer}>
          <p>
            <a href="https://drbalcony.com" style={styles.link}>
              DrBalcony.com
            </a> | (805) 312-8508
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Poppins, Arial, sans-serif',
    background: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: 0,
  },
  content: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    color: '#051c3e',
    fontSize: '32px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#051c3e',
    fontSize: '24px',
    margin: '0',
    fontWeight: '500',
  },
  loading: {
    padding: '40px 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ff7b3d',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px',
  },
  success: {
    padding: '20px 0',
  },
  checkmark: {
    width: '60px',
    height: '60px',
    background: '#28a745',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    margin: '0 auto 20px',
    fontWeight: 'bold',
  },
  successTitle: {
    color: '#051c3e',
    fontSize: '24px',
    margin: '0 0 15px 0',
  },
  successText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#666',
    margin: '0 0 25px 0',
  },
  nextSteps: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
    borderLeft: '4px solid #ff7b3d',
  },
  error: {
    padding: '20px 0',
    color: '#dc3545',
  },
  info: {
    padding: '20px 0',
  },
  retryButton: {
    background: '#ff7b3d',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '15px',
  },
  footer: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #e9ecef',
    color: '#666',
    fontSize: '14px',
  },
  link: {
    color: '#051c3e',
    textDecoration: 'none',
  },
};

// Add CSS animation for spinner
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
