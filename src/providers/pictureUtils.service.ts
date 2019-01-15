import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
import { LoadingController, ToastController, Loading, Platform } from "ionic-angular";
import { UserService } from "./user/user";
import { CommonService } from "./common-service/common-service";
import { QuizService } from "./quiz-service/quiz-service";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

declare var window: any;

@Injectable()
export class PictureUtils {
  private basePath: string = '/avatarPicture/';
  loading: Loading;
  constructor(
    public afAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private camera: Camera,
    public cameraPlugin: Camera,
    public storage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    public userService: UserService,
    public platform: Platform,
    public commonService: CommonService,
    public quizService: QuizService,
    private transfer: FileTransfer) {

  }
  fileTransfer: FileTransferObject = this.transfer.create();

  captureDataUrl: string;

  galleryImage() {
    const gallery: CameraOptions = {
      allowEdit: true,
      destinationType: this.cameraPlugin.DestinationType.FILE_URI,
      sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      //  encodingType: this.cameraPlugin.EncodingType.JPEG,
      mediaType: this.cameraPlugin.MediaType.PICTURE,
      quality: 100,
    };
    return this.cameraPlugin.getPicture(gallery).then((filePath) => {
     let image64 = 'data:image/jpg;base64,' + filePath;
      this.quizService.saveProfilePicture(image64)
        .subscribe(data => {
          this.commonService.messagePopup(data["message"])
          this.commonService.hideLoading();
        }, error => {
          this.commonService.hideLoading();
        })
    }, error => {
      this.commonService.hideLoading();
      console.log(error);
    });
  }
  
  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      encodingType: this.cameraPlugin.EncodingType.JPEG,
      mediaType: this.cameraPlugin.MediaType.PICTURE,
      sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      targetWidth: 720,
      targetHeight: 720,
      cameraDirection: this.camera.Direction.BACK,
    }
    return await this.cameraPlugin.getPicture(options).then((filePath) => {
     let image64 = 'data:image/jpg;base64,' + filePath;
      this.quizService.saveProfilePicture(image64)
        .subscribe(data => {
          this.commonService.messagePopup(data["message"])
          this.commonService.hideLoading();
        }, error => {
          this.commonService.hideLoading();
        })
    }, error => {
      this.commonService.hideLoading();
      console.log(error);
    });
  }
  task: AngularFireUploadTask;

  progress: any;  // Observable 0 to 100

  image: string; // base64
  async createUploadTask(file: string) {
    const filePath = this.basePath + `${this.guid()}.jpg`;
    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(filePath).putString(this.image, 'data_url');
    return await this.task;
  }

  uploadHandler(fromMobile: boolean) {
    var base64;
    if (fromMobile) {
      base64 = this.galleryImage();
    }
    else {
      base64 = this.captureImage();
    }
    //return await this.createUploadTask(base64);
    return base64;
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {

      } else {

      }
    }, (err) => {
      this.commonService.messagePopup(err)
    });
  }

}
