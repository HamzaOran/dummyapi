'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export type Tag = {
  tags: string[];
};

export default function TagsPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyapi.io/data/v1/tag`, {
          headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
        });

        setTags(response.data.data || []);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching tags:`, error);
      }
    };

    fetchData();
  }, []);

  const filteredTags = tags
    ? tags
        .filter(
          (tag) => tag?.trim() && !tag?.includes('[') && !tag?.includes('#')
        )
        .filter((tag) => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-white h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-4xl p-8 bg-gray-200 shadow-lg rounded-md">
        <h2 className="text-3xl text-center font-semibold mb-6">Tags List</h2>

        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full sm:w-64"
          />
        </div>

        <ul>
          {filteredTags.map((tag, index) => (
            <li
              key={index}
              className="cursor-pointer border-slate-400 py-3 hover:bg-gray-400 transition-all duration-300"
            >
              <Link href={`/tagdetail/${tag.trim()}`}>
                <p className="text-lg font-semibold ">{tag}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
