'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Edit, PlusCircle, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      alert(`Error deleting post: ${error.message}`);
    },
  });

  if (isLoading)
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <Loader2 className='animate-spin h-10 w-10 text-indigo-600' />
      </div>
    );

  if (error)
    return (
      <div className='bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 text-rose-600 p-6 rounded-2xl max-w-2xl mx-auto mt-8'>
        <h3 className='font-bold text-lg'>Oops! Something went wrong</h3>
        <p className='mt-2'>{error.message}</p>
      </div>
    );

  return (
    <div className='space-y-8 p-4 md:p-6 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Content Studio</h1>
          <p className='text-indigo-600 mt-2 font-medium'>
            {posts?.length || 0} {posts?.length === 1 ? 'post' : 'posts'}{' '}
            published
          </p>
        </div>
        <Link href='/admin/create' className='w-full md:w-auto'>
          <Button className='w-full md:w-auto gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg text-white'>
            <PlusCircle className='h-5 w-5' />
            New Story
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts?.map((post) => (
          <div
            key={post.id}
            className='bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group'
          >
            <div className='p-5 pb-3'>
              <div className='flex justify-between items-start gap-2'>
                <h3 className='font-bold text-lg text-gray-900 line-clamp-2'>
                  {post.title}
                </h3>
                <span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap'>
                  #{post.id}
                </span>
              </div>

              <p className='text-gray-500 mt-3 line-clamp-3'>{post.body}</p>
            </div>

            <div className='px-5 pb-4 pt-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center'>
              <Link
                href={`/posts/${post.id}`}
                className='text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1'
              >
                <ExternalLink className='h-4 w-4' />
                View
              </Link>

              <div className='flex gap-2'>
                <Link href={`/admin/edit/${post.id}`}>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  >
                    <Edit className='h-4 w-4' />
                  </Button>
                </Link>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:bg-rose-50 hover:text-rose-600'
                  onClick={() => {
                    if (confirm('Delete this post permanently?')) {
                      deleteMutation.mutate(post.id!);
                    }
                  }}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center'>
          <div className='max-w-md mx-auto'>
            <h3 className='text-xl font-bold text-gray-800'>
              Your story begins here
            </h3>
            <p className='text-gray-600 mt-2'>
              Create your first post to share with the world
            </p>
            <Link href='/admin/create' className='mt-4 inline-block'>
              <Button className='gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'>
                <PlusCircle className='h-5 w-5' />
                Create First Post
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
