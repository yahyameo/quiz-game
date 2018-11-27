import { Injectable, ViewChild } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from 'rxjs/Observable';
import { NavController, Nav } from "ionic-angular";

@Injectable()

export class AuthService {
  @ViewChild(Nav) nav: Nav;
  user: Observable<firebase.User>;
  userId:any;
  constructor(private firebaseAuth: AngularFireAuth) {
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
  login(email: string, password: string):any {
 return   this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}