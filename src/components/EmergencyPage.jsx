import { Link } from 'react-router-dom';

export default function EmergencyPage() {
  const helplineStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px'
  };

  return (
    <div>
      <div style={{ padding: '1rem', border: '2px solid red', borderRadius: '5px', backgroundColor: '#fbe9e7', marginBottom: '2rem' }}>
        <h2 style={{ color: 'red' }}>Immediate Danger</h2>
        <p>If you or someone you know is in immediate danger of harming themselves or others, please contact your local emergency services (Police: 100) or go to the nearest hospital emergency room.</p>
      </div>

      <h1>Mental Health Helplines</h1>
      <p>These services offer free and confidential support from trained professionals. Please reach out if you need to talk.</p>
      
      <div style={helplineStyle}>
        <h3>Vandrevala Foundation for Mental Health</h3>
        <p>A 24/7 helpline for anyone experiencing emotional distress.</p>
        <p><strong>Phone:</strong> 9999666555</p>
      </div>

      <div style={helplineStyle}>
        <h3>iCALL Psychosocial Helpline</h3>
        <p>Provides counselling by telephone, email, and chat. Available Monday to Saturday, 10 AM - 8 PM.</p>
        <p><strong>Phone:</strong> 022-25521111 | 9152987821</p>
        <p><strong>Email:</strong> icall@tiss.edu</p>
      </div>

      <div style={helplineStyle}>
        <h3>Aasra</h3>
        <p>A 24/7 helpline for those who are distressed, depressed, or feeling suicidal.</p>
        <p><strong>Phone:</strong> 9820466726</p>
      </div>

      <br />
      <Link to="/">&larr; Go back to the main site</Link>
    </div>
  );
}