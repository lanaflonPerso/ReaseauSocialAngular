import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Input() isAuth: boolean;
  commentForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private commentService: CommentService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.isAuth= true;
    this.commentForm= this.formbuilder.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    const id= this.commentForm.get('title').value;
    const content= this.commentForm.get('content').value;
    this.commentService.addComment(id, content);
    this.router.navigate(['wall/'+id]);
  }

}
