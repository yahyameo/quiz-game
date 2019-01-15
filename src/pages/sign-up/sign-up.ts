import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { AuthService } from "../../providers/auth/auth";
import { UserService, User } from "../../providers/user/user";
import * as firebase from 'firebase/app';
import { HomePage } from "../home/home";
import { CommonService } from "../../providers/common-service/common-service";
import { PictureUtils } from "../../providers/pictureUtils.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginPage } from "../login/login";
import { SelectGamePage } from "../select-game/select-game";

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
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
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
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class SignUpPage {
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  userId: any;
  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl(''),
  });
  constructor(public navCtrl: NavController,
    public authService: AuthService, public loadingCtrl: LoadingController,
    public commonService: CommonService, public toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {

  }
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    if (this.formGroup.invalid) {
      this.commonService.presentToast('All fields are required', 60000);
      return false
    }
    else if(this.formGroup.value.phone.length!=10)
    {
      this.commonService.presentToast('Please enter 10 digit Phone number', 60000);
      return false 
    }
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.authService.signup(this.formGroup.value)
      .subscribe(
      data => {
        console.log("POST Request is successful ", data);
        if (data["success"]) {
          this.authService.login(this.formGroup.value).subscribe(
            data => {
              loading.dismiss();
              this.commonService.notifyWhenBalanceChange();
              localStorage.setItem("user", JSON.stringify(data["data"]));
              this.navCtrl.push(SelectGamePage, {
                newUser: true
              });
            },
            error => {
              console.log("Error", error);
              loading.dismiss();
            }
          );
        }
        else if (data["message"]["email"])
         { 
           this.commonService.presentToast(data["message"]["email"][0], 4000);
           loading.dismiss();
         }

        else if (data["message"]["mobile_no"])
          this.commonService.presentToast(data["message"]["mobile_no"][0], 4000);
          loading.dismiss();

      },
      error => {
        console.log("Error", error);
        loading.dismiss();
      }
      );
  }

  get name() {
    return this.formGroup.get('name')
  }
  get email() {
    return this.formGroup.get('email')
  }
  get phone() {
    return this.formGroup.get('phone')
  }
  get password() {
    return this.formGroup.get('password')
  }
 public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
      // invalid character, prevent input

    }
  }

}