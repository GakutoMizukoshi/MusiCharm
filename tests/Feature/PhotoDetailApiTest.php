<?php

namespace Tests\Feature;

use App\Comment;
use App\Photo;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class PhotoDetailApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @意図した構造のjsonを返却
     */
     public function test_正しい構造のJSONを返却する()
     {
        factory(Photo::class)->create()->each(function ($photo) {
            $photo->comments()->saveMany(factory(Comment::class, 3)->make());
        });
        $photo = Photo::first();
        $response = $this->json('GET', route('photo.show', [
            'id' => $photo->id,
        ]));
        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $photo->id,
                'url' => $photo->url,
                'owner' => [
                    'name' => $photo->owner->name,
                ],
                'comments' => $photo->comments
                    ->sortByDesc('id')
                    ->map(function ($comment) {
                        return [
                            'author' => [
                                'name' => $comment->author->name,
                            ],
                            'content' => $comment->content,
                        ];
                    })
                    ->all(),
            ]);
     }
}