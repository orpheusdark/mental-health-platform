import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiFlag, FiMessageSquare, FiUser, FiClock } from 'react-icons/fi';
import FormValidation from './FormValidation';
import Avatar from './Avatar';
import './PostPage.css'; // Import the new stylesheet

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: postData } = await supabase.from('posts').select(`*, profiles ( username )`).eq('id', id).single();
    setPost(postData);
    const { data: commentsData } = await supabase.from('comments').select(`*, profiles ( username )`).eq('post_id', id).order('created_at', { ascending: true });
    setComments(commentsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateComment = async (formData) => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('comments')
      .insert({ 
        content: formData.comment, 
        author_id: user.id, 
        post_id: id 
      });
    
    if (error) { 
      toast.error(error.message); 
    } else { 
      toast.success('Comment added successfully!');
      fetchData(); 
    }
  };
  
  const handleFlag = async (type, contentId) => {
    const tableName = type === 'post' ? 'posts' : 'comments';
    const { error } = await supabase.from(tableName).update({ is_flagged_for_review: true }).eq('id', contentId);
    if (error) { toast.error(error.message); } else { toast.success('Content has been flagged for review. Thank you.'); }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const validationRules = {
    comment: {
      required: 'Please write a comment',
      minLength: 3,
      maxLength: 2000
    }
  };
  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div className="post-page fade-in">
      <div className="post-navigation">
        <Link to={`/category/${post.category_id}`} className="back-link">
          <FiArrowLeft />
          Back to posts
        </Link>
      </div>
      
      <article className="post-container">
        <div className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <div className="author-info">
              <Avatar username={post.profiles.username} />
              <div className="author-details">
                <span className="author-name">{post.profiles.username || 'Anonymous'}</span>
                <div className="post-date">
                  <FiClock />
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            </div>
            <button 
              className="flag-btn"
              onClick={() => handleFlag('post', post.id)}
              title="Report this post"
            >
              <FiFlag />
            </button>
          </div>
        </div>
        
        <div className="post-content">
          <p>{post.content}</p>
        </div>
      </article>

      <div className="comments-section">
        <div className="comments-header">
          <h3>
            <FiMessageSquare />
            Comments ({comments.length})
          </h3>
        </div>
        
        <div className="comment-form">
          <h4>Join the conversation</h4>
          <FormValidation onSubmit={handleCreateComment} validationRules={validationRules}>
            <div className="form-group">
              <textarea 
                name="comment"
                placeholder="Share your thoughts, experiences, or support..."
                rows="4"
                maxLength="2000"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Post Comment
              </button>
            </div>
          </FormValidation>
        </div>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <Avatar username={comment.profiles.username} />
                <div className="comment-author-info">
                  <span className="comment-author">{comment.profiles.username || 'Anonymous'}</span>
                  <div className="comment-date">
                    <FiClock />
                    <span>{formatDate(comment.created_at)}</span>
                  </div>
                </div>
                <button 
                  className="flag-btn small"
                  onClick={() => handleFlag('comment', comment.id)}
                  title="Report this comment"
                >
                  <FiFlag />
                </button>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-comments">
            <FiMessageSquare className="empty-icon" />
            <h4>No comments yet</h4>
            <p>Be the first to share your thoughts on this post!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .post-page {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-6);
        }

        .post-navigation {
          margin-bottom: var(--space-6);
        }

        .back-link {
          display: inline-flex;
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

        .post-container {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          box-shadow: var(--shadow-sm);
        }

        .post-header {
          margin-bottom: var(--space-6);
        }

        .post-header h1 {
          margin: 0 0 var(--space-4) 0;
          color: var(--neutral-900);
          font-size: var(--font-size-3xl);
          line-height: var(--line-height-tight);
        }

        .post-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .author-details {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .author-name {
          font-weight: var(--font-weight-semibold);
          color: var(--neutral-800);
        }

        .post-date {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-size-sm);
          color: var(--neutral-500);
        }

        .flag-btn {
          background: none;
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-md);
          padding: var(--space-2);
          color: var(--neutral-500);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flag-btn:hover {
          border-color: var(--error-500);
          color: var(--error-500);
          background-color: var(--error-50);
        }

        .flag-btn.small {
          padding: var(--space-1);
          font-size: var(--font-size-sm);
        }

        .post-content {
          line-height: var(--line-height-relaxed);
          color: var(--neutral-700);
          font-size: var(--font-size-lg);
        }

        .post-content p {
          margin-bottom: var(--space-4);
        }

        .comments-section {
          margin-bottom: var(--space-8);
        }

        .comments-header {
          margin-bottom: var(--space-6);
        }

        .comments-header h3 {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin: 0;
          color: var(--neutral-900);
          font-size: var(--font-size-xl);
        }

        .comment-form {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          margin-bottom: var(--space-8);
          box-shadow: var(--shadow-sm);
        }

        .comment-form h4 {
          margin: 0 0 var(--space-4) 0;
          color: var(--neutral-800);
          font-size: var(--font-size-lg);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: var(--space-4);
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .comment-card {
          background-color: white;
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: var(--space-5);
          transition: all var(--transition-fast);
        }

        .comment-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--primary-200);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
        }

        .comment-author-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
          margin-left: var(--space-3);
        }

        .comment-author {
          font-weight: var(--font-weight-semibold);
          color: var(--neutral-800);
        }

        .comment-date {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-size-sm);
          color: var(--neutral-500);
        }

        .comment-content {
          margin-left: 50px;
          line-height: var(--line-height-relaxed);
          color: var(--neutral-700);
        }

        .comment-content p {
          margin: 0;
        }

        .empty-comments {
          text-align: center;
          padding: var(--space-12) var(--space-4);
          color: var(--neutral-500);
        }

        .empty-icon {
          width: 48px;
          height: 48px;
          margin-bottom: var(--space-3);
          color: var(--neutral-400);
        }

        .empty-comments h4 {
          margin-bottom: var(--space-2);
          color: var(--neutral-600);
        }

        .empty-comments p {
          margin: 0;
        }

        @media (max-width: 768px) {
          .post-page {
            padding: var(--space-4);
          }

          .post-container {
            padding: var(--space-6);
          }

          .post-header h1 {
            font-size: var(--font-size-2xl);
          }

          .post-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-3);
          }

          .comment-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--space-2);
          }

          .comment-content {
            margin-left: 0;
          }

          .form-actions {
            justify-content: stretch;
          }

          .form-actions button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}