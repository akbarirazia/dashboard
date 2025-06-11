import Link from 'next/link';
import { Post } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import { toTitleCase } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className='group'>
      <Card
        className='
        h-full flex flex-col
        bg-white border border-gray-100
        shadow-sm hover:shadow-md
        transition-all duration-300
        overflow-hidden
        hover:border-indigo-200
      '
      >
        <CardHeader className='relative'>
          {/* Optional bookmark icon */}
          <button
            className='absolute top-0 right-4 text-gray-300 hover:text-indigo-500 transition-colors'
            onClick={(e) => {
              e.preventDefault();
              // Add bookmark functionality here
            }}
          >
            <Bookmark className='h-5 w-5' strokeWidth={1.5} />
          </button>

          <CardTitle
            className='
            text-lg font-semibold text-gray-900
            group-hover:text-indigo-600 
            transition-colors duration-300
            line-clamp-1
            pr-6
            titlecase
          '
          >
            {toTitleCase(post.title)}
          </CardTitle>
        </CardHeader>
        {/* Decorative accent bar
        <div className='h-1 bg-gradient-to-r from-indigo-400 to-purple-500' /> */}

        <CardContent className='pt-0 flex flex-col flex-grow'>
          <p
            className='
            text-gray-600 line-clamp-5
            group-hover:text-gray-700 
            text-sm
            transition-colors duration-300
            mb-6
            leading-6
          '
          >
            {toTitleCase(post.body)}
          </p>

          <div
            className='
  mt-auto pt-4
  flex justify-between items-center
  relative
'
          >
            {/* Decorative divider */}
            <div
              className="
    absolute top-0 left-0 right-0
    flex justify-center
    before:content-[''] before:block before:w-3xl before:h-0.5 
    before:bg-gradient-to-r h-1 before:from-transparent before:via-indigo-300 before:to-transparent
  "
            />

            {/* Left side - Post ID with decorative elements */}
            <div className='flex items-center gap-2'>
              <span
                className='
      relative
      text-xs font-medium text-indigo-600
      bg-indigo-50/70 px-3 py-1.5 rounded-full
      border border-indigo-100
      shadow-inner
      flex items-center gap-2
      before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2
       before:bg-indigo-400
    '
              >
                <span className='text-indigo-500'>#</span>
                <span className='text-indigo-700'>{post.id}</span>
              </span>
            </div>

            {/* Right side - Read more with animated arrow */}
            <div
              className='
    relative
    text-sm font-medium text-indigo-600
    group-hover:text-indigo-700
    transition-colors duration-300
    pr-4
    after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
    after:w-2 after:h-2 after:border-r-2 after:border-b-2 after:border-indigo-500
    after:rotate-[-45deg] after:opacity-70
    group-hover:after:translate-x-1 group-hover:after:opacity-100
    after:transition-all after:duration-300
  '
            >
              Read more
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
