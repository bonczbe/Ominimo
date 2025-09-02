import { Post } from '@/components/posts/post';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';

type CommentType = {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    created_at: string;
    updated_at: string;
    can_delete: boolean;
};

type PostType = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    can_edit: boolean;
    comments: CommentType[];
};

type PostProps = {
    post: PostType;
};
export default function ShowPostPage({ post }: PostProps) {
    const handleDeletePost = (id: number) => {
        console.log('Post deleted with id:', id);
        router.visit(`/posts`);
    };

    return (
        <AppLayout>
            <Head title={post.title} />

            <div className="mx-auto max-w-4xl">
                <Post post={post} handleDeletePost={handleDeletePost} />
            </div>
        </AppLayout>
    );
}
