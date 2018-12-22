import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SelectGamePage } from "../pages/select-game/select-game";
import { QuestionsPage } from "../pages/questions/questions";
import { RedeemPage } from "../pages/redeem/redeem";
import { CongratulationPage } from "../pages/congratulation/congratulation";
import { SplashPage } from "../pages/splash/splash";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, statusBar: StatusBar, 
  splashScreen: SplashScreen,modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      statusBar.styleDefault();
    //  splashScreen.hide();
       let splash = modalCtrl.create(SplashPage);
            splash.present();
    });
  }
}

