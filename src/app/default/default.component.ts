import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {VideoService} from "../video.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GLOBAL} from "../services/global";
import {
  faEdit,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

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
  faEdit = faEdit;
  faPrev = faAngleLeft;
  faNext = faAngleRight
  loading;
  pages;
  pagePrev = 1;
  pageNext = 1;

  constructor(
    private _loginService: LoginService,
    private _videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
    this.getAllVideos();
    this.urlUploads = GLOBAL.urlUploads;
    this.loading = 'show';

  }


  getAllVideos() {

    let page = 1;

    if (this.activatedRoute.snapshot.url.length ){
      if(this.activatedRoute.snapshot.url[0].path == 'index'){
        page = this.activatedRoute.snapshot.url.length == 2 ? +this.activatedRoute.snapshot.url[1].path : 1;
      }else{
        page = +this.activatedRoute.snapshot.url[0].path;
      }
    }

    this._videoService.getVideos(page).subscribe(
      resp => {
        this.status = resp['status'];
        if (this.status !== 'success'){
          this.status = 'error';
        }else{
          this.videos = resp['data'];
          this.loading = 'hide';

          this.pages = [];

          for(let i = 1; i <= resp['total_pages']; i++){
            this.pages.push(i);
          }

          if(page >= 2){
            this.pagePrev = (page -1);
          }else{
            this.pagePrev = page;
          }

          if(page < resp['total_pages'] || page == 1){
            this.pageNext = (page + 1)
          }else{
             this.pageNext = page;
          }

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

  editVideo(id: number) {
    console.log(id);
  }
}
