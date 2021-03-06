import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { UserEditComponent } from './user-edit/user-edit.component';
import { VideoNewComponent } from './video-new/video-new.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { LastVideosComponent } from './last-videos/last-videos.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    VideoNewComponent,
    VideoDetailComponent,
    LastVideosComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
