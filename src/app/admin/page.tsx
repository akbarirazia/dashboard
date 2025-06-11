'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost } from '@/lib/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, Edit, PlusCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Post } from '@/lib/types';
import { toTitleCase } from '@/lib/utils';

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);

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
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(['posts'], (oldPosts: Post[]) =>
        oldPosts?.filter((post: Post) => post.id !== id)
      );
    },
    onError: (error) => {
      alert(`Error deleting post: ${error.message}`);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onSettled: () => {
      setDeletingId(null);
      setShowDeleteModal(false);
    },
  });

  const handleDeleteClick = (post: { id: number; title: string }) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deleteMutation.mutate(postToDelete.id);
    }
  };

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
      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className='sm:max-w-[405px] bg-white'>
          <DialogHeader>
            <DialogTitle className='text-lg sm:text-xl'>
              Delete Post?
            </DialogTitle>
            <DialogDescription className='text-sm sm:text-base'>
              Are you sure you want to delete &quot;{postToDelete?.title}
              &quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='gap-2 '>
            <Button
              onClick={() => setShowDeleteModal(false)}
              className='w-full sm:w-auto cursor-pointer border-1'
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={confirmDelete}
              disabled={deletingId === postToDelete?.id}
              className='w-full sm:w-auto text-red-600 border-1 border-red-600 cursor-pointer'
            >
              {deletingId === postToDelete?.id ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header Section */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
            Content Studio
          </h1>
          <p className='text-indigo-600 mt-2 font-medium'>
            {posts?.length || 0} {posts?.length === 1 ? 'post' : 'posts'}{' '}
            published
          </p>
        </div>
        <Link href='/admin/create' className='w-full md:w-auto'>
          <Button className='w-full md:w-auto gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg text-white'>
            <PlusCircle className='h-5 w-5' />
            <span className='hidden sm:inline'>New Story</span>
            <span className='sm:hidden'>New</span>
          </Button>
        </Link>
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
        {posts?.map((post) => (
          <div
            key={post.id}
            className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all relative duration-300 flex flex-col ${
              deletingId === post.id ? 'opacity-50' : ''
            }`}
          >
            <div className='p-5 pb-3 flex-grow'>
              {' '}
              {/* Changed to flex-grow */}
              <div className='flex justify-between items-start gap-2'>
                <h3 className='font-bold text-base sm:text-lg text-gray-900 line-clamp-2'>
                  {toTitleCase(post.title)}
                </h3>
                <span className='bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full whitespace-nowrap'>
                  #{post.id}
                </span>
              </div>
              <p className='text-gray-500 mt-3 text-sm sm:text-base line-clamp-3'>
                {post.body}
              </p>
            </div>

            <div className='px-5 pb-4 pt-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center mt-auto'>
              {' '}
              {/* Added mt-auto */}
              <Link
                href={`/posts/${post.id}`}
                className='text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1'
              >
                <ExternalLink className='h-3 w-3 sm:h-4 sm:w-4' />
                <span>View</span>
              </Link>
              <div className='flex gap-2'>
                <Link href={`/admin/edit/${post.id}`}>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 p-2'
                  >
                    <Edit className='h-3 w-3 sm:h-4 sm:w-4' />
                  </Button>
                </Link>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-gray-600 hover:bg-rose-50 hover:text-rose-600 p-2'
                  onClick={() =>
                    handleDeleteClick({ id: post.id, title: post.title })
                  }
                  disabled={deletingId === post.id}
                >
                  {deletingId === post.id ? (
                    <Loader2 className='h-3 w-3 sm:h-4 sm:w-4 animate-spin' />
                  ) : (
                    <Trash2 className='h-3 w-3 sm:h-4 sm:w-4' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts?.length === 0 && (
        <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 sm:p-8 text-center'>
          <div className='max-w-md mx-auto'>
            <h3 className='text-lg sm:text-xl font-bold text-gray-800'>
              Your story begins here
            </h3>
            <p className='text-gray-600 mt-2 text-sm sm:text-base'>
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
