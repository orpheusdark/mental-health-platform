import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Header({ session, userProfile }) {
  const handleLogout = async () => { await supabase.auth.signOut(); };
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/"><strong>Home (Forums)</strong></Link></li>
        </ul>
        <ul>
          {userProfile?.role === 'moderator' && (
            <li><Link to="/moderation">Moderation</Link></li>
          )}
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/self-help">My Journal</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li>
            <Link to="/emergency" role="button" className="secondary" style={{ backgroundColor: '#d32f2f', color: 'white', borderColor: '#d32f2f' }}>
              Emergency Help
            </Link>
          </li>
          <li><button onClick={handleLogout}>Log Out</button></li>
        </ul>
      </nav>
      <p style={{ textAlign: 'center', margin: '-1rem 0 1rem 0', fontSize: '0.9em' }}>
        Logged in as: {session.user.email}
      </p>
    </header>
  );
}