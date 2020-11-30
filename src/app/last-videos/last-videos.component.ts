import { Component, OnInit } from '@angular/core';
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GLOBAL} from "../services/global";

@Component({
  selector: 'app-last-videos',
  templateUrl: './last-videos.component.html',
  styleUrls: ['./last-videos.component.css']
})
export class LastVideosComponent implements OnInit {
  lastVideos: any;
  statusLastVideos: string;
  private errorMsg: any;
  public urlUploads = GLOBAL.urlUploads;

  constructor(
    private _videoService : VideoService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
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
  }

}
