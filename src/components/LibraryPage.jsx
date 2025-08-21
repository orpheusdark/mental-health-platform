import { Link } from 'react-router-dom';

export default function LibraryPage() {
  const articleLinkStyle = {
    display: 'block',
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: 'inherit'
  };

  return (
    <div>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h1>Content Library</h1>
      <p>A collection of articles and resources to help you on your mental health journey.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h3>Articles</h3>
        <Link to="/library/what-is-anxiety" style={articleLinkStyle}>
          <h4>Understanding Anxiety</h4>
          <p>Learn about the common symptoms of anxiety and when to seek help.</p>
        </Link>
        {/* You can add more article links here as you create them */}
      </div>
    </div>
  );
}