'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export type Post = {
  text: string;
  image: string;
  link: string;
  tags: string;
  owner: {
    ownerId: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    picture: string;
  };
};

const CreatePost = ({ params }: { params: { userId: string } }) => {
  const [postData, setPostData] = useState({
    text: '',
    image: '',
    likes: 0,
    tags: '',
    owner: params.userId,
  });

  const router = useRouter();
  const setNewValue = (id_: string, newValue: string | number) => {
    const newState = { ...postData };

    const keys = id_.split('.');

    let currentLevel = newState;
    for (let i = 0; i < keys.length - 1; i++) {
      // @ts-ignore
      currentLevel = currentLevel[keys[i]];
    }

    // @ts-ignore
    currentLevel[keys[keys.length - 1]] = newValue;

    setPostData(newState);
  };

  const createPost = async () => {
    try {
      const apiUrl = 'https://dummyapi.io/data/v1/post/create';
      const headers = { 'app-id': process.env.NEXT_PUBLIC_API_KEY };

      const tagsArray = postData.tags.split(',').map((tag) => tag.trim());

      const postDataWithOwner = {
        ...postData,
        tags: tagsArray,
      };

      const response = await axios.post(apiUrl, postDataWithOwner, {
        headers,
      });

      alert(`Post created! ID: ${response.data.id}`);
      router.push(`/postdetail/${response.data.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please check the console for details.');
    }
  };

  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="bg-gray-100 p-8 rounded shadow-lg w-96">
        <ul className="list-none mb-4">
          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Post Text"
              value={postData.text}
              onChange={(evt) => setNewValue('text', evt.target.value)}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Image URL"
              value={postData.image}
              onChange={(evt) => setNewValue('image', evt.target.value)}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Likes"
              value={postData.likes}
              onChange={(evt) => setNewValue('likes', evt.target.value)}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Tags (comma-separated)"
              value={postData.tags}
              onChange={(evt) => setNewValue('tags', evt.target.value)}
            />
          </li>
        </ul>

        <button
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
          onClick={() => createPost()}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
