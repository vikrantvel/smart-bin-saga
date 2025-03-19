
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-bold text-2xl eco-text-gradient">EcoWaste</Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Smart waste management solutions powered by AI, IoT, and blockchain technology, 
              helping cities become cleaner and more sustainable.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary text-sm">About</Link></li>
              <li><Link to="/bin-attenders" className="text-muted-foreground hover:text-primary text-sm">Bin Attenders</Link></li>
              <li><Link to="/customers" className="text-muted-foreground hover:text-primary text-sm">Customers</Link></li>
              <li><Link to="/customer-care" className="text-muted-foreground hover:text-primary text-sm">Customer Care</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-muted-foreground text-sm">info@ecowaste.com</li>
              <li className="text-muted-foreground text-sm">+1 (555) 123-4567</li>
              <li className="text-muted-foreground text-sm">123 Green Street, Eco City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} EcoWaste. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
