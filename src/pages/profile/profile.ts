import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Navbar, AlertController } from 'ionic-angular';
import { UserService, User, Ranking } from "../../providers/user/user";
import { Observable } from "rxjs";
import { CommonService } from "../../providers/common-service/common-service";
import { AuthService } from "../../providers/auth/auth";
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Navbar) navBar: Navbar;
  public person: { name: string, company: string, birthdate?: number };
  dob: any;
  age: any;
  showProfile: boolean;
  ranking: Observable<Ranking>;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService, public commonService: CommonService,
    public quizService: QuizService,
    public platform: Platform,
    public alertCtrl: AlertController) {
    let userId = navParams.get('userId');
    this.user = this.commonService.getUserInfo();
  }
  ionViewDidLoad() {
  }
  reset() {
    this.person = { name: null, company: null, birthdate: null };
    this.dob = null;
    this.showProfile = false;
  }

  save() {
    this.person.birthdate = new Date(this.dob).getTime();
    this.age = this.getAge(this.person.birthdate);
    this.showProfile = true;
    localStorage.setItem('PERSON', JSON.stringify(this.person));
  }

  getAge(birthdate) {
    let currentTime = new Date().getTime();
    return ((currentTime - birthdate) / 31556952000).toFixed(0);
  }
  updateBankDetailPopup() {
    let confirm = this.alertCtrl.create({
      title: 'Add/Edit Bank',
      inputs: [
        {
          type: 'text',
          name: 'txtbankName',
          placeholder: 'Bank name',
          id: 'txtbankName',
          value: this.user.bank_details.length > 0 ? this.user.bank_details[0]["bank_name"] : "",
        },
        {
          type: 'text',
          name: 'txtAccountHolderName',
          placeholder: 'Account holder name',
          id: 'txtAccountHolderName',
          value: this.user.bank_details.length > 0 ? this.user.bank_details[0]["account_holder_name"] : "",
        },
        {
          type: 'text',
          name: 'txtAccountNumber',
          placeholder: 'Account number',
          id: 'txtAccountNumber',
          value: this.user.bank_details.length > 0 ? this.user.bank_details[0]["account_no"] : "",
        },
        {
          type: 'text',
          name: 'txtIFSC',
          placeholder: 'IFSC',
          id: 'txtIFSC',
          value: this.user.bank_details.length > 0 ? this.user.bank_details[0]["ifsc"] : "",

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Submit',
          handler: () => {
            this.commonService.showLoading();
            let txtbankName = document.getElementById("txtbankName")["value"];
            let txtAccountHolderName = document.getElementById("txtAccountHolderName")["value"];
            let txtAccountNumber = document.getElementById("txtAccountNumber")["value"];
            let txtIFSC = document.getElementById("txtIFSC")["value"];
            let data = { "bankName": txtbankName, "accountHolderName": txtAccountHolderName, "accountNumber": txtAccountNumber, "ifsc": txtIFSC };
            this.quizService.saveUserProfile(data).subscribe(data => {
              let user = this.commonService.getUserInfo();
              user["bank_details"] = [{
                "bank_name": null, "account_holder_name": null,
                "account_no": null, "ifsc": null
              }];
              user["bank_details"][0]["bank_name"] = txtbankName;
              user["bank_details"][0]["account_holder_name"] = txtAccountHolderName;
              user["bank_details"][0]["account_no"] = txtAccountNumber;
              user["bank_details"][0]["ifsc"] = txtIFSC;
              localStorage.setItem('user', JSON.stringify(user));
              this.user=user;
              this.commonService.hideLoading();
            }, error => {
              this.commonService.hideLoading();
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
