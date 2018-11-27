import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { CommonService } from "../../providers/common-service/common-service";
import { AuthService } from "../../providers/auth/auth";
import { SignUpPage } from "../sign-up/sign-up";
import { HomePage } from "../home/home";
 
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
  public commonService:CommonService,public authService:AuthService) { }

 public createAccount(){
   this.navCtrl.push(SignUpPage);
 }
  public login() {
    this.showLoading();
    this.authService.login(this.registerCredentials.email, this.registerCredentials.password).then(value => {
      if(value){
      localStorage.setItem('user', JSON.stringify(value));
      this.navCtrl.push(HomePage);
      }
      else {
        this.showError("Access Denied");
      }
      },
      error => {
        this.showError(error);
      }); 
    
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}