import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FiMessageSquare, FiBookOpen, FiEdit3, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';
import Avatar from './Avatar';

export default function Dashboard({ session, userProfile }) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    journalEntries: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session?.user) return;

      try {
        // Get user's posts count
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', session.user.id);

        // Get user's comments count
        const { count: commentsCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', session.user.id);

        // Get user's journal entries count
        const { count: journalCount } = await supabase
          .from('mood_entries')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', session.user.id);

        // Get recent activity
        const { data: recentPosts } = await supabase
          .from('posts')
          .select('id, title, created_at, category_id')
          .eq('author_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        setStats({
          totalPosts: postsCount || 0,
          totalComments: commentsCount || 0,
          journalEntries: journalCount || 0,
          recentActivity: recentPosts || []
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    fetchDashboardData();
  }, [session]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-skeleton">
          <div className="skeleton" style={{ height: '60px', marginBottom: '20px' }}></div>
          <div className="skeleton" style={{ height: '120px', marginBottom: '20px' }}></div>
          <div className="skeleton" style={{ height: '200px' }}></div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Browse Forums',
      description: 'Join conversations and connect with others',
      icon: <FiMessageSquare />,
      link: '/home',
      color: 'primary'
    },
    {
      title: 'Read Library',
      description: 'Explore mental health resources and articles',
      icon: <FiBookOpen />,
      link: '/library',
      color: 'secondary'
    },
    {
      title: 'Write in Journal',
      description: 'Track your mood and thoughts privately',
      icon: <FiEdit3 />,
      link: '/self-help',
      color: 'success'
    },
    {
      title: 'Find Resources',
      description: 'Connect with professional help',
      icon: <FiUsers />,
      link: '/resources',
      color: 'warning'
    }
  ];

  return (
    <div className="dashboard fade-in">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="user-greeting">
            <Avatar username={session.user.user_metadata?.username || session.user.email} />
            <div>
              <h1>{greeting}!</h1>
              <p>Welcome back to your safe space for mental health support.</p>
            </div>
          </div>
          <div className="wellness-tip">
            <FiHeart className="tip-icon" />
            <div>
              <h4>Daily Wellness Tip</h4>
              <p>Take a moment to practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 6.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon primary">
            <FiMessageSquare />
          </div>
          <div className="stat-content">
            <h3>{stats.totalPosts}</h3>
            <p>Posts Created</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon secondary">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.totalComments}</h3>
            <p>Comments Made</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">
            <FiEdit3 />
          </div>
          <div className="stat-content">
            <h3>{stats.journalEntries}</h3>
            <p>Journal Entries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <h3>7</h3>
            <p>Days Active</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`quick-action-card ${action.color}`}
            >
              <div className="action-icon">
                {action.icon}
              </div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <div className="recent-activity-section">
          <h2>Your Recent Activity</h2>
          <div className="activity-list">
            {stats.recentActivity.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="activity-item"
              >
                <div className="activity-icon">
                  <FiMessageSquare />
                </div>
                <div className="activity-content">
                  <h4>{post.title}</h4>
                  <p>Posted {new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-6);
        }

        .welcome-section {
          background: linear-gradient(135deg, var(--primary-50), var(--secondary-50));
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          border: 1px solid var(--primary-100);
        }

        .welcome-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-6);
        }

        .user-greeting {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .user-greeting h1 {
          margin: 0;
          color: var(--neutral-900);
          font-size: var(--font-size-3xl);
        }

        .user-greeting p {
          margin: 0;
          color: var(--neutral-600);
          font-size: var(--font-size-lg);
        }

        .wellness-tip {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          background-color: white;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          max-width: 300px;
        }

        .tip-icon {
          color: var(--error-500);
          font-size: 24px;
          flex-shrink: 0;
        }

        .wellness-tip h4 {
          margin: 0 0 var(--space-1) 0;
          font-size: var(--font-size-base);
          color: var(--neutral-800);
        }

        .wellness-tip p {
          margin: 0;
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
          line-height: var(--line-height-normal);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .stat-card {
          background-color: white;
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          display: flex;
          align-items: center;
          gap: var(--space-4);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--neutral-200);
          transition: all var(--transition-normal);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }

        .stat-icon.primary { background-color: var(--primary-500); }
        .stat-icon.secondary { background-color: var(--secondary-500); }
        .stat-icon.success { background-color: var(--success-500); }
        .stat-icon.warning { background-color: var(--warning-500); }

        .stat-content h3 {
          margin: 0;
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--neutral-900);
        }

        .stat-content p {
          margin: 0;
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
        }

        .quick-actions-section {
          margin-bottom: var(--space-8);
        }

        .quick-actions-section h2 {
          margin-bottom: var(--space-6);
          color: var(--neutral-900);
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-4);
        }

        .quick-action-card {
          background-color: white;
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          display: flex;
          align-items: center;
          gap: var(--space-4);
          text-decoration: none;
          color: inherit;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--neutral-200);
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
        }

        .quick-action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          transform: scaleX(0);
          transition: transform var(--transition-normal);
        }

        .quick-action-card.primary::before { background-color: var(--primary-500); }
        .quick-action-card.secondary::before { background-color: var(--secondary-500); }
        .quick-action-card.success::before { background-color: var(--success-500); }
        .quick-action-card.warning::before { background-color: var(--warning-500); }

        .quick-action-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .quick-action-card:hover::before {
          transform: scaleX(1);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }

        .quick-action-card.primary .action-icon { background-color: var(--primary-500); }
        .quick-action-card.secondary .action-icon { background-color: var(--secondary-500); }
        .quick-action-card.success .action-icon { background-color: var(--success-500); }
        .quick-action-card.warning .action-icon { background-color: var(--warning-500); }

        .action-content h3 {
          margin: 0 0 var(--space-1) 0;
          font-size: var(--font-size-lg);
          color: var(--neutral-900);
        }

        .action-content p {
          margin: 0;
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
        }

        .recent-activity-section h2 {
          margin-bottom: var(--space-6);
          color: var(--neutral-900);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .activity-item {
          background-color: white;
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          color: inherit;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--neutral-200);
          transition: all var(--transition-fast);
        }

        .activity-item:hover {
          transform: translateX(4px);
          box-shadow: var(--shadow-md);
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background-color: var(--primary-100);
          color: var(--primary-600);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .activity-content h4 {
          margin: 0 0 var(--space-1) 0;
          font-size: var(--font-size-base);
          color: var(--neutral-900);
        }

        .activity-content p {
          margin: 0;
          font-size: var(--font-size-sm);
          color: var(--neutral-500);
        }

        .dashboard-loading {
          padding: var(--space-6);
        }

        .loading-skeleton .skeleton {
          border-radius: var(--radius-lg);
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: var(--space-4);
          }

          .welcome-content {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-4);
          }

          .wellness-tip {
            max-width: 100%;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-3);
          }

          .quick-actions-grid {
            grid-template-columns: 1fr;
          }

          .user-greeting {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-3);
          }

          .user-greeting h1 {
            font-size: var(--font-size-2xl);
          }
        }
      `}</style>
    </div>
  );
}