'use client'

import Link from 'next/link';
import { trpc } from '@/lib/trpc/client';
import { useParams } from 'next/navigation';
import { z } from 'zod';
import { TRPCError } from '@/components/trpc-error';

function PostItem(props: { post: any }) {
  const { post } = props;
  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <Link className="text-gray-300 underline mb-4" href="/">
        Home
      </Link>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <em className="text-gray-400">
        Created {post.createdAt.toLocaleDateString('en-us')}
      </em>

      <p className="py-4 break-all">{post.text}</p>

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(post, null, 4)}
      </pre>
    </div>
  );
}

const PostViewPage = () => {
  const params = useParams()
  const schema = z.object({
    id: z.string()
  })
  const { id } = schema.parse(params)
  const postQuery = trpc.post.byId.useQuery({ id });

  if (postQuery.error) {
    return (
      <TRPCError error={error} />
    );
  }

  if (postQuery.status !== 'success') {
    return (
      <div className="flex flex-col justify-center h-full px-8 ">
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </div>
    );
  }
  const { data } = postQuery;
  return <PostItem post={data} />;
};

export default PostViewPage;
