import axios from 'axios';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import { Post } from '../../components/PostsPageComponent';

interface UserPostsPageProps {
  posts: Post[];
  userId: string;
}

const UserPostsPage = ({ posts, userId }: UserPostsPageProps) => {
  return (
    <div>
      <h2>Posts of User {userId}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.text}</p>
          </li>
        ))}
      </ul>
      <Link href={`/userdetail/${userId}`}>
        <a>Back to User Details</a>
      </Link>
    </div>
  );
};

export default UserPostsPage;

export const getServerSideProps: GetServerSideProps<
  UserPostsPageProps
> = async ({ params }) => {
  const userId = params?.userId as string;

  if (!userId) {
    return {
      notFound: true,
    };
  }

  try {
    const userResponse = await axios.get(
      `https://dummyapi.io/data/v1/user/${userId}`,
      {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      }
    );

    const postsResponse = await axios.get(
      `https://dummyapi.io/data/v1/post?limit=10&ownerId=${userId}`,
      {
        headers: { 'app-id': process.env.NEXT_PUBLIC_API_KEY },
      }
    );

    const posts = postsResponse.data.data;

    return {
      props: {
        posts,
        userId,
      },
    };
  } catch (error) {
    console.error(`Error fetching data for user with ID ${userId}:`, error);
    return {
      notFound: true,
    };
  }
};
