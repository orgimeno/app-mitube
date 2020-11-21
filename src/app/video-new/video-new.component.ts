import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {UploadService} from "../services/upload.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Video} from "../model/video";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [LoginService, UploadService]
})
export class VideoNewComponent implements OnInit {

  public title: string = 'Crear nuevo vídeo';
  public video: Video;

  constructor(
    private _loginService : LoginService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {

    this.video = new Video(
      1,
      '',
      '',
      'public',
      'null',
      'null',
      null,
      null

    );

  }

  callVideosStatus(value: string) {
    this.video.status = value;
  }

  onSubmit() {
    console.log(this.video);
  }
}
