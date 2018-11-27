import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonService {

  constructor(private toastCtrl: ToastController,public http:HttpClient) {

}
 getCurrentCountry():any{
  var requestUrl = "http://ip-api.com/json";
 return this.http.get(requestUrl);
}
  ConvertLocalTimeToUTC(now:any)
    {
      let date=new Date(now);
       return new Date( date.getTime() + (date.getTimezoneOffset() * 60000));
    }
  ConvertUTCTimeToLocalTime(UTCDateString)
    {
        var convertdLocalTime = new Date(UTCDateString);

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours( convertdLocalTime.getHours() - hourOffset ); 

        return convertdLocalTime;
    }
presentToast(message,duration) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: duration,
    position: 'bottom',
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
  toast.dismiss();
}
}
