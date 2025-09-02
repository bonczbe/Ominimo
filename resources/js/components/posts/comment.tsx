type CommentType = {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    created_at: string;
    updated_at: string;
    can_delete: boolean;
};
type CommentProps = {
    comment: CommentType;
    handleDeleteComment: (id: number) => void;
};

export function Comment({ comment, handleDeleteComment }: CommentProps) {
    const handleDelete = async (): Promise<void> => {
        try {
            const res = await fetch('/csrf-token');
            const data = await res.json();
            const token = data.csrf_token;

            const deleteRes = await fetch(`/posts/${comment.id}/comments`, {
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

            handleDeleteComment(comment.id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div key={comment.id} className="mt-1 flex justify-between text-sm text-gray-600">
            <span>
                <strong>User #{comment.user_id}:</strong> {comment.comment}
            </span>
            {comment.can_delete && (
                <button className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600" onClick={handleDelete}>
                    Delete
                </button>
            )}
        </div>
    );
}
