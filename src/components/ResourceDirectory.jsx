import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Card.css'; // Import the new reusable card styles

export default function ResourceDirectory() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching resources:', error);
      } else {
        setResources(data);
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  if (loading) {
    return <p>Loading resources...</p>;
  }

  return (
    <div>
      <Link to="/home">&larr; Back to Dashboard</Link>
      <h1>Resource Directory</h1>
      <p>A list of verified mental health professionals and organizations.</p>
      
      {/* Apply the new grid layout */}
      <div className="card-grid">
        {resources.map(resource => (
          // Apply the new card style
          <article key={resource.id} className="card">
            <h3>{resource.name}</h3>
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Specialization:</strong> {resource.specialization}</p>
            <p><strong>Location:</strong> {resource.location_city}</p>
            <p><strong>Contact:</strong> {resource.contact_info}</p>
            <p>{resource.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}