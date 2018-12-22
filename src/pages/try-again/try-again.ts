import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectGamePage } from "../select-game/select-game";
import { CommonService } from "../../providers/common-service/common-service";

/**
 * Generated class for the TryAgainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-try-again',
  templateUrl: 'try-again.html',
})
export class TryAgainPage {
user:any;
totalQuestions:any;
rightAnswer:any;
timeout:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public commonService:CommonService) {
    this.user=this.commonService.getUserInfoByKey();
    this.totalQuestions=parseInt(localStorage.getItem("totalQuestions"));
    this.rightAnswer=parseInt(localStorage.getItem("rightAnswer"));
    this.timeout=JSON.parse(localStorage.getItem("timeout"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TryAgainPage');
  }
  goToSelectGame(){
    this.navCtrl.push(SelectGamePage);
  }

}
