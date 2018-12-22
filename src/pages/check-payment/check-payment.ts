import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MakePaymentPage } from "../make-payment/make-payment";

/**
 * Generated class for the CheckPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-payment',
  templateUrl: 'check-payment.html',
})
export class CheckPaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
goToMakePayment(){
  this.navCtrl.push(MakePaymentPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckPaymentPage');
  }

}
