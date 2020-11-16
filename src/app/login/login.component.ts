import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

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
    private _loginService: LoginService
  )
  {}

  ngOnInit() {
    this.user = {
      'email' : '',
      'password' : '',
      'gethash' : false
    };

    let ident = this._loginService.getIdentity();
    let tkn = this._loginService.getToken();

    console.log(ident);
    console.log(tkn);

  }

  onSubmit(){
    this._loginService.signUp(this.user).subscribe(
      resp => {
        this.identity = resp.body;

        if(this.identity.length <= 0){
          alert("Error en el servidor");
        }else{
          if(resp.status){
            localStorage.setItem('identity', JSON.stringify(this.identity));

            this.user.gethash = true;
            this._loginService.signUp(this.user).subscribe(
              resp => {
                  this.token = resp.body;
                  if(this.token.length <= 0){
                    alert("Error en el servidor");
                  }else{
                    if(resp.status){
                      localStorage.setItem('token', this.token);
                      // TODO redirect

                    }else{
                      alert("Error en el servidor");
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
