import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../providers/auth/auth";
import { CommonService } from "../../providers/common-service/common-service";
import { SurveyPage } from "../survey/survey";

/**
 * Generated class for the SelectGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-game',
  templateUrl: 'select-game.html',
})
export class SelectGamePage {
  newUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public platform: Platform) {
    this.newUser = navParams.get('newUser');
    this.setBackButtonPressEvent();
  }
  setBackButtonPressEvent() {
    this.platform.registerBackButtonAction(() => {
      this.confirmPopup();
    }, 1);
  }
  confirmPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Please Confirm',
      message: "Do you want to exit ?",
      buttons: [
        {
          text: 'NO',
          handler: () => {

          }
        },
        {
          text: 'YES',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectGamePage');
    if (this.newUser) {
      this.openCongratulationPopup();
    }
  }
  goToStartQuizActivity() {
    this.navCtrl.push(HomePage);
  }
  goToSurvey() {
    this.navCtrl.push(SurveyPage);
  }
  openCongratulationPopup() {
    let confirm = this.alertCtrl.create({
      title: '!!!Thank you for Registering with us',
      message: "You've given 400 coins as signup bonus",
      buttons: [
        {
          text: 'Got it',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

}
