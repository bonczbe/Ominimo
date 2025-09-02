<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('posts.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('posts.index', function () {
        return redirect()->route('posts.index');
    })->name('posts.index');
});

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::post('/posts/{id}/comments', [CommentController::class, 'store'])->name('comments.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
});

Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::delete('/posts/{id}/comments', [CommentController::class, 'destroy'])->name('comments.destroy');
});
Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
