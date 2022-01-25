import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data:any){

    const APIEndpoint = environment.apiUrl;

    return this.http.post<any>(APIEndpoint+'/login.php', data);
  }


  adminLogin(data:any){

    const APIEndpoint = environment.apiUrl;

    return this.http.post<any>(APIEndpoint+'/admin/login.php', data);
  }
}
