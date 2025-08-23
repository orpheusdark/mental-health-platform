import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus, FiMessageSquare } from 'react-icons/fi';
import FormValidation from './FormValidation';
import SearchBar from './SearchBar';
import './Card.css'; // Import our reusable card styles

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchCategoryData = async () => {
    setLoading(true);
    const { data: categoryData } = await supabase.from('forum_categories').select('name').eq('id', id).single();
    setCategory(categoryData);
    const { data: postsData } = await supabase
      .from('posts')
      .select('*, profiles(username)')
      .eq('category_id', id)
      .order('created_at', { ascending: false });
    setPosts(postsData || []);
    setFilteredPosts(postsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const handleCreatePost = async (formData) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('posts')
      .insert({ 
        title: formData.title, 
        content: formData.content, 
        author_id: user.id, 
        category_id: id 
      });
    
    if (error) { 
      toast.error(error.message); 
    } else { 
      toast.success('Post created successfully!');
      setShowCreateForm(false);
      fetchCategoryData(); 
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const validationRules = {
    title: {
      required: 'Post title is required',
      minLength: 5,
      maxLength: 200
    },
    content: {
      required: 'Post content is required',
      minLength: 10,
      maxLength: 5000
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="category-page fade-in">
      <div className="category-header">
        <Link to="/home" className="back-link">
          <FiArrowLeft />
          Back to Dashboard
        </Link>
        <div className="category-title">
          <h1>{category?.name}</h1>
          <p>Share your thoughts and connect with others</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary create-post-btn"
        >
          <FiPlus />
          New Post
        </button>
      </div>

      {showCreateForm && (
        <div className="create-post-form slide-up">
          <div className="form-header">
            <h3>Create a New Post</h3>
            <button 
              onClick={() => setShowCreateForm(false)}
              className="close-form-btn"
            >
              ×
            </button>
          </div>
          <FormValidation onSubmit={handleCreatePost} validationRules={validationRules}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Post Title</label>
              <input 
                type="text" 
                id="title"
                name="title"
                placeholder="What would you like to discuss?" 
                maxLength="200"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content" className="form-label">Your Message</label>
              <textarea 
                id="content"
                name="content"
                placeholder="Share your thoughts, experiences, or questions..."
                rows="6"
                maxLength="5000"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowCreateForm(false)} className="btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Post
              </button>
            </div>
          </FormValidation>
        </div>
      )}

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search posts..."
        className="posts-search"
      />

      <div className="posts-section">
        <h2>Recent Discussions ({filteredPosts.length})</h2>
        {filteredPosts.length > 0 ? (
        <div className="card-grid">
          {filteredPosts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="card post-card">
                <div className="post-meta">
                  <span className="author">by {post.profiles?.username || 'Anonymous'}</span>
                  <span className="date">{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <h4>{post.title}</h4>
                <p className="post-preview">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content
                  }
                </p>
                <div className="post-footer">
                  <div className="post-stats">
                    <FiMessageSquare />
                    <span>View Discussion</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FiMessageSquare className="empty-icon" />
          <h3>No posts found</h3>
          <p>Be the first to start a conversation in this category!</p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="btn-primary"
          >
            <FiPlus />
            Create First Post
          </button>
        </div>
      )}
      </div>

      <style jsx>{`
        .category-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-6);
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-8);
          gap: var(--space-4);
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--primary-600);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-fast);
        }

        .back-link:hover {
          color: var(--primary-700);
        }

        .category-title {
          flex: 1;
          text-align: center;
        }

        .category-title h1 {
          margin: 0 0 var(--space-2) 0;
          color: var(--neutral-900);
        }

        .category-title p {
          margin: 0;
          color: var(--neutral-600);
        }

        .create-post-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          white-space: nowrap;
        }

        .create-post-form {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          margin-bottom: var(--space-8);
          box-shadow: var(--shadow-md);
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-6);
        }

        .form-header h3 {
          margin: 0;
          color: var(--neutral-900);
        }

        .close-form-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: var(--neutral-500);
          cursor: pointer;
          padding: var(--space-1);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .close-form-btn:hover {
          color: var(--neutral-700);
          background-color: var(--neutral-100);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          margin-top: var(--space-6);
        }

        .posts-search {
          margin-bottom: var(--space-6);
        }

        .posts-section h2 {
          margin-bottom: var(--space-6);
          color: var(--neutral-900);
        }

        .post-card {
          transition: all var(--transition-normal);
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
          font-size: var(--font-size-sm);
          color: var(--neutral-500);
        }

        .author {
          font-weight: var(--font-weight-medium);
          color: var(--primary-600);
        }

        .post-card h4 {
          margin: 0 0 var(--space-3) 0;
          color: var(--neutral-900);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-tight);
        }

        .post-preview {
          color: var(--neutral-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: var(--space-4);
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--neutral-100);
        }

        .post-stats {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--primary-600);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
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

        .empty-state button {
          margin-top: var(--space-4);
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
        }

        @media (max-width: 768px) {
          .category-page {
            padding: var(--space-4);
          }

          .category-header {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            gap: var(--space-4);
          }

          .back-link {
            align-self: flex-start;
          }

          .create-post-btn {
            align-self: center;
          }

          .form-actions {
            flex-direction: column;
          }

          .post-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-1);
          }
        }
      `}</style>
    </div>
  );
}