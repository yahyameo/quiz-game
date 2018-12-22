import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { firebaseConfig } from "../config";
import { AngularFireStorageModule } from "angularfire2/storage";
import { UserService } from "../providers/user/user";
import { CommonProvider } from "../providers/common/common";
import { PictureUtils } from "../providers/pictureUtils.service";
import { Camera } from "@ionic-native/camera";
import { AuthService } from "../providers/auth/auth";
import { CommonService } from "../providers/common-service/common-service";
import { HttpClientModule } from "@angular/common/http";
import { SignUpPage } from "../pages/sign-up/sign-up";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectGamePage } from "../pages/select-game/select-game";
import { LoginPage } from "../pages/login/login";
import { QuestionsPage } from "../pages/questions/questions";
import { FlashCardComponent } from "../components/flash-card/flash-card";
import {
  RoundProgressModule
} from 'angular-svg-round-progressbar';
import { CongratulationPage } from "../pages/congratulation/congratulation";
import { RedeemPage } from "../pages/redeem/redeem";
import { SplashPage } from "../pages/splash/splash";
import { TryAgainPage } from "../pages/try-again/try-again";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ClubsPage } from "../pages/clubs/clubs";
import { CheckPaymentPage } from "../pages/check-payment/check-payment";
import { MakePaymentPage } from "../pages/make-payment/make-payment";
import { ProgressBarComponent } from "../components/progress-bar/progress-bar";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    SelectGamePage,
    QuestionsPage,
    CongratulationPage,
    TryAgainPage,
    RedeemPage,
    SplashPage,
    ClubsPage,
    CheckPaymentPage,
    MakePaymentPage,
    FlashCardComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    SelectGamePage,
    QuestionsPage,
    CongratulationPage,
    TryAgainPage,
    RedeemPage,
    ClubsPage,
    CheckPaymentPage,
    MakePaymentPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    AngularFireAuth,
    UserService,
    CommonProvider,
    CommonService,
    PictureUtils,
    Camera,
    ScreenOrientation,

  ]
})
export class AppModule { }
