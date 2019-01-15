import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, Nav, ViewController, ActionSheetController, NavController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SelectGamePage } from "../pages/select-game/select-game";
import { AuthService } from "../providers/auth/auth";
import { LoginPage } from "../pages/login/login";
import { CommonService } from "../providers/common-service/common-service";
import { ProfilePage } from "../pages/profile/profile";
import { TryAgainPage } from "../pages/try-again/try-again";
import { ReviewAnswerPage } from "../pages/review-answer/review-answer";
import { WalletPage } from "../pages/wallet/wallet";
import { CoinsPage } from "../pages/coins/coins";
import { WalletBuyPlanPage } from "../pages/wallet-buy-plan/wallet-buy-plan";
import { CongratulationPage } from "../pages/congratulation/congratulation";
import { PictureUtils } from "../providers/pictureUtils.service";
import { SignUpPage } from "../pages/sign-up/sign-up";
import { QuizService } from "../providers/quiz-service/quiz-service";
import { Observable } from "rxjs/Observable";
import { DataSharingService } from "../providers/data-sharing/data-sharing";
import { WithdrawalLogPage } from "../pages/withdrawal-log/withdrawal-log";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, component: any, icon: string, customIcon: any }>;
  rootPage: any = SelectGamePage;
  user: Observable<any>;
  myPhotoURL: any;
  errorMsg: Observable<any>;
  constructor(
    private platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen, modalCtrl: ModalController, public authService: AuthService,
    public commonService: CommonService,
    public pictureUtils: PictureUtils,
    public actionSheetCtrl: ActionSheetController,
    public quizService: QuizService,
    public dataSharingService: DataSharingService,
    public app: App,
    public alertCtrl: AlertController
  ) {

    platform.ready().then(() => {
      this.user = this.commonService.getUserInfo();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (!localStorage.getItem("user")) {
        this.rootPage = LoginPage;
      }
      //  let splash = modalCtrl.create(SplashPage);
      //       splash.present();
    });
    this.loadPages();
    this.getUpdateProfile();
  }
  getUpdateProfile() {
    this.commonService.notifyObservable$.subscribe((res) => {
      this.user = this.commonService.getUserInfo();
    });
  }
  loadPages() {
    this.pages = [
      { title: 'Profile', component: ProfilePage, icon: 'contact', customIcon: null },
      { title: 'Cash Wallet', component: WalletPage, icon: 'card', customIcon: null },
      { title: 'Coins', component: CoinsPage, icon: 'cash', customIcon: null },
      { title: 'Withdrawal', component: WithdrawalLogPage, icon: 'cash', customIcon: null },
    ];
  }
  getFirstLetter(value) {
    if (value) {
      return (value.charAt(0)).toUpperCase();
    }
  }
  openPage(page: any) {
    this.nav.push(page.component);
  }
  loginAndLogout() {
    if (this.authService.authenticated) {
      this.user = null;
      localStorage.removeItem('user');
      this.authService.logout();
      this.nav.push(LoginPage);
    }
    else {
      this.nav.push(LoginPage);
    }
  }
  changePicture(): void {

    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.pictureUtils.captureImage();
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.pictureUtils.galleryImage();

          }
        }
      ]
    });
    actionSheet.present();
  }

}

