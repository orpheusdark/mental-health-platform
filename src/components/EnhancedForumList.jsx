import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiUsers, FiClock, FiTrendingUp } from 'react-icons/fi';
import SearchBar from './SearchBar';
import SkeletonCard from './SkeletonCard';

export default function EnhancedForumList() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  const filters = [
    { label: 'Most Active', value: 'active' },
    { label: 'Recently Updated', value: 'recent' },
    { label: 'Popular', value: 'popular' }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('forum_categories')
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;

        // Fetch stats for each category
        const statsPromises = categoriesData.map(async (category) => {
          const { count: postCount } = await supabase
            .from('posts')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);

          const { data: recentPost } = await supabase
            .from('posts')
            .select('created_at')
            .eq('category_id', category.id)
            .order('created_at', { ascending: false })
            .limit(1);

          return {
            categoryId: category.id,
            postCount: postCount || 0,
            lastActivity: recentPost?.[0]?.created_at || null
          };
        });

        const stats = await Promise.all(statsPromises);
        const statsMap = stats.reduce((acc, stat) => {
          acc[stat.categoryId] = stat;
          return acc;
        }, {});

        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
        setCategoryStats(statsMap);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply filters
    if (activeFilters.includes('active')) {
      filtered = filtered.sort((a, b) => 
        (categoryStats[b.id]?.postCount || 0) - (categoryStats[a.id]?.postCount || 0)
      );
    }

    if (activeFilters.includes('recent')) {
      filtered = filtered.sort((a, b) => {
        const aDate = categoryStats[a.id]?.lastActivity;
        const bDate = categoryStats[b.id]?.lastActivity;
        if (!aDate && !bDate) return 0;
        if (!aDate) return 1;
        if (!bDate) return -1;
        return new Date(bDate) - new Date(aDate);
      });
    }

    if (activeFilters.includes('popular')) {
      filtered = filtered.sort((a, b) => 
        (categoryStats[b.id]?.postCount || 0) - (categoryStats[a.id]?.postCount || 0)
      );
    }

    setFilteredCategories(filtered);
  }, [searchTerm, activeFilters, categories, categoryStats]);

  const formatLastActivity = (dateString) => {
    if (!dateString) return 'No recent activity';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="forum-list-container">
        <div className="forum-header">
          <h2>Community Forums</h2>
          <p>Connect with others who understand your journey</p>
        </div>
        <div className="skeleton-container">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="forum-list-container fade-in">
      <div className="forum-header">
        <h2>Community Forums</h2>
        <p>Connect with others who understand your journey</p>
      </div>

      <SearchBar
        onSearch={setSearchTerm}
        onFilter={setActiveFilters}
        placeholder="Search forums..."
        filters={filters}
        activeFilters={activeFilters}
        className="forum-search"
      />

      {filteredCategories.length > 0 ? (
        <div className="categories-grid">
          {filteredCategories.map((category) => {
            const stats = categoryStats[category.id] || {};
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="category-card scale-in"
                style={{ animationDelay: `${filteredCategories.indexOf(category) * 0.1}s` }}
              >
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <div className="category-stats">
                    <div className="stat-item">
                      <FiMessageSquare className="stat-icon" />
                      <span>{stats.postCount || 0}</span>
                    </div>
                  </div>
                </div>
                
                <p className="category-description">{category.description}</p>
                
                <div className="category-footer">
                  <div className="activity-info">
                    <FiClock className="activity-icon" />
                    <span className="activity-text">
                      {formatLastActivity(stats.lastActivity)}
                    </span>
                  </div>
                  
                  {stats.postCount > 10 && (
                    <div className="popular-badge">
                      <FiTrendingUp />
                      <span>Popular</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <FiMessageSquare className="empty-icon" />
          <h3>No forums found</h3>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      <style jsx>{`
        .forum-list-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-6);
        }

        .forum-header {
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .forum-header h2 {
          margin-bottom: var(--space-2);
          color: var(--neutral-900);
          font-size: var(--font-size-3xl);
        }

        .forum-header p {
          color: var(--neutral-600);
          font-size: var(--font-size-lg);
          margin: 0;
        }

        .forum-search {
          margin-bottom: var(--space-8);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-6);
        }

        .category-card {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-decoration: none;
          color: inherit;
          transition: all var(--transition-normal);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-500), var(--secondary-500));
          transform: scaleX(0);
          transition: transform var(--transition-normal);
        }

        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-200);
        }

        .category-card:hover::before {
          transform: scaleX(1);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-4);
        }

        .category-header h3 {
          margin: 0;
          color: var(--neutral-900);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
        }

        .category-stats {
          display: flex;
          gap: var(--space-3);
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          background-color: var(--primary-50);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          color: var(--primary-700);
          font-weight: var(--font-weight-medium);
        }

        .stat-icon {
          width: 14px;
          height: 14px;
        }

        .category-description {
          color: var(--neutral-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: var(--space-4);
          flex-grow: 1;
        }

        .category-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          padding-top: var(--space-4);
          border-top: 1px solid var(--neutral-100);
        }

        .activity-info {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--neutral-500);
          font-size: var(--font-size-sm);
        }

        .activity-icon {
          width: 14px;
          height: 14px;
        }

        .popular-badge {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          background-color: var(--warning-50);
          color: var(--warning-700);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }

        .popular-badge svg {
          width: 12px;
          height: 12px;
        }

        .empty-state {
          text-align: center;
          padding: var(--space-16) var(--space-4);
          color: var(--neutral-500);
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          margin-bottom: var(--space-4);
          color: var(--neutral-400);
        }

        .empty-state h3 {
          margin-bottom: var(--space-2);
          color: var(--neutral-600);
        }

        .skeleton-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-6);
        }

        @media (max-width: 768px) {
          .forum-list-container {
            padding: var(--space-4);
          }

          .categories-grid,
          .skeleton-container {
            grid-template-columns: 1fr;
            gap: var(--space-4);
          }

          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }

          .category-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }

          .forum-header h2 {
            font-size: var(--font-size-2xl);
          }
        }
      `}</style>
    </div>
  );
}