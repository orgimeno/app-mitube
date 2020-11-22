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


  createvideo(token, video){

  }
}
