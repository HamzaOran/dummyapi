import React from 'react';
import PostsPageComponent from '@/app/components/PostsPageComponent';

export default function PostsPage({
  params,
}: {
  params: { pageNum: string; tagId: string };
}) {
  return (
    <PostsPageComponent pageNum={params.pageNum || '1'} tagId={params.tagId} />
  );
}
