<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request, $id)
    {
        $status = Comment::create([
            'user_id' => auth()?->user()?->id ?? null,
            'post_id' => $request->input('post_id'),
            'comment' => $request->input('comment'),
        ]);

        return response()->json([
            'success' => $status,
            'message' => $status ? 'Success' : 'Error',
        ], $status ? 200 : 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::with('post')->findOrFail($id);
        $userId = auth()->user()->id;

        if ($userId == $comment->user_id || $userId == $comment->post->user_id) {

            $status = $comment->delete();

            return response()->json([
                'success' => $status,
                'message' => $status ? 'Success' : 'Error',
            ], $status ? 200 : 500);
        }

        return response()->json([
            'success' => false,
            'message' => 'Unauthorized',
        ], 401);
    }
}
