'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

let currentLevel: {
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

const CreatePost = () => {
  const [postData, setPostData] = useState({
    text: '',
    image: '',

    link: '',
    tags: '',
    owner: {
      ownerId: '',
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      picture: '',
    },
  });

  const setNewValue = (id_: string, newValue: string | number) => {
    const newState = { ...postData };

    const keys = id_.split('.');

    let currentLevel = newState;
    for (let i = 0; i < keys.length - 1; i++) {
      currentLevel = currentLevel[keys[i]];
    }

    currentLevel[keys[keys.length - 1]] = newValue;

    setPostData(newState);
  };

  const createPost = async () => {
    try {
      const apiUrl = 'https://dummyapi.io/data/v1/post/create';
      const headers = { 'app-id': '6596f3312dcb12a26baf0c7d' };

      const tagsArray = postData.tags.split(',').map((tag) => tag.trim());

      const postDataWithOwner = {
        ...postData,
        owner: {
          ...postData.owner,
        },
        tags: tagsArray,
      };

      const response = await axios.post(apiUrl, postDataWithOwner, {
        headers,
      });

      alert(`Post created! ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please check the console for details.');
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
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
              placeholder="Owner First Name"
              value={postData.owner.firstName}
              onChange={(evt) =>
                setNewValue('owner.firstName', evt.target.value)
              }
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Owner Last Name"
              value={postData.owner.lastName}
              onChange={(evt) =>
                setNewValue('owner.lastName', evt.target.value)
              }
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Owner Email"
              value={postData.owner.email}
              onChange={(evt) => setNewValue('owner.email', evt.target.value)}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Owner Title"
              value={postData.owner.title}
              onChange={(evt) => setNewValue('owner.title', evt.target.value)}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Owner Picture URL"
              value={postData.owner.picture}
              onChange={(evt) => setNewValue('owner.picture', evt.target.value)}
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
