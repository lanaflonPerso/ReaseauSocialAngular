import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { URL } from '../config/app.const';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient) { }

  getByType(typeCategory: string) {
    return new Promise (
      (resolve, reject) => {
        this.http
        .get<any>(URL+"/category/"+typeCategory)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  searchCategory(name: string) {
    return new Promise (
      (resolve, reject) => {
        this.http
        .get<Category>(URL+"/category/search/"+name)
        .subscribe(
          (data) => {
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
