import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MusicService } from '../../services/music.service';
import { Album } from '../../models/album.model';
import { Group } from '../../models/group.model';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.scss']
})
export class ViewAlbumComponent implements OnInit {

  isModified: boolean= false;
  album: Album;
  progressBar: String;
  countLike: number;

  viewFormUpdateDescription: boolean= false;
  viewFormAddSong: boolean= false;
  songForm: FormGroup;
  descriptionForm: FormGroup;
  
  constructor(private musicService: MusicService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let group= new Group('');
    this.album= new Album(group, '', 0);
    const id= this.route.snapshot.params['id'];
    this.musicService.getAlbumById(+id).then(
      (album: Album) => {
        this.album= album;
        this.countLike= this.album.dislikeCount+this.album.likeCount;
				let pourcent= this.album.likeCount/(this.countLike)*100;
				this.progressBar= this.countLike === 0 ? "50%" : pourcent+"%";
      }
    );
  }

  onFormAddSong() {
    this.songForm= this.formBuilder.group({
      title: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]]
    })
    this.viewFormAddSong= true;
  }

  onSubmitUpdateDescription(){
    if(this.album.description !== this.descriptionForm.get('description').value) {
      this.album.description= this.descriptionForm.get('description').value;
      this.isModified= true;
    }
    this.viewFormUpdateDescription= false;
  }

  onSubmitDeleteSong(i) {
    this.album.songs.splice(i, 1);
    this.isModified= true;
  }

  onSubmitAddSong() {
    const title= this.songForm.get('title').value;
    const number= this.songForm.get('number').value;
    let song= new Song(number, title);
    this.album.songs.push(song);
    this.isModified= true;
  }

  onUpdateDescription(){
    this.viewFormUpdateDescription= true;
    this.descriptionForm= this.formBuilder.group({
      description: [this.album.description, Validators.required]
    })
  }

  onSubmit() {
    this.musicService.updateAlbum(this.album);
    this.viewFormAddSong= false;
    this.isModified= false;
  }
}
