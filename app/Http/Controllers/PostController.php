<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('posts/list', [
            'posts' => Post::with('comments')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $status = Post::create([
            'user_id' => auth()->user()->id,
            'title' => $request->input('title'),
            'content' => $request->input('content'),
        ]);

        return response()->json([
            'success' => $status,
            'message' => $status ? 'Success' : 'Error',
        ], $status ? 200 : 500);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Inertia::render('posts/show', [
            'post' => Post::with('comments')->findOrFail($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $post = Post::findOrFail($id);

        return Inertia::render('posts/edit', [
            'post' => $post,
            'can_edit' => auth()->user()->id == $post->user_id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        if (auth()->user()->id == $post->user_id) {

            $status = $post->update([
                'title' => $request->input('title'),
                'content' => $request->input('content'),
            ]);

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        if (auth()->user()->id == $post->user_id) {

            $status = $post->delete();

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
