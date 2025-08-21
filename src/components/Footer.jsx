import { Link } from 'react-router-dom';

export default function Footer() {
  const footerStyle = {
    textAlign: 'center',
    padding: '2rem 0',
    marginTop: '4rem',
    borderTop: '1px solid #ddd',
    fontSize: '0.9em',
    color: '#666'
  };

  return (
    <footer style={footerStyle}>
      <p>
        <strong>Disclaimer:</strong> The Mental Health Support Network is a peer-to-peer support platform.
        It is not a substitute for professional medical advice, diagnosis, or treatment.
        Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </p>
      <p>
        <Link to="/legal">Terms & Conditions / Privacy Policy</Link>
      </p>
      <p>&copy; 2025 Mental Health Support Network. All Rights Reserved.</p>
    </footer>
  );
}