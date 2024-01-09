'use client';

import React, { useState } from 'react';
import axios from 'axios';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  picture: string;
  gender: string;
  registerDate: string;
  updatedDate: string;
};

export default function CreateUser() {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    picture: '',
    gender: '',
    id: '',
    registerDate: '',
    updatedDate: '',
  });

  const urlDummyPost = `https://dummyapi.io/data/v1/user/create`;
  const header_ = { 'app-id': process.env.NEXT_PUBLIC_API_KEY };

  const setNewValue = (
    id_: string,
    newValue: string | Record<string, string>
  ) => setUser((prevState) => ({ ...prevState, [id_]: newValue }));

  const createAnUser = async () => {
    try {
      const headers_ = { headers: header_ };
      const response = await axios.post(urlDummyPost, user, headers_);
      alert(`The response is: ${response.data.id}`);
    } catch (exception_: any) {
      alert(`There was an error: ${JSON.stringify(exception_.response.data)}`);
    }
  };

  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="bg-gray-100 p-8 rounded shadow-lg w-96">
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
          Create User
        </button>
      </div>
    </div>
  );
}
