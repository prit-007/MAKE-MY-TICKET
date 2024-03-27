import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http : HttpClient) { }
  baseUrl = 'http://localhost:1969/'
  
  signUp(user:any){
    return this._http.post("${baseUrl}signup", JSON.stringify(user))
  }
  signIn(user: any) {
    return this._http.post("${baseUrl}signup", JSON.stringify(user))
  }
}
