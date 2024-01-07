'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/app/components/Pagination';

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

const PostsPage = ({ params }: { params: { pageNum: string } }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const pageNum = params.pageNum;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyapi.io/data/v1/post?page=${
            pageNum ? parseInt(pageNum) - 1 : 1
          }`,
          {
            headers: { 'app-id': '6596f3312dcb12a26baf0c7d' },
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
  }, []);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);

    fetchSelectedPost(postId);
  };

  const fetchSelectedPost = async (postId: string) => {
    try {
      const response = await axios.get(
        `https://dummyapi.io/data/v1/post/${postId}`,
        {
          headers: { 'app-id': '6596f3312dcb12a26baf0c7d' },
        }
      );

      setSelectedPost(response.data);
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="flex  bg-gray-100">
        <div className="w-1/2 p-4 bg-white">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/4 p-4 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className={`cursor-pointer border-b py-2 hover:bg-gray-100 ${
                post.id === selectedPostId ? 'bg-gray-200' : ''
              }`}
            >
              {post.text}
            </li>
          ))}
        </ul>

        <div>
          <Pagination
            toplam={total}
            id={parseInt(pageNum) || 1}
            base={'/posts'}
          />
        </div>

        <div className="mt-4">
          <Link
            href="/create-post"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Create Post
          </Link>
        </div>
      </div>

      {selectedPost && (
        <div className="w-3/4 p-4 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-4">{selectedPost.text}</h2>
          <img
            src={selectedPost.image}
            alt={`Post ${selectedPost.id}`}
            className="object-cover w-96 h-96 mt-2 rounded-lg"
          />
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-lg">
              Owner:{' '}
              {`${selectedPost.owner.firstName} ${selectedPost.owner.lastName}`}
            </p>
            <img
              src={selectedPost.owner.picture}
              alt={`Owner ${selectedPost.owner.id}`}
              className="w-20 h-20 rounded-full mt-2"
            />
          </div>
          <p className="mt-4">Link: {selectedPost.link}</p>
          <p>{selectedPost.publishDate}</p>
          <p>Likes: {selectedPost.likes}</p>
          <p>Tags: {selectedPost.tags.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
