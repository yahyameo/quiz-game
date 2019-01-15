import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, App } from 'ionic-angular';
import { CommonService } from "../../providers/common-service/common-service";
import { AuthService } from "../../providers/auth/auth";
import { SignUpPage } from "../sign-up/sign-up";
import { HomePage } from "../home/home";
import { SelectGamePage } from "../select-game/select-game";
import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { DataSharingService } from "../../providers/data-sharing/data-sharing";
import { MyApp } from "../../app/app.component";
 
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(
  private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController,public navCtrl: NavController,
  public commonService:CommonService,
  public authService:AuthService,
  public dataSharingService:DataSharingService,
  public appCtrl: App) { }

 public createAccount(){
   this.navCtrl.push(SignUpPage);
 }
  public login() {
    this.showLoading();
    this.authService.login(this.registerCredentials)
   .subscribe(
            data => {
              this.loading.dismiss();
              this.commonService.notifyWhenBalanceChange();
              localStorage.setItem("user",JSON.stringify(data["data"]));
              console.log("POST Request is successful ", data);
              this.navCtrl.push(SelectGamePage);
            },
            error => {
                console.log("Error", error);
                alert(error)
                 this.loading.dismiss();
            }
        ); 
 
    
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 redirectToForgotPassword(){
   this.navCtrl.push(ForgotPasswordPage);
 }
}