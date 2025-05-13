import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-neutral-dark text-white text-center p-4">
        © {new Date().getFullYear()} AuthorityGPT. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
