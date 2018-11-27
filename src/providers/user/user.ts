import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireStorage } from "angularfire2/storage";
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  email: string;
  password: string;
  profilePicture:string;
  ipAddress:string;
}
export interface Ranking{
  totalCigrateSmoked:number;
  totalPenalties:number;
  Packs:number;
  isStopedSmoking:boolean;
  createdDate:any;
  isStartedSmoking:boolean;
  userId:string;
  points:number;
  days:number;
}
@Injectable()
export class UserService {
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  rankinDoc:AngularFirestoreDocument<Ranking>;
  ranking:Observable<Ranking>
  rankingCollection:AngularFirestoreCollection<Ranking[]>
  constructor(private afs: AngularFirestore,
   public storage: AngularFireStorage,) {
    console.log('Hello UserProvider Provider');

  }
  getCurrentUserInfo(_userId:any): Observable<User> {
    if (!this.getUserProfile()) {
      return null;
    }
    let userId = this.getUserProfile().uid;
    if(_userId){
      userId=_userId;
    }
    this.userDoc = this.afs.doc('users/' + userId);
   return this.user = this.userDoc.valueChanges(); 
  }
  getUserProfile(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  addUser(users: any) {
    let userId = this.getUserProfile().uid;
    this.afs.collection('/users').doc(userId).set(users).then();
  }
update(data:any) {
  if (!this.getUserProfile()) {
      return null;
    }
 this.userDoc = this.afs.doc(`users/${this.getUserProfile().uid}`);
 this.userDoc.update(data);
}
}
