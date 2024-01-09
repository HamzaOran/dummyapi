'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Pagination from './Pagination';

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

export default function UsersPageComponent({ pageNum }: { pageNum: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://dummyapi.io/data/v1/user?page=${
            pageNum ? parseInt(pageNum) - 1 : 0
          }&limit=10`,
          {
            headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
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
  }, [pageNum]);

  const handleUserClick = (userId: string) => {
    router.push(`/userdetail/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  bg-white">
      <div className="w-full max-w-4xl p-4 bg-gray-100 shadow-lg rounded-md">
        <h2 className="text-3xl flex justify-center font-semibold mb-4">
          Users
        </h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="cursor-pointer border-b py-3 hover:bg-gray-300 transition-all duration-300"
            >
              <div className="flex items-center">
                <img
                  src={user.picture}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Pagination
            toplam={total}
            id={parseInt(pageNum) || 1}
            base={'/users'}
            eleman={10}
          />
        </div>

        <div className="mt-8">
          <Link
            href="/create-user"
            className="bg-blue-500 text-white px-4 py-2 flex justify-center rounded cursor-pointer"
          >
            Create User
          </Link>
        </div>
      </div>
    </div>
  );
}
