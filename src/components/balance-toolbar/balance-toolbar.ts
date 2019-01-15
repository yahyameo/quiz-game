import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { QuizService } from "../../providers/quiz-service/quiz-service";
import { CommonService } from "../../providers/common-service/common-service";

/**
 * Generated class for the BalanceToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'balance-toolbar',
  templateUrl: 'balance-toolbar.html'
})
export class BalanceToolbarComponent {

  text: string;
  @Output() walletBalance = new EventEmitter();
  //walletBalance: any = { balance: 0, coins: 0 };
  constructor(public quizService: QuizService,
    public commonService: CommonService) {
    console.log('Hello BalanceToolbarComponent Component');
    this.getBalance();
    this.updateBalance();
  }
  updateBalance() {
    this.commonService.notifyObservable$.subscribe((res) => {
      this.getBalance()
    });
  }
  getBalance() {
      this.quizService.getWalletBalance().subscribe(data => {
        this.walletBalance = data["data"];
      }, error => {

      })
  }
}
