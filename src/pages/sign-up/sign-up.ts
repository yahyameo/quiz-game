import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth";
import { UserService, User } from "../../providers/user/user";
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";
import { CommonService } from "../../providers/common-service/common-service";
import { PictureUtils } from "../../providers/pictureUtils.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
 
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class SignUpPage {
  myPhotoURL: any;
  countryData:any;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  userId:any;
    formGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    profilePicture: new FormControl(''),
    location: new FormControl(''),
    ipAddress:new FormControl(''),
  });
  constructor(public navCtrl: NavController,
  public authService: AuthService,public userService:UserService,public loadingCtrl: LoadingController,
  public commonService:CommonService,public pictureUtils:PictureUtils,
  private actionSheetCtrl: ActionSheetController,) {
   // this.myPhotoURL="https://firebasestorage.googleapis.com/v0/b/quit-smoking-d888f.appspot.com/o/avatarPicture%2FRpCtUa2hZ6XxaTwQ5TOM14GKvZY2.jpg?alt=media&token=f58e2a34-abd6-4d64-b3d1-393f324c177c";
 this.commonService.getCurrentCountry().subscribe(data=>{
this.countryData=data;
 });
  }
  signup() {
   if(this.formGroup.invalid){
    this.commonService.presentToast('All fields are required',60000);
    return false
   }
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
    this.authService.signup(this.formGroup.value.email, this.formGroup.value.password).then(value => {
      this.formGroup.value.userId=value.uid;
      this.formGroup.value.location= this.countryData['country'];
      this.formGroup.value.ipAddress=this.countryData["query"];
     if(this.myPhotoURL){
        this.formGroup.value.profilePicture=this.myPhotoURL;
     }     
      localStorage.setItem('user', JSON.stringify(value));
      this.userService.addUser(this.formGroup.value);
      loading.dismiss();
      this.navCtrl.push(HomePage);
    });
  }
     changePicture(): void {
     
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            let result=  this.pictureUtils.uploadHandler(false);
           result.then((savedPicture) => {
           this.myPhotoURL = savedPicture.downloadURL;
         });
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
             let result=  this.pictureUtils.uploadHandler(true);
           result.then((savedPicture) => {
         this.myPhotoURL = savedPicture.downloadURL;
         });
          }
        }
      ]
    });
    actionSheet.present();
  }
   get firstName() {
    return this.formGroup.get('firstName')
  }
  get lastName() {
    return this.formGroup.get('lastName')
  }
  get email() {
    return this.formGroup.get('email')
  }
  get password() {
    return this.formGroup.get('password')
  }

}