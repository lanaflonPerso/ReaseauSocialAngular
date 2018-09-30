import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { URL } from '../../config/app.const'

@Component({
    selector: 'app-view-like',
    templateUrl: './view-like.component.html',
    styleUrls: ['./view-like.component.scss']
})
export class ViewLikeComponent implements OnInit {

    @Input() id: number;
    @Input() dislikeCount: number;
    @Input() progressBar: number;
    @Input() likeCount: number;

    likeForm: FormGroup;
    dislikeForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private httpClient: HttpClient) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.likeForm= this.formBuilder.group({
            id: [this.id]
        });
        this.dislikeForm= this.formBuilder.group({
            id: [this.id]
        })
    }

    onLike() {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get(URL+"/like/"+this.id)
                .subscribe(
                    (data) => {
                        console.log(data);
                        resolve(data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    onDislike() {
        return new Promise(
            (resolve, reject) => {
                this.httpClient
                .get(URL+"/dislike/"+this.id)
                .subscribe(
                    (data) => {
                        console.log(data);
                        resolve(data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }
}
