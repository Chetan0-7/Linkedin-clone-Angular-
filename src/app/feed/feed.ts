import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedService } from './feed.service';
import { Post } from './post.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {

  selectedImage: string| null = null;
  loggedInUser: string | null = null;
  newContent = '';
  posts: Post[] = [];

  constructor(
    private feedService: FeedService,
    private router: Router
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loggedInUser = localStorage.getItem('user');
    }

    this.loadPosts();
  }

  loadPosts() {
    this.feedService.getPosts().subscribe(data => {
      this.posts = data.reverse();
    });
  }
   

onImageSelect(event: any) {
  if (typeof window === 'undefined') return;

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.selectedImage = reader.result as string;
  };
  reader.readAsDataURL(file);
}


  addPost() {
  if (!this.loggedInUser) return;

  if (!this.newContent.trim() && !this.selectedImage) {
    alert('Add text or image');
    return;
  }

  const post = {
    user: this.loggedInUser,
    content: this.newContent,
    image: this.selectedImage || null,
    likes: 0,
    liked: false
  };

  this.feedService.addPost(post).subscribe(() => {
    this.newContent = '';
    this.selectedImage = null;
    this.loadPosts();
  });
}

  likePost(post: Post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    this.feedService.likePost(post).subscribe();
  }

  deletePost(id?: number) {
    if (!id) return;

    this.feedService.deletePost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.router.navigate(['/login']);
  }
}
