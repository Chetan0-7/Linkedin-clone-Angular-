import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

