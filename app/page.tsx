import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <div className="flex  bg-gray-100 justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">
            Welcome to Next.js Dummy App
          </h1>
          <div className="space-x-4">
            <Link
              href="/users"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Users Page
            </Link>
            <Link
              href="/posts"
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Posts Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
