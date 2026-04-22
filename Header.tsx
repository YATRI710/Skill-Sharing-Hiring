import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
}

export default function Header({ currentPage, onNavigate, isAuthenticated }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'explore', label: 'Explore Skills' },
    { id: 'hire', label: 'Hire/Collaborate' },
    { id: 'share', label: 'Share Your Skill' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">SkillBridge</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'text-teal-600 font-semibold'
                    : 'text-gray-700 hover:text-teal-600'
                } transition-colors duration-200`}
              >
                {item.label}
              </button>
            ))}

            {!isAuthenticated && (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="flex items-center px-4 py-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 ${
                  currentPage === item.id
                    ? 'text-teal-600 font-semibold bg-teal-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {!isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 text-teal-600 font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('register');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 bg-orange-600 text-white font-semibold mx-4 rounded-lg mt-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
