import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function SelfHelp() {
  const [loading, setLoading] = useState(true);
  const [pastEntries, setPastEntries] = useState([]);

  // State for the new entry form
  const [mood, setMood] = useState(3); // Default mood to a neutral 3
  const [journal, setJournal] = useState('');

  // Function to fetch past entries
  const fetchEntries = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    // The RLS policy ensures we only get the entries for the logged-in user
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('entry_date', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setPastEntries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from('mood_entries').insert({
      mood_rating: mood,
      journal_entry: journal,
      user_id: user.id
    });

    if (error) {
      alert(error.message);
    } else {
      setJournal('');
      setMood(3);
      fetchEntries(); // Refresh the list
    }
  };

  return (
    <div>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h1>My Mood & Journal</h1>
      <p>This page is private and only visible to you.</p>

      {/* New Entry Form */}
      <div className="form-widget" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Today's Entry</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="mood">How are you feeling today? (1=Low, 5=Great)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{mood}</span>
              <input
                type="range"
                id="mood"
                min="1"
                max="5"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
              />
            </div>
          </div>
          <textarea
            className="inputField"
            placeholder="What's on your mind today?"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <button type="submit" className="button block">Save Entry</button>
        </form>
      </div>
      <hr />

      {/* Past Entries List */}
      <h2>Past Entries</h2>
      {loading ? <p>Loading entries...</p> : (
        pastEntries.length > 0 ? (
          pastEntries.map(entry => (
            <div key={entry.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <p><strong>Date:</strong> {new Date(entry.entry_date).toLocaleDateString()}</p>
              <p><strong>Mood:</strong> {entry.mood_rating} / 5</p>
              <p>{entry.journal_entry}</p>
            </div>
          ))
        ) : (
          <p>You have no journal entries yet.</p>
        )
      )}
    </div>
  );
}