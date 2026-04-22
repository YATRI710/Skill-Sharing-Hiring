import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ExploreSkills from './pages/ExploreSkills';
import Hire from './pages/Hire';
import ShareSkill from './pages/ShareSkill';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserPreferences from './pages/UserPreferences';
import JobsDashboard from './pages/JobsDashboard';

function AppContent() {
  const { user, preferences, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if (user && !loading) {
      if (!preferences) {
        setCurrentPage('preferences');
      } else {
        setCurrentPage('dashboard');
      }
    }
  }, [user, preferences, loading]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    if (preferences) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('preferences');
    }
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user && currentPage === 'dashboard') {
    return <JobsDashboard />;
  }

  if (user && currentPage === 'preferences') {
    return <UserPreferences onComplete={handlePreferencesComplete} />;
  }

  if (currentPage === 'login') {
    return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentPage === 'register') {
    return <Register onNavigate={handleNavigate} onRegisterSuccess={handleRegisterSuccess} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'about':
        return <About />;
      case 'explore':
        return <ExploreSkills onNavigate={handleNavigate} />;
      case 'hire':
        return <Hire />;
      case 'share':
        return <ShareSkill />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} isAuthenticated={!!user} />
      <main>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
