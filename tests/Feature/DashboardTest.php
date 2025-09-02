<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get(route('posts.index'))->assertOk();
});

test('authenticated users can visit the posts.index', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('posts.index'))->assertOk();
});
