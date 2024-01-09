'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Post } from '../../components/PostsPageComponent';

interface PostDetailsPageProps {
  params: { postId: string };
}

const PostDetailsPage = ({ params }: PostDetailsPageProps) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://dummyapi.io/data/v1/post/${params.postId}`,
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
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    if (params.postId) {
      fetchPostData();
    }
  }, [params.postId]);

  if (loading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Post Details</h2>
      <p>ID: {post.id}</p>
      <h2>{post.text}</h2>
      <img src={post.image} alt={`Post ${post.id}`} className="w-32 h-32" />
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
        <Link href="/posts">Back to Posts</Link>
      </div>
    </div>
  );
};

export default PostDetailsPage;

function setPost(postData: Post) {
  throw new Error('Function not implemented.');
}
