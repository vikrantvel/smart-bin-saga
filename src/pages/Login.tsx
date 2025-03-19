
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  const handleCustomerLogin = () => {
    navigate('/customers');
  };

  const handleDriverLogin = () => {
    navigate('/bin-attenders');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-b from-background to-secondary/30">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">
              <span className="eco-text-gradient">Login</span> to EcoWaste
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your account type to access your personalized dashboard
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Customer Login Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <User className="w-12 h-12 mx-auto text-eco-500 mb-2" />
                <CardTitle>Customer Login</CardTitle>
                <CardDescription>
                  For residents and community members who dispose waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Track your waste disposal history</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Earn and redeem reward points</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Access QR code scanning for waste bins</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={handleCustomerLogin}>
                    Customer Login
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    New user?{" "}
                    <Link to="#" className="text-primary hover:underline">
                      Create an account
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Driver Login Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Truck className="w-12 h-12 mx-auto text-eco-500 mb-2" />
                <CardTitle>Bin Attender Login</CardTitle>
                <CardDescription>
                  For waste collection drivers and operators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>View optimized collection routes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Monitor real-time bin fill levels</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-eco-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Track collection performance metrics</span>
                    </li>
                  </ul>
                  <Button className="w-full" onClick={handleDriverLogin}>
                    Bin Attender Login
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Need help?{" "}
                    <Link to="#" className="text-primary hover:underline">
                      Contact support
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
