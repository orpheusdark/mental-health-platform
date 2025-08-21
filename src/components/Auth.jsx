import { useState } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async (event) => {
    // ... (This function remains the same)
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (error) { toast.error(error.error_description || error.message); }
    setLoading(false);
  };

  const handleSignUp = async (event) => {
    // ... (This function remains the same)
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: email, password: password, options: { data: { username: username } } });
    if (error) { toast.error(error.error_description || error.message); }
    else { toast.success('Sign up successful! Please check your email to verify.'); }
    setLoading(false);
  };

  return (
    <>
      <div className="row flex-center flex">
        <div className="col-6 form-widget">
          <h1 className="header">Mental Health Support Network</h1>
          <p className="description">Sign in or create a new account</p>
          
          {/* Add the disclaimer text here */}
          <p className="description" style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>
            By signing up, you acknowledge this is a peer support community and not a substitute for professional medical care.
          </p>

          <form className="form-widget">
            <div>
              <input type="text" placeholder="Your username (for sign up)" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <input type="email" placeholder="Your email" value={email} required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <input type="password" placeholder="Your password" value={password} required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className={'button block'} disabled={loading} onClick={handleLogin}>Login</button>
              <button className={'button block'} disabled={loading} onClick={handleSignUp}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>In a crisis or need immediate support? <Link to="/emergency">Get Emergency Help</Link></p>
      </div>
    </>
  );
}