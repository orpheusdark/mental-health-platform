import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast'; // We'll use toasts for feedback

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  const fetchData = async () => {
    // ... (This function remains the same, no changes needed here)
    setLoading(true);
    const { data: postData, error: postError } = await supabase.from('posts').select(`*, profiles ( username )`).eq('id', id).single();
    if (postError) console.error('Error fetching post:', postError); else setPost(postData);
    const { data: commentsData, error: commentsError } = await supabase.from('comments').select(`*, profiles ( username )`).eq('post_id', id).order('created_at', { ascending: true });
    if (commentsError) console.error('Error fetching comments:', commentsError); else setComments(commentsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateComment = async (event) => {
    // ... (This function remains the same, no changes needed here)
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('comments').insert({ content: newComment, author_id: user.id, post_id: id });
    if (error) { toast.error(error.message); } else { setNewComment(''); fetchData(); }
  };

  // NEW FUNCTION: Handles flagging a post or comment
  const handleFlag = async (type, contentId) => {
    const tableName = type === 'post' ? 'posts' : 'comments';
    const { error } = await supabase
      .from(tableName)
      .update({ is_flagged_for_review: true })
      .eq('id', contentId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Content has been flagged for review. Thank you.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <div>
      <Link to={`/category/${post.category_id}`}>&larr; Back to posts</Link>
      
      {/* Post Content */}
      <article>
        <h1>{post.title}</h1>
        <p>by <strong>{post.profiles.username || 'Anonymous'}</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
        <button className="outline secondary" onClick={() => handleFlag('post', post.id)}>Flag Post</button>
      </article>

      <hr />

      {/* Comments Section */}
      <div className="comments-section" style={{ marginTop: '40px' }}>
        <h3>Comments</h3>
        <form onSubmit={handleCreateComment}>
          <textarea placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} required />
          <button type="submit">Submit Comment</button>
        </form>
        <div className="comments-list" style={{ marginTop: '20px' }}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '10px' }}>
                <p>{comment.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <small>by <strong>{comment.profiles.username || 'Anonymous'}</strong></small>
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