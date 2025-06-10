import PostForm from '@/components/PostForm';

export default function CreatePost() {
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Create New Post</h1>
      <PostForm />
    </div>
  );
}
