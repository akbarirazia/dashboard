'use client';

import { fetchPost } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Loader2,
  ArrowLeft,
  AlertCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import Link from 'next/link';

export default async function PostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  let post = null;
  let error = null;

  try {
    post = await fetchPost(Number(params.id));
  } catch (err) {
    error = err instanceof Error ? err : new Error('Failed to fetch post');
  }

  if (!post && !error) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-center'>
          <Loader2 className='animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4' />
          <p className='text-gray-600 font-medium'>Loading your story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-rose-50 border border-rose-200 rounded-xl p-6 text-center'>
          <AlertCircle className='h-10 w-10 text-rose-600 mx-auto mb-3' />
          <h3 className='text-lg font-medium text-rose-800 mb-2'>
            Failed to load post
          </h3>
          <p className='text-rose-600 mb-4'>{error.message}</p>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 py-8'>
      <div className='mb-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors'
        >
          <ArrowLeft className='h-5 w-5' />
          <span>All Posts</span>
        </Link>
      </div>

      <Card className='border-0 shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-indigo-500 to-purple-600 h-2 w-full' />

        <CardHeader className='pb-4 relative'>
          <div className='flex justify-between items-start'>
            <CardTitle className='text-3xl font-bold text-gray-900 tracking-tight'>
              {post.title}
            </CardTitle>

            <div className='flex gap-2'>
              <button
                className='p-2 text-gray-400 hover:text-indigo-600 transition-colors'
                aria-label='Bookmark post'
              >
                <Bookmark className='h-5 w-5' />
              </button>
              <button
                className='p-2 text-gray-400 hover:text-indigo-600 transition-colors'
                aria-label='Share post'
              >
                <Share2 className='h-5 w-5' />
              </button>
            </div>
          </div>

          <div className='text-sm text-indigo-600 font-medium mt-2'>
            Post #{post.id}
          </div>
        </CardHeader>

        <CardContent className='pt-0'>
          <div className='prose prose-indigo max-w-none text-gray-700'>
            <p className='text-lg leading-relaxed'>{post.body}</p>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-100 flex justify-between items-center'>
            <Link
              href='/'
              className='inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors'
            >
              <ArrowLeft className='h-4 w-4' />
              <span>Back to all posts</span>
            </Link>

            <div className='text-sm text-gray-500'>Last updated just now</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
