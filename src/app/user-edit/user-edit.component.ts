import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UploadService} from "../services/upload.service";
import {GLOBAL} from "../services/global";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [LoginService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title:string = "Actualizar";
  public user: User;
  public errorMsg;
  public status;
  public identity;
  public filesToUpload: Array<File>;
  public resultUpload;

  constructor(
    private _loginService: LoginService,
    private _uploadService: UploadService,
    private _rote: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
    if(this.identity == null){
      this._router.navigate(['/index']);
    }else {
      this.user = new User(
        this.identity.sub,
        this.identity.role,
        this.identity.name,
        this.identity.surname,
        this.identity.email,
        this.identity.password,
        "null");
    }
  }

  onSubmit(){
    console.log(this.user);

    if(this.user.password === this.identity.password){
      this.user.password = '';
    }

    this._loginService.updateUSer(this.user).subscribe(
      resp => {
        this.status = resp.body.status

        if(this.status !== 'success'){
          this.status = "error"
        }else{
          this.user.password = this.identity.password;
          localStorage.setItem('identity', JSON.stringify(this.user));
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

  fileChangeEvent(fileInput){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    let token = this._loginService.getToken();
    let url = `${GLOBAL.url}/user/upload-image-user`;

    this._uploadService.makeFileRequest(token, url, ['image'], this.filesToUpload)
      .then(
        result => {
          this.resultUpload = result;
        },
        error => {
          console.log(error)
        }
      )

  }

}
