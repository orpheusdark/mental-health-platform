import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ResourceDirectory() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      // The RLS policy ensures we only get verified resources
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
      <Link to="/">&larr; Back to Forums</Link>
      <h1>Resource Directory</h1>
      <p>A list of verified mental health professionals and organizations.</p>
      
      <div className="resource-list">
        {resources.map(resource => (
          <div key={resource.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
            <h3>{resource.name}</h3>
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Specialization:</strong> {resource.specialization}</p>
            <p><strong>Location:</strong> {resource.location_city}</p>
            <p><strong>Contact:</strong> {resource.contact_info}</p>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}