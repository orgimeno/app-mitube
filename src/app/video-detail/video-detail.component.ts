import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../video.service";
import {GLOBAL} from "../services/global";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  public title: string = 'Detalle del Vídeo';
  public id: number;
  private errorMsg: any;
  public video;
  public loading = 'show';
  public urlUploads = GLOBAL.urlUploads;
  lastVideos: any;
  private statusLastVideos: any;

  constructor(
    private _loginService : LoginService,
    private _videoService : VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loading = 'show';
    this.id = +this._route.snapshot.url[1].path;
    this._videoService.getVideo(this.id).subscribe(
      resp=>{
        if(resp['status'] == 'success'){
          this.video = resp['data'];
        }else{
          this._router.navigate(['/index']);
        }
        this.loading = 'hidde';
      },
      error => {
        this.errorMsg = <any>error

        if (this.errorMsg != null) {

          console.log(this.errorMsg);
          alert("Error en la petición");
        }
      }
    );

    this._videoService.getLastVideos().subscribe(
      resp=>{
        console.log(resp);
        this.lastVideos = resp['data'];
        this.statusLastVideos = resp['status'];

        if(this.statusLastVideos !== 'success'){
          this._router.navigate(['/index']);
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

  }k

}
