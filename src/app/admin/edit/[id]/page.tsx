'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '@/lib/api';
import PostForm from '@/components/PostForm';
import { Loader2 } from 'lucide-react';

export default function EditPost({ params }: { params: { id: string } }) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', params.id],
    queryFn: () => fetchPost(Number(params.id)),
  });

  if (isLoading) return <Loader2 className='animate-spin mx-auto mt-10' />;
  if (error)
    return (
      <div className='text-red-500 text-center'>
        Error loading post: {error.message}
      </div>
    );

  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
