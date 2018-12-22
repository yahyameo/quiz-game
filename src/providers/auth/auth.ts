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
    userId: any;
    constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient) {
        this.user = firebaseAuth.authState;

    }
    get authenticated(): boolean {
        return JSON.parse(localStorage.getItem('user')) !== null;
    }
    login(data) {
        var content = {
            email: data.email,
            password: data.password
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let url = "http://quizapp.dkventures.in/api/login";
        return this.http.post(url,
            content, httpOptions);
    }
    signup(data) {
        var content = {
            "email": data.email,
            "password": data.password,
            "name": data.name,
            "mobile_no": data.phone
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let url = "http://quizapp.dkventures.in/api/register";
        return this.http.post(url, content, httpOptions);

    }
    getLevelId(content) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("data"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_user_level?token=" + token;
        return this.http.get(url).subscribe(
            data => {
                console.log("POST Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
        );;

    }
    getQuestionList(content) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("data"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_level_questions?token=" + token;
        return this.http.get(url).subscribe(
            data => {
                console.log("POST Request is successful ", data);
            },
            error => {
                console.log("Error", error);
            }
        );;

    }

    logout() {
        this.firebaseAuth
            .auth
            .signOut();
    }

}