
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', section: 'home' },
  { name: 'About', path: '/about', section: 'about' },
  { name: 'Bin Attenders', path: '/bin-attenders', section: 'binAttenders' },
  { name: 'Customers', path: '/customers', section: 'customers' },
  { name: 'Customer Care', path: '/customer-care', section: 'customerCare' },
];

interface NavbarProps {
  onNavClick?: (section: string) => void;
  activeSection?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const handleNavItemClick = (itemName: string, itemSection?: string) => {
    setActiveItem(itemName);
    
    // If we're on the home page and have a section to scroll to
    if (onNavClick && itemSection) {
      onNavClick(itemSection);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold eco-text-gradient">EcoWaste</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-item ${activeItem === item.name || (activeSection === item.section) ? 'active' : ''}`}
                  onClick={() => handleNavItemClick(item.name, item.section)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="ml-6">
              <Button variant="default" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium 
                  ${activeItem === item.name || (activeSection === item.section) ? 'text-primary bg-primary/10' : 'text-foreground hover:bg-secondary'}`}
                onClick={() => {
                  handleNavItemClick(item.name, item.section);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button variant="default" className="w-full" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
