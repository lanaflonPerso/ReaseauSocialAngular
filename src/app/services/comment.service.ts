import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment} from '../models/comment.model';
import { URL } from '../config/app.const';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

  comment: Comment;
  URL= URL;

  constructor(private http: HttpClient){}

  addComment(id: number, content: string) {
    let url= this.URL+"/wall/"+id+"/add";
    this.comment= new Comment(content, new Date());
    this.http.post(url, this.comment).subscribe(
      (e) => {
        console.log('Commentaire enregistrer!');
      },
      (error) => {
        console.log('Erreur lors de l\'envoie du message');
      }
    );
  }

}