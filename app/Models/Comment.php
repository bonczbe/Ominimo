<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'post_id',
        'user_id',
    ];

    protected $appends = ['can_delete'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function getCanDeleteAttribute()
    {
        $auth = auth()?->user()?->id ?? null;

        return ($auth == $this->user_id && $auth != null) || ($auth != null && $this->post->user_id === $auth);
    }
}
