import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {UploadService} from "../services/upload.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Video} from "../model/video";
import {GLOBAL} from "../services/global";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [LoginService, UploadService]
})
export class VideoNewComponent implements OnInit {

  public title: string = 'Crear nuevo vídeo';
  public video: Video;
  private errorMsg: any;
  status: any;
  uploadedImage = false;

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

    this._loginService.baseAuthRequest(this.video, '/video/new').subscribe(
      resp => {
        this.status = resp.body.status;
        if (this.status !== 'success'){
          this.status = 'error';
        }else{
          this.video = resp.body.data;
        }

      },
      error => {
        this.errorMsg = <any>error

        if (this.errorMsg != null) {

          console.log(this.errorMsg);
          alert("Error en la petición");
        }
      }
    )

  }

  public filesToUpload: Array<File>;
  public resultUpload;

  fileChangeEventImage(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    let token = this._loginService.getToken();
    let url = `${GLOBAL.url}/video/upload-image/${this.video.id}`;

    this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload)
      .then(
        result => {
          this.resultUpload = result;
          this.video.image = this.resultUpload.file_name;
        },
        error => {
          console.log(error)
        }
      )

  }

  nextUploadVideo() {
    this.uploadedImage = true;
  }

  fileChangeEventVideo(fileInput) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    let token = this._loginService.getToken();
    let url = `${GLOBAL.url}/video/upload-video/${this.video.id}`;

    this._uploadService.makeFileRequest(token, url, ['video'], this.filesToUpload)
      .then(
        result => {
          this.resultUpload = result;
        },
        error => {
          console.log(error)
        }
      )
  }

  redirectToVideo() {
    this._router.navigate(['/index']);
  }
}
