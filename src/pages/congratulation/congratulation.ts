import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { TryAgainPage } from "../try-again/try-again";
import { SelectGamePage } from "../select-game/select-game";
import { CoinsPage } from "../coins/coins";
import { CommonService } from "../../providers/common-service/common-service";
import { SocialSharing } from '@ionic-native/social-sharing';
import { ClubsPage } from "../clubs/clubs";

/**
 * Generated class for the CongratulationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-congratulation',
  templateUrl: 'congratulation.html',
})
export class CongratulationPage {
@ViewChild(Navbar) navBar: Navbar;
selectedClub:any;
totalQuestions:any;
rightAnswer:string;
user:any;
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public platform:Platform,
  public commonService:CommonService,
  private socialSharing: SocialSharing) {
this.user=this.commonService.getUserInfo();
 this.totalQuestions=localStorage.getItem("totalQuestions");
 this.rightAnswer=localStorage.getItem("rightAnswer");
 this.selectedClub=this.commonService.getSelectedClubInfo();
 this.setBackButtonPressEvent();
}
goToSelectGame(){
  this.navCtrl.push(SelectGamePage);
}
goToClubs(){
  this.navCtrl.push(ClubsPage);
}
  ionViewDidLoad() {
    this.setBackButtonAction();
    console.log('ionViewDidLoad CongratulationPage');
  }
  setBackButtonPressEvent() {
    this.platform.registerBackButtonAction(() => {
      this.navCtrl.push(SelectGamePage);
    }, 1);
  }
  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(SelectGamePage);
    }
  }
goToRedeem(){
  this.navCtrl.push(CoinsPage);
}
share(){
    
//share via facebook
 this.socialSharing.share("Congratulations! ",
 "Stop smoking",null,'https://play.google.com/store').then(() => {

}).catch(() => {
  // Sharing via email is not possible
});
  }
}
