import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faUser, faRegistered, faVideo } from "@fortawesome/free-solid-svg-icons";
// FAICONS DOCS ->  https://github.com/FortAwesome/angular-fontawesome/blob/d546906822d6076f3446af787e3fdbb797bf587e/docs/usage/features.md#basic-use

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app-mitube';
  faUser = faUser;
  faRegistered = faRegistered;
  faVideo = faVideo;

  constructor(
    private route: ActivatedRoute
  ) {
  }
}
