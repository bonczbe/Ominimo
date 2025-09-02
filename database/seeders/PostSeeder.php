<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();

        if ($user) {
            Post::factory()
                ->count(10)
                ->for($user)
                ->hasComments(3, ['user_id' => $user->id])
                ->create();

            Post::factory()
                ->count(10)
                ->for($user)
                ->hasComments(3, ['user_id' => $user->id])
                ->create();
        }
    }
}
