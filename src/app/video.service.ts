import { Injectable } from '@angular/core';
import {GLOBAL} from "./services/global";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public identity;
  public token;
  public url: string = GLOBAL.url;

  constructor(private _http: HttpClient) { }

  getVideo(id){
    return this._http.get(this.url + '/video/detail/' + id + '?XDEBU_SESSION_START=' + GLOBAL.xdebug);
  }

  getLastVideos(){
    return this._http.get(this.url + '/video/last-videos?XDEBU_SESSION_START=' + GLOBAL.xdebug);
  }
}
