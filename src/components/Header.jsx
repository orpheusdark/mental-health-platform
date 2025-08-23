
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Header({ session, userProfile }) {
  const handleLogout = async () => { await supabase.auth.signOut(); };
  return (
    <>
      <header className="main-header">
        <nav>
          <ul>
            <li><Link to="/home" className="logo"><strong>Mental Health Support</strong></Link></li>
          </ul>
          <ul>
            <li><Link to="/home">Dashboard</Link></li>
            {userProfile?.role === 'moderator' && (
              <li><Link to="/moderation">Moderation</Link></li>
            )}
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/self-help">My Journal</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li>
              <Link to="/emergency" role="button" className="btn-danger emergency-btn">
                Emergency Help
              </Link>
            </li>
            <li><button onClick={handleLogout} className="btn-outline">Log Out</button></li>
          </ul>
        </nav>
      </header>
      {/* Styles moved to App.css for Vite compatibility */}
    </>
  );
}