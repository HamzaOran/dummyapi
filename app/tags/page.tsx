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
      <div className="max-w-4xl p-4 bg-gray-100 shadow-lg rounded-md">
        <h2 className="text-3xl flex justify-center font-semibold mb-4">
          Tags List
        </h2>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded"
        />

        <ul>
          {filteredTags.map((tag, index) => (
            <li
              key={index}
              className="cursor-pointer border-b py-2 hover:bg-gray-300 transition-all duration-300"
            >
              <Link href={`/tagdetail/${tag.trim()}`}>
                <p className="text-lg font-semibold">{tag}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
