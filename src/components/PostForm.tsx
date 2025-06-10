// components/PostForm.tsx
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

interface PostFormProps {
  post?: Post;
}

export default function PostForm({ post }: PostFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<Post>({
    defaultValues: post || { title: '', body: '', userId: 1 },
  });

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='title'
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter post title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='body'
          rules={{ required: 'Body is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Editor
                  apiKey='by1087fc5tveixu3gv0w7a2g0j2bfliba42makrygqa2qgg2' // Replace with your TinyMCE API key
                  value={field.value}
                  onEditorChange={field.onChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={mutation.isPending}>
          {mutation.isPending
            ? 'Saving...'
            : post
            ? 'Update Post'
            : 'Create Post'}
        </Button>
      </form>
    </Form>
  );
}
