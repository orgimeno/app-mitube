import { Injectable } from '@angular/core';
import {GLOBAL} from "./services/global";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public identity;
  public token;
  public url: string = GLOBAL.url;

  constructor(private _http: HttpClient) { }

  getCommentsOfVideo(video_id){
    return this._http.get(this.url + '/comment/list/' + video_id);
  }
}
