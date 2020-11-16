import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [LoginService]
})
export class DefaultComponent implements OnInit {

  public identity;
  public title = 'Portada';

  constructor(
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
  }

}
