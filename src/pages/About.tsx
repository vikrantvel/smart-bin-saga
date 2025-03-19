
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Recycle, Truck, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 bg-gradient-to-b from-background to-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                About <span className="eco-text-gradient">Smart Waste</span> Management
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                Revolutionizing waste disposal through innovative technology and community engagement
              </p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">Our Technology Stack</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Combining cutting-edge technologies to create a seamless waste management ecosystem
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* IoT */}
              <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in card-hover">
                <div className="h-16 w-16 mx-auto bg-eco-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <line x1="12" y1="20" x2="12" y2="20" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Internet of Things</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Fill-level sensors in bins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Weight and waste composition analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>QR code and NFC scanning for user identification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Real-time data transmission to cloud</span>
                  </li>
                </ul>
              </div>

              {/* AI */}
              <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in card-hover" style={{ animationDelay: "150ms" }}>
                <div className="h-16 w-16 mx-auto bg-eco-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-2a4 4 0 0 0-4-4h-2a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Artificial Intelligence</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Waste fill rate prediction algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Route optimization for collection trucks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Waste pattern analysis and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Anomaly detection for system maintenance</span>
                  </li>
                </ul>
              </div>

              {/* Blockchain */}
              <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow animate-fade-in card-hover" style={{ animationDelay: "300ms" }}>
                <div className="h-16 w-16 mx-auto bg-eco-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 2H8v5h8V2z" />
                    <path d="M6 12h4" />
                    <path d="M14 12h4" />
                    <path d="M6 16h12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Blockchain Technology</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Secure reward tokens for responsible disposal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Transparent transaction records</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Smart contracts for automated rewards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500">✓</span>
                    <span>Immutable waste management history</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">System Benefits</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Creating a cleaner environment, reducing costs, and engaging communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-8 shadow-sm animate-fade-in">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Recycle className="h-6 w-6 mr-2 text-eco-500" />
                  <span>Environmental Impact</span>
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Reduces carbon emissions by optimizing collection routes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Prevents overflow and improves cleanliness of public spaces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Encourages proper recycling and waste separation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Minimizes landfill usage through efficient waste management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-sm animate-fade-in" style={{ animationDelay: "150ms" }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-eco-500" />
                  <span>Operational Efficiency</span>
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Reduces collection costs by up to 30% through route optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Minimizes unnecessary collections of partially empty bins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Provides real-time monitoring for immediate issue response</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Improves workforce allocation and resource management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <BarChart className="h-6 w-6 mr-2 text-eco-500" />
                  <span>Data Insights</span>
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Generates detailed waste generation patterns by location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Identifies trends to improve long-term waste management strategies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Provides actionable insights for city planning and policy decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Enables data-driven sustainability initiatives</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-sm animate-fade-in" style={{ animationDelay: "450ms" }}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-eco-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Community Engagement</span>
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Incentivizes responsible waste disposal with reward tokens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Fosters community ownership of local cleanliness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Educates users about proper waste management practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-eco-500 font-bold">•</span>
                    <span>Creates a transparent, participatory waste management ecosystem</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-eco-500 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Ready to Join the Future of Waste Management?</h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-white/90">
              Whether you're a resident looking to make a difference or a waste management professional, 
              our system offers tools and benefits for everyone.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-eco-600 hover:bg-white/90">
                Customer Sign Up
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Driver Portal
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
