import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSub: Subscription;
  deleteSub: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService) { }

  ngOnInit() {
    this.postSub = this.postsService.getAll().subscribe(
      posts => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

  removePost(id: string) {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.danger('Post was deleted');
    });
  }
}
