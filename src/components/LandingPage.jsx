import { Link } from 'react-router-dom';
import './LandingPage.css';
// Import the specific icons we want to use
import { FiMessageSquare, FiBookOpen, FiEdit } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Mental Health Support Network</h1>
        <nav>
          <Link to="/login" role="button" className="outline">Login / Sign Up</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h2>A Safe Space to Connect & Heal</h2>
          <p>You are not alone. Join a compassionate peer support community where you can share your journey anonymously and find resources to help you grow.</p>
          <Link to="/login" role="button" className="primary-cta">Join the Community</Link>
        </section>

        <section className="features">
          <div className="feature">
            {/* Replace emoji with the icon component */}
            <div className="icon"><FiMessageSquare /></div>
            <h3>Anonymous Forums</h3>
            <p>Engage in open discussions about anxiety, stress, and more without revealing your identity. Your privacy is our priority.</p>
          </div>
          <div className="feature">
            {/* Replace emoji with the icon component */}
            <div className="icon"><FiBookOpen /></div>
            <h3>Verified Resources</h3>
            <p>Access a curated directory of mental health professionals, NGOs, and educational content to support your journey.</p>
          </div>
          <div className="feature">
            {/* Replace emoji with the icon component */}
            <div className="icon"><FiEdit /></div>
            <h3>Private Journal</h3>
            <p>Use our private mood tracker and journaling tools to reflect on your thoughts and feelings in a secure, personal space.</p>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>Your journey to wellness is supported here.</p>
        <nav>
          <Link to="/legal">Terms & Conditions</Link>
          <Link to="/emergency">Emergency Help</Link>
        </nav>
      </footer>
    </div>
  );
}