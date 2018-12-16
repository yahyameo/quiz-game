import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CongratulationPage } from "../congratulation/congratulation";

/**
 * Generated class for the QuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  @ViewChild('slides') slides: any;
  timerLimit:any=30;
  maxTime: any = this.timerLimit;
  timer: any;
  hidevalue: any;
  slideOptions: any;
  flashCardFlipped: boolean = false;
  correctAnswer: any[] = ["Markoni", "Antarctica", "Indonesia",
    "UAE", "Gevora Hotel (Dubai)", "Nippon", "Trans-Canada", "Qzone", "Zeeshan Akhtar"]
  userChoosenAns: any[] = [];
  questionList: any[] = [
    {
      "question": "Who invented radio ________",
      "options": ["Markoni", "Newton", "Einstine", "Mandleve"]
    },
    {
      "question": "The largest cold desert of the world is in ___________",
      "options": ["Europe", "Antarctica", "Africa", "Asia"]
    },
    {
      "question": "Which country has the most number of active volcanoes in the world?",
      "options": ["Indonesia", "Pakistan", "India", "UK"]
    },
    {
      "question": "Which country has world’s longest zipline?",
      "options": ["UAE", "India", "Germany", "Russia"]
    },
    {
      "question": "The world’s tallest hotel is _____________?",
      "options": ["JW Marriott Marquis Hotel (Dubai)", "Gevora Hotel (Dubai)", "Marriott Marquis (NY)", "The Venetian (USA)"]
    },
    {
      "question": "The Japanese call their country as __________?",
      "options": ["Nikon", "Nippon", "Chingcho", "Ninja"]
    },
    {
      "question": "Which of the following is the longest highway _____________?",
      "options": ["Karakoram Highway", "Trans-Canada", "Highway 401", "Leh-Manali Highway"]
    },
    {
      "question": "Which of the following is not a search engine?",
      "options": ["Yahoo", "Qzone", "Bing", "Baidu"]
    },
    {
      "question": "Who is the current CEO of Q-Mobile?",
      "options": ["Anwar Saifullah Khan", "Zeeshan Akhtar", "Jawed Iqbal", "Wang Xiu Ying"]
    },
  ];
  currentQuestionIndex: any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.startTimer();
    // this.questionList 
    localStorage.setItem("totalQuestions", this.questionList.length.toString());
  }
  selectAnswer(answer: any) {
    this.maxTime = this.timerLimit;
    this.currentTimerValue = 0;
    this.startTimer();
    if (this.currentQuestionIndex != this.questionList.length - 1) {
      // setTimeout(function () {
      this.currentQuestionIndex++;
      this.userChoosenAns.push(answer);
    }
    else {
      this.userChoosenAns.push(answer);
      this.checkRightAnswer();
      this.navCtrl.push(CongratulationPage);

    }
    //  }, 2000);
  }
  checkRightAnswer() {
    var rightAnswer = 0;
    for (var i = 0; i < this.questionList.length; i++) {
      if (this.correctAnswer[i] == this.userChoosenAns[i]) {
        rightAnswer++;
      }
    }
    localStorage.setItem("rightAnswer", rightAnswer.toString());
  }
  currentTimerValue: any = 0;
  startTimer() {
    this.timer = setTimeout(x => {
    //  if (this.maxTime <= 0) { }
      this.maxTime -= 1;
      this.currentTimerValue += 1;
      if (this.maxTime >= 0) {
        this.hidevalue = false;
        this.startTimer();
      }

      else {
        this.hidevalue = true;
        this.selectAnswer("-1");
      }

    }, 1000);


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

}
