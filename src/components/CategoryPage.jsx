import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function CategoryPage() {
  const { id } = useParams(); // Gets the 'id' from the URL
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the new post form
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  // Reusable function to fetch all data for the page
  const fetchCategoryData = async () => {
    setLoading(true);
    
    // Fetch category details
    const { data: categoryData, error: categoryError } = await supabase
      .from('forum_categories').select('name').eq('id', id).single();
    if (categoryError) console.error('Error fetching category details:', categoryError);
    else setCategory(categoryData);

    // Fetch posts for the category, newest first
    const { data: postsData, error: postsError } = await supabase
      .from('posts').select('*').eq('category_id', id).order('created_at', { ascending: false });
    if (postsError) console.error('Error fetching posts:', postsError);
    else setPosts(postsData);

    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]); // Rerun this effect if the ID in the URL changes

  const handleCreatePost = async (event) => {
    event.preventDefault();

    // Get the current user's ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    // Insert the new post into the database
    const { error } = await supabase.from('posts').insert({
      title: postTitle,
      content: postContent,
      author_id: user.id,
      category_id: id
    });

    if (error) {
      alert(error.message);
    } else {
      // Clear the form and refresh the posts list
      setPostTitle('');
      setPostContent('');
      fetchCategoryData(); // Reload posts to show the new one
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">&larr; Back to Forums</Link>
      <h1>{category?.name}</h1>

      {/* Create Post Form */}
      <div className="form-widget" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Create a New Post</h3>
        <form onSubmit={handleCreatePost}>
          <input
            className="inputField"
            type="text"
            placeholder="Post Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
          <textarea
            className="inputField"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            required
          />
          <button type="submit" className="button block">Create Post</button>
        </form>
      </div>

      <hr />

      {/* List of Posts */}
      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(post => (
              <li key={post.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h4>{post.title}</h4>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts in this category yet. Be the first!</p>
        )}
      </div>
    </div>
  );
}