import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from "@ionic-native/splash-screen";
import { SelectGamePage } from "../select-game/select-game";
import { LoginPage } from "../login/login";
import { CongratulationPage } from "../congratulation/congratulation";
import { TryAgainPage } from "../try-again/try-again";
import { ClubsPage } from "../clubs/clubs";
import { CheckPaymentPage } from "../check-payment/check-payment";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  rootPage:any =SelectGamePage;

  constructor(public navCtrl: NavController, 
  public viewCtrl: ViewController, public splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
       this.splashScreen.hide();
 
    setTimeout(() => {
      this.viewCtrl.dismiss();
      if(!localStorage.getItem("user")){
        this.rootPage=LoginPage;
      }
      this.navCtrl.push(this.rootPage);
    }, 1000);
 
  }

}
