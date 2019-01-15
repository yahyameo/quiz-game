import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the QuizServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuizService {

    constructor(public http: HttpClient) {
        console.log('Hello QuizServiceProvider Provider');
    }
    getCategory() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_categories?token=" + token;
        return this.http.get(url);
    }
    getLevelId(categoryId) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_user_level/" + categoryId + "?token=" + token;
        return this.http.get(url);

    }
    getQuestionList(categoryId, levelId) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_level_questions/" + levelId + "/" + categoryId + "?token=" + token;
        return this.http.get(url);

    }
    getWalletBalance() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let user = JSON.parse(localStorage.getItem("user"));
        let token;
        if (user) token = user["token"]
        let url = "http://quizapp.dkventures.in/api/get_current_wallet?token=" + token;
        return this.http.get(url);

    }
    getWalletLog() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_wallet_log?token=" + token;
        return this.http.get(url);
    }
    getWithdrawalLog() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/withdrawal_log?token=" + token;
        return this.http.get(url);
    }
    getCoinWalletLog() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_coin_wallet_log?token=" + token;
        return this.http.get(url);
    }
    getAnswers(levelId, id: any) {
        var content = {
            "level_id": levelId,
            "id": id
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/get_answers?token=" + token;
        return this.http.post(url, content, httpOptions);

    }
    convertCoinToWallet(coins: any) {
        var content = {
            "coins": coins,
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/convert_coin_to_wallet?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    convertWalletToCoin(coins: any,offers:any) {
        var content = {
            "coins": coins,
            "offer":offers
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/convert_wallet_to_coin?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    withdraw(amount: any) {
        var content = {
            "amount": amount,
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/withdrawal?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    addWallet(amount: any) {
        var content = {
            "amount": amount,
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/add_wallet?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    addFeedback(data) {
        var content = {
            "question_id": data["questionId"],
            "user_answer": data["userAnswer"],
            "feedback": data["feedback"],
            "attachment": data["attachment"]
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/feedback?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    saveProfilePicture(file) {
        var form = new FormData();
        form.append("profile_image", file);
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "",
              //  'Accept': 'application/json',
                'Authorization':'Bearer '+ token
            })
        };
        let url = "http://quizapp.dkventures.in/api/save_profile_image";
        return this.http.post(url, form, httpOptions);
    }
    saveAnswerResult(levelId, categoryId, percentage) {
        var content = {
            "level_id": levelId,
            "category": categoryId,
            "percentage": percentage
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            })
        };
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        let url = "http://quizapp.dkventures.in/api/save_answers_result?token=" + token;
        return this.http.post(url, content, httpOptions);
    }
    saveUserProfile(data) {
        var content = {
            "bank_name": data.bankName,
            "account_no": data.accountNumber,
            "account_holder_name": data.accountHolderName,
            "ifsc":data.ifsc
        }
        let token = JSON.parse(localStorage.getItem("user"))["token"];
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'Bearer '+ token
            })
        };
        let url = "http://quizapp.dkventures.in/api/save_update_bank";
        return this.http.post(url, content, httpOptions);
    }
}
