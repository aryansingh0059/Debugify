import React, { useState, useEffect, lazy, Suspense } from 'react';
import SharedLayout from './components/SharedLayout';
import ProfileModal from './components/ProfileModal';
import SettingsModal from './components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Lazy Loaded Pages ──────────────────────────────────────────────────────
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ReviewPage = lazy(() => import('./pages/ReviewPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

/**
 * Premium Loading Fallback for Suspense.
 */
const LuxuryLoading = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#050714] z-[999]">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-2 border-indigo-500/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-t-2 border-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      />
      <div className="absolute inset-0 flex items-center justify-center text-xl">⚡</div>
    </div>
  </div>
);

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
            onHowItWorks={() => navigateTo('docs')}
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
        <Suspense fallback={<LuxuryLoading />}>
          {renderPage()}
        </Suspense>
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
