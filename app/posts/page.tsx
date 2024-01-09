import PostsPageComponent from '@/app/components/PostsPageComponent';
import React from 'react';

export default function PostsPage({ params }: { params: { pageNum: string } }) {
  return <PostsPageComponent pageNum={params.pageNum} />;
}
