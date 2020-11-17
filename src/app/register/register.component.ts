import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../model/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [LoginService]
})
export class RegisterComponent implements OnInit {

  public title:string = "Registrarse";
  public user: User;
  public errorMsg;
  public status;

  constructor(
    private _loginService: LoginService,
    private _rote: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = new User(1,"user", "", "", "", "","null");
  }

  onSubmit(){
    this._loginService.register(this.user).subscribe(
      resp => {
        this.status = resp.body.status

        if(this.status !== 'success'){
          this.status = "error"
        }

      },
      error => {
        this.errorMsg = <any> error

        if(this.errorMsg != null){

          console.log(this.errorMsg);
          alert("Error en la petición");
        }
      }
    );
  }
}
