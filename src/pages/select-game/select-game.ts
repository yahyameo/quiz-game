import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AuthService } from "../../providers/auth/auth";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public authService:AuthService) {
   this.authService.loginWithPHP(); 
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectGamePage');
  }
  goToStartQuizActivity(){
    this.navCtrl.push(HomePage);
  }

}
