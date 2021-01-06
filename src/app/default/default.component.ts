import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {VideoService} from "../video.service";
import {ActivatedRoute} from "@angular/router";
import {GLOBAL} from "../services/global";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [LoginService]
})
export class DefaultComponent implements OnInit {

  public identity;
  public title = 'Portada';
  private errorMsg: any;
  private status: string;
  public videos;
  urlUploads: string;

  constructor(
    private _loginService: LoginService,
    private _videoService: VideoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
    this.getAllVideos();
    this.urlUploads = GLOBAL.urlUploads;

  }


  getAllVideos() {
    this.activatedRoute.queryParams.subscribe(params => {
      let page = +params['page'];
      if(!page) {
        page = 1;
      }

      this._videoService.getVideos(page).subscribe(
        resp => {

          this.status = resp['status'];
          if (this.status !== 'success'){
            this.status = 'error';
          }else{
            this.videos = resp['data'];
          }

        },
        error => {
          this.errorMsg = <any>error

          if (this.errorMsg != null) {

            console.log(this.errorMsg);
            alert("Error en la petición");
          }
        }
      );

    });
  }
}
