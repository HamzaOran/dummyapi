'use client';

import React, { useState } from 'react';
import axios from 'axios';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
  gender: string;
};

export default function Home() {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    picture: '',
    gender: '',
  });

  const urlDummyPost = `https://dummyapi.io/data/v1/user/create`;
  const header_ = { 'app-id': '6596f3312dcb12a26baf0c7d' };

  const setNewValue = (
    id_: string,
    newValue: string | Record<string, string>
  ) => setUser((prevState) => ({ ...prevState, [id_]: newValue }));

  const createAnUser = async () => {
    try {
      const headers_ = { headers: header_ };
      const response = await axios.post(urlDummyPost, user, headers_);
      alert(`The response is: ${response.data.id}`);
    } catch (exception_) {
      alert(`There was an error: ${JSON.stringify(exception_.response.data)}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <ul className="list-none mb-4">
          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="First Name"
              value={user.firstName}
              onChange={(evt) => {
                setNewValue('firstName', evt.target.value);
              }}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Last Name"
              value={user.lastName}
              onChange={(evt) => {
                setNewValue('lastName', evt.target.value);
              }}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Email"
              value={user.email}
              onChange={(evt) => {
                setNewValue('email', evt.target.value);
              }}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Title (mr/ms, mrs)"
              value={user.title}
              onChange={(evt) => {
                setNewValue('title', evt.target.value);
              }}
            />
          </li>

          <li>
            <input
              className="border border-black p-3 rounded w-full"
              placeholder="Picture URL"
              value={user.picture}
              onChange={(evt) => {
                setNewValue('picture', evt.target.value);
              }}
            />
          </li>

          <li>
            <select
              className="border border-black p-3 rounded w-full"
              value={user.gender}
              onChange={(evt) => {
                setNewValue('gender', evt.target.value);
              }}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </li>
        </ul>

        <button
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
          onClick={() => {
            createAnUser();
          }}
        >
          Send to the API
        </button>
      </div>
    </div>
  );
}
