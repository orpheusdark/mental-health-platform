import Header from './Header';
import Footer from './Footer';
import EnhancedChatbot from './EnhancedChatbot'; // Import the enhanced Chatbot

export default function Layout({ session, userProfile, children }) {
  return (
    <div>
      <Header session={session} userProfile={userProfile} />
      <main className="container fade-in">
        {children}
      </main>
      <Footer />
      <EnhancedChatbot /> {/* Add the enhanced Chatbot component */}
    </div>
  );
}