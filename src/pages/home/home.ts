import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuestionsPage } from "../questions/questions";
import { ClubsPage } from "../clubs/clubs";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
goToClubs(){
  this.navCtrl.push(ClubsPage);
}
}
