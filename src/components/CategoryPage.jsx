import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import './Card.css'; // Import our reusable card styles

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const fetchCategoryData = async () => {
    // ... (This function is unchanged)
    setLoading(true);
    const { data: categoryData } = await supabase.from('forum_categories').select('name').eq('id', id).single();
    setCategory(categoryData);
    const { data: postsData } = await supabase.from('posts').select('*').eq('category_id', id).order('created_at', { ascending: false });
    setPosts(postsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const handleCreatePost = async (event) => {
    // ... (This function is unchanged)
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('posts').insert({ title: postTitle, content: postContent, author_id: user.id, category_id: id });
    if (error) { toast.error(error.message); } else { setPostTitle(''); setPostContent(''); fetchCategoryData(); }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/home">&larr; Back to Dashboard</Link>
      <h1>{category?.name}</h1>

      <article className="card">
        <h3>Create a New Post</h3>
        <form onSubmit={handleCreatePost}>
          <input type="text" placeholder="Post Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} required />
          <textarea placeholder="What's on your mind?" value={postContent} onChange={(e) => setPostContent(e.target.value)} required />
          <button type="submit">Create Post</button>
        </form>
      </article>

      <hr />

      <h2>Posts</h2>
      {posts.length > 0 ? (
        <div className="card-grid">
          {posts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="card">
                <h4>{post.title}</h4>
                {/* We can add a short preview of the content later if we want */}
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p>No posts in this category yet. Be the first!</p>
      )}
    </div>
  );
}