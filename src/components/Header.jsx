import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Header({ session, userProfile }) {
  const handleLogout = async () => { await supabase.auth.signOut(); };
  
  return (
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
    
    <style jsx>{`
      .main-header {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--neutral-200);
        position: sticky;
        top: 0;
        z-index: 100;
        padding: var(--space-4) 0;
      }
      
      .main-header nav {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-4);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .main-header ul {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin: 0;
        padding: 0;
        list-style: none;
      }
      
      .logo {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--primary-600) !important;
        text-decoration: none;
      }
      
      .emergency-btn {
        background-color: var(--error-500) !important;
        border-color: var(--error-500) !important;
        color: white !important;
        font-weight: var(--font-weight-medium);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-full);
        text-decoration: none;
        transition: all var(--transition-fast);
      }
      
      .emergency-btn:hover {
        background-color: var(--error-700) !important;
        border-color: var(--error-700) !important;
        transform: translateY(-1px);
      }
      
      @media (max-width: 768px) {
        .main-header nav {
          flex-direction: column;
          gap: var(--space-3);
        }
        
        .main-header ul {
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-2);
        }
        
        .logo {
          font-size: var(--font-size-base);
        }
      }
    `}</style>
  );
}