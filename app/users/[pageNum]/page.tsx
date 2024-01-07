'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Pagination from '@/app/components/Pagination';

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

export default function UsersPage({ params }: { params: { pageNum: string } }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const pageNum = params.pageNum;

  // get page id from router

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyapi.io/data/v1/user?page=${
            pageNum ? parseInt(pageNum) - 1 : 1
          }`,
          {
            headers: { 'app-id': '6596f3312dcb12a26baf0c7d' },
          }
        );

        setUsers(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);

    fetchSelectedUser(userId);
  };

  const fetchSelectedUser = async (userId: string) => {
    try {
      const response = await axios.get(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          headers: { 'app-id': '6596f3312dcb12a26baf0c7d' },
        }
      );

      const userData: User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        title: response.data.title,
        picture: response.data.picture,
        gender: response.data.gender,

        registerDate: response.data.registerDate,
        updatedDate: response.data.updatedDate,
      };

      setSelectedUser(response.data);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
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
    <div className="flex  bg-gray-100">
      <div className="w-1/2 p-4 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="cursor-pointer border-b py-2 hover:bg-gray-100"
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>

        <div>
          <Pagination
            toplam={total}
            id={parseInt(pageNum) || 1}
            base={'/users'}
          />
        </div>

        <div className="mt-4">
          <Link
            href="/create-user"
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Create User
          </Link>
        </div>
      </div>

      {selectedUser && (
        <div className="w-1/2 p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">
            Selected User Information
          </h2>
          <p>ID: {selectedUser.id}</p>
          <p>Name: {`${selectedUser.firstName} ${selectedUser.lastName}`}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Title: {selectedUser.title}</p>
          <p>Gender: {selectedUser.gender}</p>

          <p>Register Date: {selectedUser.registerDate}</p>
          <p>Updated Date: {selectedUser.updatedDate}</p>
          <img
            src={selectedUser.picture}
            alt="Selected User"
            className="mt-2 w-32 h-32 rounded-full"
          />
        </div>
      )}
    </div>
  );
}
