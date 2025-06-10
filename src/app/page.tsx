'use client';

import PostList from '@/components/PostList';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='text-center mb-12'>
        <div className='inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-2 rounded-full mb-4'>
          <Sparkles className='h-5 w-5 text-indigo-600' />
          <span className='text-sm font-medium text-indigo-600'>
            Latest Stories
          </span>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
          Discover Our Posts
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Explore insightful articles, creative stories, and valuable resources
          from our community.
        </p>
      </div>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center'>
          <span className='bg-white px-4 text-gray-500'>Content</span>
        </div>
      </div>

      <div className='mt-12'>
        <PostList />
      </div>
    </div>
  );
}
