'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '../../components/PostsPageComponent';

interface PostDetailsPageProps {
  params: { postId: string };
}

const PostDetailsPage = ({ params }: PostDetailsPageProps) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const postId = params.postId;

  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (postId) {
          const response = await axios.get(
            `https://dummyapi.io/data/v1/post/${postId}`,
            {
              headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
            }
          );

          console.log(response);

          const postData: Post = {
            id: response.data.id,
            text: response.data.text,
            image: response.data.image,
            likes: response.data.likes,
            link: response.data.link,
            publishDate: response.data.publishDate,
            tags: response.data.tags,
            owner: {
              id: response.data.owner.id,
              firstName: response.data.owner.firstName,
              lastName: response.data.owner.lastName,
              email: response.data.owner.email,
              title: response.data.owner.title,
              picture: response.data.owner.picture,
            },
          };

          setPost(postData);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching post with ID ${postId}:`, error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleUpdateClick = async () => {
    try {
      await axios.put(`https://dummyapi.io/data/v1/post/${post?.id}`, post, {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      });
      alert(`User with ID ${post?.id} updated successfully`);
      setIsEditMode(false);
    } catch (error) {
      console.error(`Error updating post with ID ${post?.id}:`, error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`https://dummyapi.io/data/v1/post/${post?.id}`, {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      });
      alert(`Post with ID ${post?.id} deleted successfully`);

      router.push('/posts');
    } catch (error) {
      console.error(`Error deleting post with ID ${post?.id}:`, error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setPost((prevPost) => ({
      ...prevPost,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-4xl text-center font-semibold mb-6">Post Details</h2>
      {post ? (
        <>
          {!isEditMode ? (
            <div className="text-lg font-bold">
              <h2 className="text-3xl">{post.text}</h2>
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="object-cover  mx-auto my-8 block"
              />
              <p>Owner: {`${post.owner.firstName} ${post.owner.lastName}`}</p>
              <img
                src={post.owner.picture}
                alt={`Owner ${post.owner.id}`}
                className="w-20 h-20 rounded-full mt-2"
              />
              <p>Publish Date: {post.publishDate}</p>
              <p>Likes: {post.likes}</p>
              <p>Tags: {post.tags.join(', ')}</p>
              <p>Link: {post.link}</p>

              <div className="mt-4">
                <Link
                  href="/posts"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Back to Posts
                </Link>
              </div>
            </div>
          ) : (
            <>
              <label className="block">
                Post Text:
                <input
                  type="text"
                  name="postText"
                  value={post.text}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={post.image}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Owner First Name:
                <input
                  type="text"
                  name="firstName"
                  value={post.owner.firstName}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Owner Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={post.owner.lastName}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Publish Date:
                <input
                  type="text"
                  name="publishDate"
                  value={post.publishDate}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Likes:
                <input
                  type="text"
                  name="likes"
                  value={post.likes}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Tags (comma-separated):
                <input
                  type="text"
                  name="tags"
                  value={post.tags.join(', ')}
                  onChange={handleChange}
                  className="mt-2 p-2 border rounded w-full"
                />
              </label>

              <label className="block">
                Link:
                <input
                  type="text"
                  name="link"
                  value={post.link}
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
        </>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </div>
  );
};

export default PostDetailsPage;

function setPost(postData: Post) {
  throw new Error('Function not implemented.');
}
