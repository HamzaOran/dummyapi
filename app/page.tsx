import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 justify-center items-center my-20 h-96">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          Welcome to Next.js Dummy App
        </h1>
        <div className="space-y-4 md:space-y-0 md:space-x-10">
          <Link
            href="/users"
            className="bg-blue-500 text-white text-3xl px-6 py-2 md:px-10 md:py-2 rounded cursor-pointer block md:inline-block"
          >
            Users
          </Link>
          <Link
            href="/posts"
            className="bg-green-500 text-white text-3xl px-6 py-2 md:px-10 md:py-2 rounded cursor-pointer block md:inline-block"
          >
            Posts
          </Link>
          <Link
            href="/tags"
            className="bg-purple-500 text-white text-3xl px-6 py-2 md:px-10 md:py-2 rounded cursor-pointer block md:inline-block"
          >
            Tags
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
