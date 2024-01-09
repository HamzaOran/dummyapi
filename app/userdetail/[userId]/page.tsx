'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { User } from '@/app/create-user/page';
import Link from 'next/link';

interface UserDetailsPageProps {
  params: { userId: string };
}

const UserDetailsPage = ({ params }: UserDetailsPageProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
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
          console.log(response);
        }
      } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateClick = async () => {
    try {
      await axios.put(`https://dummyapi.io/data/v1/user/${user?.id}`, user, {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      });
      console.log(`User with ID ${user?.id} updated successfully`);
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
      // Redirect to users page or handle navigation as needed
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

  return (
    <div>
      <h2>User Details</h2>
      {user ? (
        <>
          <p>ID: {userId}</p>
          {!isEditMode ? (
            <>
              <p>Name: {`${user.firstName} ${user.lastName}`}</p>
              <p>Email: {user.email}</p>
              <p>Title: {user.title}</p>
              <p>Gender: {user.gender}</p>
              <p>Register Date: {user.registerDate}</p>
              <p>Updated Date: {user.updatedDate}</p>
              <img
                src={user.picture}
                alt="User"
                className="mt-2 w-32 h-32 rounded-full"
              />
            </>
          ) : (
            <>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={user.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                />
              </label>
            </>
          )}

          <div className="mt-4">
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mr-2"
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
          <div>
            <Link
              href={`/create-post/${userId}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mt-2"
            >
              Create Post
            </Link>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserDetailsPage;
