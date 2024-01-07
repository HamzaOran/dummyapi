// Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/users" className="text-white">
            Users
          </Link>
          <Link href="/posts" className="text-white">
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
