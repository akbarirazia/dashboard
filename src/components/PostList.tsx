'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/api';
import { Loader2, AlertCircle } from 'lucide-react';
import PostCard from './PostCard';

export default function PostList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <div className='text-center'>
          <Loader2 className='animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4' />
          <p className='text-gray-600 font-medium'>Loading stories...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='bg-rose-50 border border-rose-200 rounded-xl p-6 max-w-2xl mx-auto'>
        <div className='flex flex-col items-center text-center'>
          <AlertCircle className='h-10 w-10 text-rose-600 mb-3' />
          <h3 className='text-lg font-medium text-rose-800 mb-1'>
            Failed to load posts
          </h3>
          <p className='text-rose-600'>{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-white border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {posts?.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className='col-span-full py-12 text-center'>
          <div className='bg-indigo-50 border border-indigo-100 rounded-xl inline-flex items-center gap-3 px-6 py-3 mb-4'>
            <AlertCircle className='h-5 w-5 text-indigo-600' />
            <span className='text-indigo-600 font-medium'>No posts found</span>
          </div>
          <p className='text-gray-600 max-w-md mx-auto'>
            It looks like there are not any posts yet. Check back later or
            create one!
          </p>
        </div>
      )}
    </div>
  );
}
