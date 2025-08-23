import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Card.css'; // Import our reusable card styles

export default function SelfHelp() {
  const [loading, setLoading] = useState(true);
  const [pastEntries, setPastEntries] = useState([]);
  const [mood, setMood] = useState(3);
  const [journal, setJournal] = useState('');

  const fetchEntries = async () => {
    // ... (This function is unchanged)
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from('mood_entries').select('*').eq('user_id', user.id).order('entry_date', { ascending: false });
    setPastEntries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (event) => {
    // ... (This function is unchanged)
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('mood_entries').insert({ mood_rating: mood, journal_entry: journal, user_id: user.id });
    if (error) { alert(error.message); } else { setJournal(''); setMood(3); fetchEntries(); }
  };

  return (
    <div>
      <Link to="/home">&larr; Back to Dashboard</Link>
      <h1>My Mood & Journal</h1>
      <p>This page is private and only visible to you.</p>

      <article className="card">
        <h3>Today's Entry</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="mood">How are you feeling today? (1=Low, 5=Great)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0' }}>
            <span>{mood}</span>
            <input type="range" id="mood" min="1" max="5" value={mood} onChange={(e) => setMood(e.target.value)} />
          </div>
          <textarea placeholder="What's on your mind today?" value={journal} onChange={(e) => setJournal(e.target.value)} />
          <button type="submit">Save Entry</button>
        </form>
      </article>

      <hr />

      <h2>Past Entries</h2>
      {loading ? <p>Loading entries...</p> : (
        pastEntries.length > 0 ? (
          <div className="card-grid">
            {pastEntries.map(entry => (
              <article key={entry.id} className="card">
                <p><strong>Date:</strong> {new Date(entry.entry_date).toLocaleDateString()}</p>
                <p><strong>Mood:</strong> {entry.mood_rating} / 5</p>
                {entry.journal_entry && <p>{entry.journal_entry}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p>You have no journal entries yet.</p>
        )
      )}
    </div>
  );
}