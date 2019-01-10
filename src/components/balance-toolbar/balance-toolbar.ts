import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from "../../providers/quiz-service/quiz-service";

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
  @Output('walletBalance') walletBalance=new EventEmitter();
//walletBalance: any = { balance: 0, coins: 0 };
  constructor(public quizService:QuizService) {
    console.log('Hello BalanceToolbarComponent Component');
    this.getBalance();
  }
getBalance() {
    this.quizService.getWalletBalance().subscribe(data => {
      this.walletBalance = data["data"];
    }, error => {

    })
  }
}
