import Header from './Header';
import Footer from './Footer';
import Chatbot from './Chatbot'; // Re-import the Chatbot

export default function Layout({ session, userProfile, children }) {
  return (
    <div>
      <Header session={session} userProfile={userProfile} />
      <main className="container fade-in">
        {children}
      </main>
      <Footer />
      <Chatbot /> {/* Add the Chatbot component back here */}
    </div>
  );
}