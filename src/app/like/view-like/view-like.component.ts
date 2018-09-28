import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view-like',
  templateUrl: './view-like.component.html',
  styleUrls: ['./view-like.component.scss']
})
export class ViewLikeComponent implements OnInit {

  @Input() dislikeCount: number;
  @Input() progressBar: number;
  @Input() likeCount: number;

  constructor() { }

  ngOnInit() {
  }

}
