'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/app/components/Pagination';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export type Post = {
  id: string;
  text: string;
  image: string;
  likes: number;
  link: string;
  publishDate: string;
  tags: string[];
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    picture: string;
  };
};

export default function PostsPageComponent({
  pageNum,
  tagId,
}: {
  pageNum: string;
  tagId?: string;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const isImageValid = (imgUrl: string) => {
    const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;
    const isValidImageUrl = imageUrlRegex.test(imgUrl);

    return isValidImageUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const apiString = tagId ? `tag/${tagId}/post` : 'post';

        const response = await axios.get(
          `https://dummyapi.io/data/v1/${apiString}?page=${
            pageNum ? parseInt(pageNum) - 1 : 0
          }&limit=10`,
          {
            headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
          }
        );

        setPosts(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-white h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center bg-white h-screen">
        <div className="text-2xl font-semibold">
          {tagId
            ? `There is no post with tag ${tagId}`
            : `There is no post, please try again...`}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-white min-h-screen">
      <div className="w-full md:max-w-4xl p-4 bg-gray-100 shadow-lg rounded-md">
        <h2 className="text-3xl text-center font-semibold mb-4">Posts</h2>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className={`border-b py-2 md:py-4 transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row items-center md:justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  {isImageValid(post.owner.picture) && (
                    <img
                      src={post.owner.picture}
                      alt={`Owner ${post.owner.id}`}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  )}
                  <div>
                    <Link
                      href={`/postdetail/${post.id}`}
                      className="text-lg font-semibold hover:underline"
                    >
                      {post.text}
                    </Link>
                    <div className="flex space-x-2 mt-1">
                      {post.tags.map(
                        (tag) =>
                          tag && (
                            <Link
                              key={tag}
                              href={`/tagdetail/${tag}`}
                              className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs md:text-sm"
                            >
                              {tag}
                            </Link>
                          )
                      )}
                    </div>
                  </div>
                </div>
                {isImageValid(post.image) && (
                  <img
                    src={post.image}
                    alt={`Post ${post.id}`}
                    className="w-full md:w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Pagination
            toplam={total}
            id={parseInt(pageNum) || 1}
            base={'/posts'}
            eleman={10}
          />
        </div>
      </div>
    </div>
  );
}
