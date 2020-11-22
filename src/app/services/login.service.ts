import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {GLOBAL} from "./global";


@Injectable()
export class LoginService{

  public url = GLOBAL.url;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
  }

  signUp(userToLogin){
    return this.baseRequest(userToLogin, '/login');
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined'){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  register(userToSign){
    return this.baseRequest(userToSign, '/user/new');
  }


  updateUSer(usertToUpdate){
    return this.baseAuthRequest(usertToUpdate, '/user/edit');
  }



  baseRequest(obj, endpoint){
    let json = JSON.stringify(obj, endpoint);
    let params = "json="+json;
    let headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });

    console.info('*****************************************');
    console.info(`${endpoint}`);
    console.info(`json=${ json }`);
    console.info(`xdebug=${ GLOBAL.xdebug }`);
    console.info('*****************************************');

    return this._http.post(this.url + endpoint, params, {
      params: new HttpParams().set('XDEBUG_SESSION_START', GLOBAL.xdebug),
      headers:headers,
      observe: 'response'
    })
      .pipe(map((resp: any) => resp));
  }

  baseAuthRequest(obj, endpoint){
    let json = JSON.stringify(obj, endpoint);
    let params = "json="+json+"&authorization="+this.getToken();
    let headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded'
    });

    console.info('*****************************************');
    console.info(`${endpoint}`);
    console.info(`json=${ json }`);
    console.info(`xdebug=${ GLOBAL.xdebug }`);
    console.info('*****************************************');
    console.info(`auth=${ this.getToken() }`);
    console.info('*****************************************');

    return this._http.post(this.url + endpoint, params, {
      params: new HttpParams().set('XDEBUG_SESSION_START', GLOBAL.xdebug),
      headers:headers,
      observe: 'response'
    })
      .pipe(map((resp: any) => resp));
  }


}
