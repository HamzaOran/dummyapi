import React from 'react';
import UsersPageComponent from '../components/UsersPageComponent';

export default function UsersPage({ params }: { params: { pageNum: string } }) {
  return <UsersPageComponent pageNum={params.pageNum} />;
}
