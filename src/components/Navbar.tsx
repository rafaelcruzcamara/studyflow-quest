
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Perfil', path: '/profile' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold text-primary animate-fade-in"
        >
          StudyFlow
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li 
                key={link.path}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link 
                  to={link.path} 
                  className={`subtle-underline px-1 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-primary after:w-full' 
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button 
                asChild 
                variant="default" 
                size="sm" 
                className="bg-primary font-medium shadow-sm hover:shadow-md transition-all"
              >
                <Link to="/dashboard">Começar</Link>
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        <nav className="container px-4 py-5">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`block px-2 py-2 text-base font-medium ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-foreground/80'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Button 
                asChild 
                variant="default" 
                size="default" 
                className="w-full bg-primary font-medium"
              >
                <Link to="/dashboard">Começar</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
