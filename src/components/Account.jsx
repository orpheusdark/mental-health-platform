import Dashboard from './Dashboard';
import EnhancedForumList from './EnhancedForumList';

export default function Account({ session, userProfile }) {
  // This component is now very clean!
  // It just shows the main content for the home page.
  return (
    <div>
      <Dashboard session={session} userProfile={userProfile} />
      <EnhancedForumList />
    </div>
  );
}