import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../providers/auth/auth";
import { CommonService } from "../../providers/common-service/common-service";

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
  userName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonService: CommonService,
    public authService: AuthService) {
    this.userName=this.commonService.getUserInfoByKey(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectGamePage');
  }
  goToStartQuizActivity() {
    this.navCtrl.push(HomePage);
  }

}
