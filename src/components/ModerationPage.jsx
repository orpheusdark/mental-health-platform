import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal'; // Import the new modal

export default function ModerationPage() {
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [flaggedComments, setFlaggedComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // New state to manage the modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
    id: null,
  });

  const fetchFlaggedContent = async () => {
    // ... (This function is unchanged)
    setLoading(true);
    const { data: postsData } = await supabase.from('posts').select('*').eq('is_flagged_for_review', true);
    setFlaggedPosts(postsData || []);
    const { data: commentsData } = await supabase.from('comments').select('*').eq('is_flagged_for_review', true);
    setFlaggedComments(commentsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlaggedContent();
  }, []);

  const handleApprove = async (type, id) => {
    const tableName = type === 'post' ? 'posts' : 'comments';
    const { error } = await supabase.from(tableName).update({ is_flagged_for_review: false }).eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Content approved.'); fetchFlaggedContent(); }
  };

  // This function now just OPENS the modal
  const handleDeleteClick = (type, id) => {
    setModalState({ isOpen: true, type, id });
  };

  // This function performs the actual deletion after confirmation
  const confirmDelete = async () => {
    const { type, id } = modalState;
    const tableName = type === 'post' ? 'posts' : 'comments';
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Content deleted.');
      fetchFlaggedContent();
    }
    // Close the modal
    setModalState({ isOpen: false, type: null, id: null });
  };

  if (loading) return <p>Loading moderation queue...</p>;

  return (
    <>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null, id: null })}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to permanently delete this content? This action cannot be undone."
      />

      <div>
        <h1>Moderation Queue</h1>
        <h2>Flagged Posts</h2>
        {flaggedPosts.length > 0 ? flaggedPosts.map(post => (
          <article key={post.id}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <footer>
              <button onClick={() => handleApprove('post', post.id)}>Approve</button>
              <button className="secondary" onClick={() => handleDeleteClick('post', post.id)}>Delete</button>
            </footer>
          </article>
        )) : <p>No posts to review.</p>}

        <hr/>
        <h2>Flagged Comments</h2>
        {flaggedComments.length > 0 ? flaggedComments.map(comment => (
          <article key={comment.id}>
            <p>{comment.content}</p>
            <footer>
              <button onClick={() => handleApprove('comment', comment.id)}>Approve</button>
              <button className="secondary" onClick={() => handleDeleteClick('comment', comment.id)}>Delete</button>
            </footer>
          </article>
        )) : <p>No comments to review.</p>}
      </div>
    </>
  );
}