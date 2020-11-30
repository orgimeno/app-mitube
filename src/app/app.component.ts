import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  faUser,
  faRegistered,
  faVideo,
  faIdCard,
  faHome,
  faCog,
  faSignOutAlt,
  faDesktop, faSync, faSynagogue
} from "@fortawesome/free-solid-svg-icons";
import {LoginService} from "./services/login.service";
import {GLOBAL} from "./services/global";
// FAICONS DOCS ->  https://github.com/FortAwesome/angular-fontawesome/blob/d546906822d6076f3446af787e3fdbb797bf587e/docs/usage/features.md#basic-use

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})

export class AppComponent {
  title = 'app-mitube';
  faUser = faUser;
  faRegistered = faRegistered;
  faVideo = faVideo;
  faIdCard = faIdCard;
  faHome = faHome;
  faCog = faCog;
  faDesk = faDesktop;
  faSignOutAlt = faSignOutAlt;
  faSync = faSync;
  faWt = faSynagogue;
  public identity;
  public token;
  isSyncAnimated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _loginService: LoginService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      GLOBAL.xdebug = params['XDEBUG_SESSION_START']
    });
  }

  ngOnInit(){
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();

  }

}
