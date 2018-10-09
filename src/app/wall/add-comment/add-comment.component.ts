import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  idBrick:number;
  @Input() isAuth: boolean;
  commentForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.idBrick = this.route.snapshot.params['id'];
    this.initForm();
  }

  initForm() {
    this.isAuth= true;
    this.commentForm= this.formbuilder.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    const content= this.commentForm.get('content').value;
    this.commentService.addComment(this.idBrick, content);
    this.router.navigate(['wall/'+this.idBrick]);
  }

}
