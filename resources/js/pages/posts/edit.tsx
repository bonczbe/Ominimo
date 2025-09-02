import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type EditProps = {
    post: {
        id: number;
        title: string;
        content: string;
    };
};

export default function Edit({ post }: EditProps) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/csrf-token');
            const data = await res.json();
            const token = data.csrf_token;

            const response = await fetch(`/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.status === 422) {
                const validationErrors = await response.json();
                setErrors(validationErrors.errors || {});
                return;
            }

            if (!response.ok) throw new Error('Failed to update post');

            setErrors({});
            router.visit(`/posts/${post.id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AppLayout>
            <Head title="Edit Post" />

            <div className="mx-auto mt-12 w-4/5 rounded-lg bg-gray-800 p-6 text-gray-100 shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-white">Edit Post</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-200">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter post title"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-gray-200">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={6}
                            className="rounded-md border border-gray-700 bg-gray-900 p-3 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Write your post content..."
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-400">{errors.content}</p>}
                    </div>

                    <button
                        type="submit"
                        className="self-start rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
