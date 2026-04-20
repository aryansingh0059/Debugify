import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ReviewPage from './pages/ReviewPage';
import FeaturesPage from './pages/FeaturesPage';
import DocsPage from './pages/DocsPage';
import BlogPage from './pages/BlogPage';
import SharedLayout from './components/SharedLayout';
import ProfileModal from './components/ProfileModal';
import SettingsModal from './components/SettingsModal';
import { AnimatePresence } from 'framer-motion';

/**
 * Main Application Layout for Debugify.
 * Handles state-based routing between Landing, Auth, Review, and Content pages.
 */
const App = () => {
  const [page, setPage] = useState('auth'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'settings' | null
  
  const [code, setCode] = useState('// Paste your code here...\n\nfunction example() {\n  return "Happy coding!";\n}');
  const [language, setLanguage] = useState('javascript');

  // ─── Clear any saved session on fresh page load ───────────────────────────
  useEffect(() => {
    localStorage.removeItem('debugify_token');
    setPage('auth');
  }, []);

  const navigateTo = (destination) => {
    if (destination === 'profile' || destination === 'settings') {
      setActiveModal(destination);
    } else {
      setPage(destination);
      window.scrollTo(0, 0);
    }
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    setPage('landing');
  };

  const handleLogout = () => {
    localStorage.removeItem('debugify_token');
    setCurrentUser(null);
    setPage('auth');
  };

  const renderPage = () => {
    switch (page) {
      case 'landing':
        return (
          <LandingPage 
            onGetStarted={() => navigateTo(currentUser ? 'review' : 'auth')} 
            onLogin={() => navigateTo('auth')}
            user={currentUser}
          />
        );
      case 'auth':
        return (
          <AuthPage 
            onAuthSuccess={handleAuthSuccess}
            onBackToLanding={() => navigateTo('landing')}
          />
        );
      case 'review':
        return (
          <ReviewPage 
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onBackToLanding={() => navigateTo('landing')}
          />
        );
      case 'features':
        return <FeaturesPage />;
      case 'docs':
        return <DocsPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <LandingPage onGetStarted={() => navigateTo(currentUser ? 'review' : 'auth')} onLogin={() => navigateTo('auth')} user={currentUser} />;
    }
  };

  return (
    <>
      <SharedLayout 
        onNavigate={navigateTo} 
        currentPage={page} 
        user={currentUser}
        onLogout={handleLogout}
      >
        {renderPage()}
      </SharedLayout>

      {/* Profile & Settings Modals */}
      <AnimatePresence>
        {activeModal === 'profile' && (
          <ProfileModal 
            user={currentUser} 
            onClose={() => setActiveModal(null)}
            onSave={(updated) => setCurrentUser({...currentUser, ...updated})}
          />
        )}
        {activeModal === 'settings' && (
          <SettingsModal 
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
