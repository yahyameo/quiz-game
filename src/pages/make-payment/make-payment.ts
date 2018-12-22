import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { QuestionsPage } from "../questions/questions";

/**
 * Generated class for the MakePaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-make-payment',
  templateUrl: 'make-payment.html',
})
export class MakePaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController) {
  }
  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
    this.navCtrl.push(QuestionsPage);
  }, 5000);
}
goToQuestion(){
this.presentLoadingDefault();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MakePaymentPage');
  }

}
