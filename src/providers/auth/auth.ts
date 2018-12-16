import { Injectable, ViewChild } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { NavController, Nav } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class AuthService {
  @ViewChild(Nav) nav: Nav;
  user: Observable<firebase.User>;
  userId:any;
  constructor(private firebaseAuth: AngularFireAuth,private http:HttpClient) {
    this.user = firebaseAuth.authState;

  }

  signup(email: string, password: string):any {
  return  this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }
get authenticated(): boolean {
  return JSON.parse(localStorage.getItem('user')) !== null;
}
 createAuthorizationHeader(headers:Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
  }
  loginWithPHP(){
        var content = {
      email: "yahyameo@gmail.com",
      password:"123456"
    };
    const httpOptions = {
     headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin':"*"
    })
};
  return this.http.post("http://quizapp.dkventures.in/api/login",
  content,httpOptions).subscribe(
            data => {
                console.log("POST Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
        );  ;

  }
  login(email: string, password: string):any {
 return   this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
// var req={
//   "email":email,
//   "password":password,
//   "headers": {
//     "content-type": "application/json",
//     "cache-control": "no-cache",
//     "Access-Control-Allow-Origin":"*"
//   }
// }
//   const headerDict = {
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }

// const requestOptions = {                                                                                                                                                                                 
//   headers: new Headers(headerDict), 
// };
//     var content = {
//       email: email,
//       password:password
//     };
//     const httpOptions = {
//      headers: new HttpHeaders({
//   'Content-Type': 'application/json',
//   'Accept': 'application/json',
//   'Access-Control-Allow-Origin':"*"
//     })
// };
//   return this.http.post("http://quizapp.dkventures.in/api/login",content,httpOptions);

  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}