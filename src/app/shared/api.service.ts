import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private httpClient: HttpClient ) { }

  PostData(data : any){
    return this.httpClient.post<any>("http://localhost:3000/posts", data).pipe(
      map(
        res => {
          return res;
        }
      )
    )
  }

  getData(){
    return this.httpClient.get<any>("http://localhost:3000/posts/").pipe(
      map(
        res => {
          return res;
        }
      )
    )
  }

  deleteData(id : number){
    return this.httpClient.delete<any>("http://localhost:3000/posts/"+id).pipe(
      map(
        res => {
          return res;
        }
      )
    )
  }

  updateData(data : any, id : number){
    return this.httpClient.put<any>("http://localhost:3000/posts/"+id,data).pipe(
      map(
        res => {
          return res;
        }
      )
    )
  }

}
