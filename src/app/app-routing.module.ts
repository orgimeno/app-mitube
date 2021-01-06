import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { DefaultComponent } from './default/default.component';
import {UserEditComponent} from "./user-edit/user-edit.component";
import {VideoNewComponent} from "./video-new/video-new.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";

const routes: Routes = [
  { path: 'index', component: DefaultComponent },
  { path: 'index/:page', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/edit', component: UserEditComponent },
  { path: 'video/new', component: VideoNewComponent },
  { path: 'video/:id', component: VideoDetailComponent  },
  { path: '**', component: DefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
