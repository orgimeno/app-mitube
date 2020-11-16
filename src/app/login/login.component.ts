import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public titulo: string = 'Identifícate';
  public user;
  public errorMsg;
  public identity;
  public token;

  constructor(
    private _loginService: LoginService,
    private activatedRoute: ActivatedRoute
    )
  {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let logout = +params['id'];

      if (logout === 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        window.location.href = "/login";
      }
    });

    this.user = {
      'email' : '',
      'password' : '',
      'gethash' : false
    };

    let identity = this._loginService.getIdentity();

    if(identity !== null && identity.sub){
      window.location.href = "";
    }

  }

  onSubmit(){
    this.user.gethash = false;
    this._loginService.signUp(this.user).subscribe(
      resp => {
        this.identity = resp.body;
        if(this.identity.length <= 0){
          alert("Error en el servidor");
        }else{
          if(resp.status){
            localStorage.setItem('identity', JSON.stringify(this.identity));
            // GET TOKEN hash=true
            this.user.gethash = true;
            this._loginService.signUp(this.user).subscribe(
              resp => {
                  this.token = resp.body;
                  if(this.token.length <= 0){
                    alert("Error en el servidor");
                  }else{
                    if(!this.token.status){
                        localStorage.setItem('token', this.token);

                        window.location.href = "/";
                    }
                  }
                },
              error => {
                this.errorMsg = <any> error;

                if(this.errorMsg != null){
                  console.log(this.errorMsg);
                  alert("Error en la petición");
                }
              }
            );

          }
        }

      },
      error => {
        this.errorMsg = <any> error

        if(this.errorMsg != null){

          console.log(this.errorMsg);
          alert("Error en la petición");
        }
      }
    )
  }

}
