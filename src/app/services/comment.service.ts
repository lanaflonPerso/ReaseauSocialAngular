import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment} from '../models/comment.model';
import { URL } from '../config/app.const';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

  comments: Comment[];

  constructor(private http: HttpClient){}

  init(comments: Comment[]) {
    this.comments= [];
    this.comments= comments;
  }

  addComment(id: number, content: string) {
    let url= URL+"/wall/"+id+"/add";
    let comment= new Comment(content, new Date());
    this.http.post(url, comment).subscribe(
      (e) => {
        console.log('Commentaire enregistrer!');
      },
      (error) => {
        console.log('Erreur lors de l\'envoie du message');
      }
    );
  }
}