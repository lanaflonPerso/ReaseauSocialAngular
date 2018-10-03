import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group.model';
import { MusicService } from '../../services/music.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;
  groups: Group[];
  selectGroup: Group;

  constructor(private musicService: MusicService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.albumForm= this.formBuilder.group({
      group: ['', Validators.required],
      title: ['', Validators.required],
      releaseDate: ['', [Validators.required, Validators.pattern('[0-9]{4}')]]
    })
  }

  searchGroup(name: string) {
    if(name.length > 2) { 
      this.musicService.searchGroupByName(name).then(
        (groups: Group[]) => {
          this.groups= groups;
          console.log(groups);
        }
      );
    }
  }

  SelectGroup(id){
    this.selectGroup= this.groups[id];
    this.albumForm.patchValue({group: this.selectGroup.bandName});
    this.groups= null;
  }

  onSubmit() {
    const groupName= this.albumForm.get('group').value;
    let group: Group= new Group(groupName);
    const title= this.albumForm.get('title').value;
    const releaseDate= this.albumForm.get('releaseDate').value;
    let album: Album= new Album(group, title, releaseDate);

    this.musicService.addAlbum(album);
  }

}
