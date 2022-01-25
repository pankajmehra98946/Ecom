import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistationService {

  constructor(private http: HttpClient) { }
  headers= new HttpHeaders()
  .set('Accept', 'application/json');
  APIEndpoint = environment.apiUrl;
  registation(data:any){
  //  console.log(data);
    return this.http.post<any>(this.APIEndpoint+'/users/create_user.php', data, { 'headers': this.headers });
  }
}
