import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {VideoService} from "../video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../comment.service";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [LoginService]
})
export class CommentsComponent implements OnInit {

  public title : string = "Comentarios:";
  private id: number;
  public identity;
  public comment;
  private errorMsg: any;
  private status: any;
  public commentList = [];
  faUser = faUser;
  loading: string = 'hide';

  constructor(
    private _loginService: LoginService,
    private _videoService : VideoService,
    private _commentService : CommentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {

    this.id = +this._route.snapshot.url[1].path;

    this.identity = this._loginService.getIdentity();

    this.comment = {
      "video_id": this.id,
        "body": ""
    }

    this.getComments(this.id);

    console.log(this.commentList);

  }

  onSubmit(){

    if (this.comment.body != ''){
      this.loading = 'show';
      this._loginService.baseAuthRequest(this.comment, '/comment/new').subscribe(
        resp=>{
          this.status = resp.body.status;
          this.loading = 'hide';
          if(this.status !== 'success'){
            this.status = 'error';
          }else{
            this.commentList.push(resp.body.data);
            this.comment.body = '';
          }
        },
        error => {
          this.errorMsg = <any>error

          if (this.errorMsg != null) {

            console.log(this.errorMsg);
            alert("Error en la petición");
          }
        }
      )
    }else {
      alert("Comentario vacío");
    }
  }

  getComments(video_id){

    this._commentService.getCommentsOfVideo(video_id).subscribe(
      resp => {
        this.status = resp['status'];
        if(this.status !== 'success'){
          this.status = 'Error';
        }else{
          this.commentList = resp['data'];
        }
      },
      error => {
        this.errorMsg = <any>error

        if (this.errorMsg != null) {

          console.log(this.errorMsg);
          alert("Error en la petición");
        }
      }
    )

  }

}
