
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Truck, User, HeadsetIcon, Info, Recycle } from 'lucide-react';

const HomeSection = () => (
  <section className="relative bg-gradient-to-b from-background to-secondary/30 py-20 sm:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Smart Waste <span className="eco-text-gradient">Management</span> System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Revolutionizing waste disposal with IoT, AI, and blockchain technologies. 
            Creating cleaner cities, one smart bin at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="bg-eco-500 hover:bg-eco-600" asChild>
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="aspect-video bg-card rounded-lg shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Smart Waste Management" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-16 sm:py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          <span className="eco-text-gradient">About</span> Our System
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn how we're using cutting-edge technology to transform waste management
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
          <div className="h-12 w-12 bg-eco-100 rounded-md flex items-center justify-center mb-4">
            <Recycle className="h-6 w-6 text-eco-600" />
          </div>
          <h3 className="text-xl font-semibold">IoT Integration</h3>
          <p className="mt-2 text-muted-foreground">
            Smart sensors in bins monitor fill levels, temperature, and waste composition in real-time.
          </p>
        </div>
        
        <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
          <div className="h-12 w-12 bg-eco-100 rounded-md flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold">AI & Machine Learning</h3>
          <p className="mt-2 text-muted-foreground">
            Algorithms predict fill rates, optimize collection routes, and identify waste patterns.
          </p>
        </div>
        
        <div className="bg-card shadow-sm rounded-lg p-6 card-hover">
          <div className="h-12 w-12 bg-eco-100 rounded-md flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 2H8v5h8V2z" />
              <path d="M6 12h4" />
              <path d="M14 12h4" />
              <path d="M6 16h12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Blockchain Rewards</h3>
          <p className="mt-2 text-muted-foreground">
            Secure, transparent token-based system rewards responsible waste disposal and recycling.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button asChild>
          <Link to="/about">
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

const BinAttendersSection = () => (
  <section id="bin-attenders" className="py-16 sm:py-24 bg-secondary/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="eco-text-gradient">Bin Attenders</span> Portal
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Efficient route management and real-time bin monitoring for our dedicated waste collection team.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
              <span className="ml-3 text-muted-foreground">Real-time bin status monitoring</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
              <span className="ml-3 text-muted-foreground">Optimized collection routes</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
              <span className="ml-3 text-muted-foreground">Mobile notifications and updates</span>
            </li>
          </ul>
          <div className="mt-8">
            <Button asChild>
              <Link to="/bin-attenders">
                Driver Login <Truck className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              className="w-full h-auto" 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
              alt="Waste Management Driver" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CustomersSection = () => (
  <section id="customers" className="py-16 sm:py-24 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 md:order-2">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="eco-text-gradient">Customer</span> Benefits
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Join our eco-conscious community and be rewarded for responsible waste management.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
              <span className="ml-3 text-muted-foreground">Earn rewards for proper waste disposal</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
              <span className="ml-3 text-muted-foreground">Track your environmental impact</span>
            </li>
            <li className="flex">
              <span className="flex-shrink-0 h-6 w-6 bg-eco-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
              <span className="ml-3 text-muted-foreground">Access exclusive sustainability tips</span>
            </li>
          </ul>
          <div className="mt-8">
            <Button asChild>
              <Link to="/customers">
                Customer Login <User className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2 md:order-1">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              className="w-full h-auto" 
              src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Person using smartphone for waste management" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CustomerCareSection = () => (
  <section id="customer-care" className="py-16 sm:py-24 bg-secondary/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <HeadsetIcon className="mx-auto h-16 w-16 text-eco-500 mb-4" />
      <h2 className="text-3xl font-bold sm:text-4xl">
        <span className="eco-text-gradient">Customer Care</span>
      </h2>
      <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
        Our customer care section is coming soon with helpful resources and support.
      </p>
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link to="/customer-care">
            Coming Soon
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HomeSection />
        <AboutSection />
        <BinAttendersSection />
        <CustomersSection />
        <CustomerCareSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
