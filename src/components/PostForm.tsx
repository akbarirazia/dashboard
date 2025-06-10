'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '@/lib/api';
import { Post } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, PenLine } from 'lucide-react';

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<Post>({
    defaultValues: post || { title: '', body: '', userId: 1 },
  });
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const mutation = useMutation({
    mutationFn: post?.id
      ? (data: Post) => updatePost(post.id!, data)
      : createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.push('/admin');
    },
    onError: (error) => {
      alert(`Error saving post: ${error.message}`);
    },
  });

  const onSubmit = (data: Post) => {
    mutation.mutate(data);
  };

  return (
    <div className='max-w-full mx-auto px-4 sm:px-6 py-8'>
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => router.back()}
          className='text-indigo-600 hover:text-indigo-800'
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Back
        </Button>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* Form Header */}
        <div className='bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 p-6'>
          <div className='flex items-center gap-3'>
            <div className='bg-indigo-100 p-2 rounded-lg'>
              <PenLine className='h-5 w-5 text-indigo-600' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900'>
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
          </div>
          <p className='text-gray-600 mt-1'>
            {post
              ? 'Update your existing post'
              : 'Write something amazing to share with the world'}
          </p>
        </div>

        {/* Form Content */}
        <div className='p-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='title'
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Post Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter a captivating title...'
                        {...field}
                        className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                      />
                    </FormControl>
                    <FormMessage className='text-rose-600' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='body'
                rules={{ required: 'Content is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700 font-medium'>
                      Post Content
                    </FormLabel>
                    <FormControl>
                      <div className='rounded-lg overflow-hidden border border-gray-300'>
                        <Editor
                          apiKey={apiKey}
                          value={field.value}
                          onEditorChange={field.onChange}
                          init={{
                            height: 500,
                            menubar: false,
                            skin: 'oxide',
                            content_css: 'default',
                            plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                              'undo redo | formatselect | bold italic underline | \
                              alignleft aligncenter alignright | \
                              bullist numlist outdent indent | removeformat | help',
                            content_style:
                              'body { font-family:Inter,sans-serif; font-size:16px }',
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-rose-600' />
                  </FormItem>
                )}
              />

              <div className='flex justify-end pt-4 border-t border-gray-200'>
                <Button
                  type='submit'
                  disabled={mutation.isPending}
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md text-white'
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                      Saving...
                    </>
                  ) : post ? (
                    'Update Post'
                  ) : (
                    'Publish Post'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
