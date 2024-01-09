// Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 h-20 text-2xl flex items-center  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/users" className="text-white">
            Users
          </Link>
          <Link href="/posts" className="text-white">
            Posts
          </Link>
          <Link href="/tags" className="text-white">
            Tags
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
