import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import Avatar from './Avatar'; // Import the new Avatar component

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  const fetchData = async () => {
    // ... (This function is unchanged)
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

  const handleCreateComment = async (event) => {
    // ... (This function is unchanged)
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('comments').insert({ content: newComment, author_id: user.id, post_id: id });
    if (error) { toast.error(error.message); } else { setNewComment(''); fetchData(); }
  };
  
  const handleFlag = async (type, contentId) => {
    // ... (This function is unchanged)
    const tableName = type === 'post' ? 'posts' : 'comments';
    const { error } = await supabase.from(tableName).update({ is_flagged_for_review: true }).eq('id', contentId);
    if (error) { toast.error(error.message); } else { toast.success('Content has been flagged for review. Thank you.'); }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div>
      <Link to={`/category/${post.category_id}`}>&larr; Back to posts</Link>
      
      <article>
        <h1>{post.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <Avatar username={post.profiles.username} />
          <p style={{ margin: 0 }}>by <strong>{post.profiles.username || 'Anonymous'}</strong></p>
        </div>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
        <button className="outline secondary" onClick={() => handleFlag('post', post.id)}>Flag Post</button>
      </article>

      <hr />

      <div className="comments-section" style={{ marginTop: '40px' }}>
        <h3>Comments</h3>
        <form onSubmit={handleCreateComment}>
          <textarea placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
          <button type="submit">Submit Comment</button>
        </form>

        <div className="comments-list" style={{ marginTop: '20px' }}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Avatar username={comment.profiles.username} />
                  <strong>{comment.profiles.username || 'Anonymous'}</strong>
                </div>
                <p style={{ paddingLeft: '50px' }}>{comment.content}</p>
                <div style={{ paddingLeft: '50px' }}>
                  <button className="outline secondary" onClick={() => handleFlag('comment', comment.id)}>Flag Comment</button>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to reply!</p>
          )}
        </div>
      </div>
    </div>
  );
}