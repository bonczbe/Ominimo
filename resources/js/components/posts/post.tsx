import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Comment } from './comment';

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
    handleDeletePost: (id: number) => void;
};

export function Post({ post, handleDeletePost }: PostProps) {
    const { url } = usePage();
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState('');

    const handleDelete = async (): Promise<void> => {
        try {
            const res = await fetch('/csrf-token');
            const data = await res.json();
            const token = data.csrf_token;

            const deleteRes = await fetch(`/posts/${post.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
            });

            if (!deleteRes.ok) {
                throw new Error('Failed to delete');
            }

            handleDeletePost(post.id);
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteComment = (id: number): void => {
        setComments((prev) => prev.filter((comment) => comment.id != id));
    };

    const handleComment = async (): Promise<void> => {
        if (newComment != '') {
            try {
                const res = await fetch('/csrf-token');
                const data = await res.json();
                const token = data.csrf_token;

                const commentRes = await fetch(`/posts/${post.id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': token,
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        comment: newComment,
                        post_id: post.id,
                    }),
                });

                if (!commentRes.ok) {
                    throw new Error('Failed to delete');
                }

                const createdComment = await commentRes.json();
                setComments((prev) => [...prev, createdComment.success]);
                setNewComment('');
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="m-auto mb-4 w-fit max-w-3/4 rounded border p-4">
            <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <div className="flex gap-2">
                    {url != `/posts/${post.id}` && (
                        <Link className="rounded bg-cyan-500 px-2 py-1 text-white hover:bg-cyan-600" href={`/posts/${post.id}`}>
                            Show
                        </Link>
                    )}

                    {post.can_edit && (
                        <div className="flex gap-2">
                            <Link className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600" href={`/posts/${post.id}/edit`}>
                                Edit
                            </Link>
                            <button className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="mt-2">{post.content}</p>

            <div className="mt-2 w-full text-right">
                <small className="text-gray-400">
                    By User #{post.user_id} • {new Date(post.created_at).toLocaleString()}
                </small>
            </div>
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full rounded bg-gray-400 p-2 text-black"
                    placeholder="Add new Comment"
                />
                <button className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600" onClick={handleComment}>
                    Submit
                </button>
            </div>

            {comments.length > 0 && (
                <div className="mt-4 border-t pt-2">
                    <h3 className="font-semibold">Comments:</h3>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} handleDeleteComment={handleDeleteComment} />
                    ))}
                </div>
            )}
        </div>
    );
}
