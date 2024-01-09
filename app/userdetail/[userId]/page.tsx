'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { User } from '@/app/create-user/page';

interface UserDetailsPageProps {
  params: { userId: string };
}

const UserDetailsPage = ({ params }: UserDetailsPageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = params.userId;

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://dummyapi.io/data/v1/user/${userId}`,
            {
              headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
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

          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateClick = async () => {
    try {
      await axios.put(`https://dummyapi.io/data/v1/user/${user?.id}`, user, {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      });
      alert(`User with ID ${user?.id} updated successfully`);
      setIsEditMode(false);
    } catch (error) {
      console.error(`Error updating user with ID ${user?.id}:`, error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`https://dummyapi.io/data/v1/user/${user?.id}`, {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      });
      alert(`User with ID ${user?.id} deleted successfully`);

      router.push('/users');
    } catch (error) {
      console.error(`Error deleting user with ID ${user?.id}:`, error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-3xl text-center font-semibold mb-6">User Details</h2>
      {user ? (
        <>
          <p className="mb-2 text-lg font-bold">ID: {userId}</p>
          {!isEditMode ? (
            <div className="text-lg font-bold">
              <p>Name : {`${user.firstName} ${user.lastName}`}</p>
              <p>Email : {user.email}</p>
              <p>Title : {user.title}</p>
              <p>Gender : {user.gender}</p>
              <p>Register Date : {user.registerDate}</p>
              <p>Updated Date : {user.updatedDate}</p>
              <img
                src={user.picture}
                alt="User"
                className="mt-4 w-32 h-32 rounded-full mx-auto"
              />
            </div>
          ) : (
            <>
              <label className="block">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>
              <label className="block">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>
              <label className="block">
                Email:
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>
              <label className="block">
                Title:
                <input
                  type="text"
                  name="title"
                  value={user.title}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>
              <label className="block">
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>
            </>
          )}

          <div className="mt-4 flex items-center justify-center">
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-indigo-400 text-white px-4 py-2 rounded cursor-pointer mr-2"
              >
                Edit
              </button>
            )}
            {isEditMode && (
              <button
                onClick={handleUpdateClick}
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer mr-2"
              >
                Save
              </button>
            )}
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mr-2"
            >
              Delete
            </button>
            <Link href="/users">
              <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer">
                Cancel
              </button>
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link
              href={`/create-post/${userId}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Create Post
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default UserDetailsPage;
