import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import all page and layout components
import Auth from './components/Auth';
import Layout from './components/Layout';
import Account from './components/Account';
import CategoryPage from './components/CategoryPage';
import PostPage from './components/PostPage';
import ResourceDirectory from './components/ResourceDirectory';
import SelfHelp from './components/SelfHelp';
import ModerationPage from './components/ModerationPage';
import EmergencyPage from './components/EmergencyPage';
import LibraryPage from './components/LibraryPage';
import WhatIsAnxiety from './components/articles/WhatIsAnxiety';
import LegalPage from './components/LegalPage';
import LandingPage from './components/LandingPage';

function App() {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchInitialData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session) {
          const { data, error } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
          if (error) throw error;
          setUserProfile(data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="container" aria-busy="true"></div>;
  }

  // A PrivateRoute component to protect routes that require a session
  const PrivateRoute = ({ children }) => {
    return session ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/login" element={!session ? <Auth /> : <Navigate to="/home" />} />
        <Route path="/emergency" element={<EmergencyPage />} />
        <Route path="/legal" element={<LegalPage />} />

        {/* Private App Routes - Wrapped in Layout */}
        <Route
          path="/home"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><Account /></Layout></PrivateRoute>}
        />
        <Route
          path="/library"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><LibraryPage /></Layout></PrivateRoute>}
        />
        <Route
          path="/library/what-is-anxiety"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><WhatIsAnxiety /></Layout></PrivateRoute>}
        />
        <Route
          path="/category/:id"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><CategoryPage /></Layout></PrivateRoute>}
        />
        <Route
          path="/post/:id"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><PostPage /></Layout></PrivateRoute>}
        />
        <Route
          path="/resources"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><ResourceDirectory /></Layout></PrivateRoute>}
        />
        <Route
          path="/self-help"
          element={<PrivateRoute><Layout session={session} userProfile={userProfile}><SelfHelp /></Layout></PrivateRoute>}
        />
        <Route
          path="/moderation"
          element={
            <PrivateRoute>
              {userProfile?.role === 'moderator'
                ? <Layout session={session} userProfile={userProfile}><ModerationPage /></Layout>
                : <Navigate to="/home" />}
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;