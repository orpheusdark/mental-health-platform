import { Link } from 'react-router-dom';

export default function LegalPage() {
  const sectionStyle = { marginBottom: '2rem' };
  const h2Style = { borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' };

  return (
    <div>
      <Link to="/">&larr; Back to Home</Link>
      <h1>Terms & Conditions and Privacy Policy</h1>
      <p>Last Updated: July 25, 2025</p>

      <div style={sectionStyle}>
        <h2 style={h2Style}>1. Introduction</h2>
        <p>Welcome to the Mental Health Support Network. This platform provides a peer-to-peer support forum, educational resources, and a directory of mental health professionals. By using our platform, you agree to these terms and conditions.</p>
        <p><strong>This platform is not a substitute for professional medical advice, diagnosis, or treatment.</strong></p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>2. User Accounts & Responsibilities</h2>
        <p>You must be at least 18 years of age to use this platform. You are responsible for maintaining the confidentiality of your account and password. You agree to create only one account and provide a pseudonymous username for your privacy.</p>
      </div>
      
      <div style={sectionStyle}>
        <h2 style={h2Style}>3. Code of Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Provide medical advice or diagnoses.</li>
          <li>Engage in hate speech, harassment, or bullying.</li>
          <li>Share personally identifiable information about yourself or others.</li>
          <li>Post unlawful, harmful, or inappropriate content.</li>
          <li>Impersonate any person or entity.</li>
        </ul>
        <p>We reserve the right to remove content and terminate accounts that violate these rules.</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>4. Privacy Policy</h2>
        <p>We are committed to protecting your privacy in compliance with India's DPDPA, 2023.</p>
        <h4>Data We Collect:</h4>
        <ul>
          <li><strong>Account Information:</strong> Your email address and chosen username.</li>
          <li><strong>User-Generated Content:</strong> Posts, comments, and journal entries you create.</li>
          <li><strong>Usage Data:</strong> We do not collect analytics or tracking data beyond what is necessary for the service to function.</li>
        </ul>
        <h4>How We Use Your Data:</h4>
        <ul>
          <li>To provide and maintain the service (authentication, displaying your content to you).</li>
          <li>To enforce our terms and moderate the platform.</li>
          <li>We will never sell your personal data.</li>
        </ul>
        <h4>Data Security & Retention:</h4>
        <p>We use industry-standard measures like data encryption and Supabase's Row Level Security to protect your data. Journal entries are private to your account. We retain your data only as long as your account is active.</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>5. Disclaimers and Limitation of Liability</h2>
        <p>The platform is provided "as is". We make no warranties regarding the accuracy of user-generated content or the qualifications of professionals listed in the directory. We are not liable for any damages arising from your use of the platform.</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={h2Style}>6. Governing Law</h2>
        <p>These terms shall be governed by the laws of India, with jurisdiction in the courts of Vadodara, Gujarat.</p>
      </div>
    </div>
  );
}