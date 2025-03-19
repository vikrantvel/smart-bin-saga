
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeadsetIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomerCare = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <HeadsetIcon className="h-20 w-20 mx-auto text-muted-foreground/40 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Customer Care</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This section is currently under development. Our customer support team will be available soon to assist you with any questions or concerns.
          </p>
          <Button variant="outline" asChild>
            <a href="mailto:support@ecowaste.com">Contact via Email</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerCare;
