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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
     AuthService,
    AngularFireAuth,
    UserService,
    CommonProvider,
    CommonService,
    PictureUtils,
     Camera,
  ]
})
export class AppModule {}
