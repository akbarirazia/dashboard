import { fetchPost } from '@/lib/api';
import PostForm from '@/components/PostForm';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditPost(props: {
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
      <div className='max-w-4xl mx-auto p-4 sm:p-6'>
        <div className='bg-rose-50 border border-rose-200 rounded-xl p-6 text-center'>
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
    <>
      <div className='mb-4 sm:mb-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm sm:text-base'
        >
          <ArrowLeft className='h-4 w-4 sm:h-5 sm:w-5' />
          <span>All Posts</span>
        </Link>
      </div>

      <PostForm post={post} />
    </>
  );
}
