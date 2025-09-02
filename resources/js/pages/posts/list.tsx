import { Post } from '@/components/posts/post';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

type CommentType = {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    can_delete: boolean;
    created_at: string;
    updated_at: string;
};

type Post = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    can_edit: boolean;
    comments: CommentType[];
};

type ListProps = {
    posts: Post[];
};

export default function List({ posts }: ListProps) {
    const { auth } = usePage<SharedData>().props;
    const [postsList, setPostsList] = useState(posts);

    const handleDeletePost = (id: number): void => {
        setPostsList((prev) => prev.filter((post) => post.id != id));
    };

    return (
        <AppLayout>
            <Head title="List of the posts" />
            <div className="w-full">
                {postsList.map((post) => (
                    <Post key={post.id} post={post} handleDeletePost={handleDeletePost} />
                ))}
            </div>
        </AppLayout>
    );
}
