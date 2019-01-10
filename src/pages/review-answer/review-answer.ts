import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CommonService } from "../../providers/common-service/common-service";
import { QuizService } from "../../providers/quiz-service/quiz-service";

/**
 * Generated class for the ReviewAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-answer',
  templateUrl: 'review-answer.html',
})
export class ReviewAnswerPage {
questionList: any[] = [];
  userChoosenAnswer:any=[];
  correctAnswer:any=[];
  selectedQuestion:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public commonService:CommonService,
  public alertCtrl: AlertController,
  public quizService:QuizService) {
  }

  ionViewDidLoad() {
    this.questionList=this.commonService.getQuestionsList();
    this.userChoosenAnswer=this.commonService.getUserChoosenAnswer();
    this.correctAnswer=this.commonService.getCorrectAnswer();
    console.log(this.userChoosenAnswer);
    console.log('ionViewDidLoad ReviewAnswerPage');
  }
  checkForWrongAnswer(_id){
     let userAnswer;
    for (var i = 0; i < this.questionList.length; i++) {
      let id=this.userChoosenAnswer[i]["id"];
      if (id == _id) {
        userAnswer=this.userChoosenAnswer[i];
        break;
      }
    }
    return userAnswer["answerId"]
  }
  checkRightAnswer(id,opt_id) {
   if(this.correctAnswer[id]==opt_id)
      return true
    else
      return false;
  }

openReviewPopup(question) {
  this.selectedQuestion=question;
    let confirm = this.alertCtrl.create({
      title: 'Review Request',
      inputs:[
      {
        type:'text',
        name:'txtExplainAnswer',
        placeholder:'Explain your answer',
        id:'txtExplainAnswer',
        
      }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
        
          }
        },
        {
          text: 'Attach File',
          handler: () => {
        
          }
        },
        {
          text: 'Submit',
          handler: () => {
            this.submitReview();
          }
        }
      ]
    });
    confirm.present();
  }
  submitReview(){
  this.commonService.showLoading();
  var feedback=  document.getElementById("txtExplainAnswer")["value"];
  let userAnswer= this.selectedQuestion["option_"+this.checkForWrongAnswer(this.selectedQuestion.id)]
  let requestData={"questionId":this.selectedQuestion.id,"userAnswer":userAnswer,"feedback":feedback};
  this.quizService.addFeedback(requestData).subscribe(
    data=>{
     this.commonService.messagePopup(data["message"]);
     this.commonService.hideLoading();
     document.getElementById("btnReview_"+this.selectedQuestion.id).style.display="none";
    },error=>{
      this.commonService.messagePopup(error);
      this.commonService.hideLoading();
    })
  }
}
