import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  location;
  date;
  blobUrl: string;
  checkoutForm;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {}

  // triggered when user arrives on the page
  ngOnInit() {
    this.takePicture();
    this.checkoutForm = this.formBuilder.group({
      description: ''
    });
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      // The source to get the photo from
      source: CameraSource.Camera,
      // How the data should be returned
      resultType: CameraResultType.Uri,
      // The quality of image to return as JPEG, from 0-100
      quality: 90,
      // Whether to allow the user to crop or make small edits
      allowEditing: false,
      // Whether to automatically rotate the image "up" to correct for orientation in portrait mode Default: true
      correctOrientation: true
    });
    this.blobUrl = image.webPath; //this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
    // get location :
    // this.location = ...
    // get date
    // this.date = this.db....
  }

  // addPicture(url: string, name: string) {
  //   this.db.collection('pictures').add({
  //     url,
  //     description: 'waaater',
  //     name,
  //     location: 'earth',
  //     date: 'today'
  //   });
  // }

  async uploadPicture(file: Blob, name: string): Promise<string> {
    const ref = this.storage.ref(`pictures/${name}`);
    await ref.put(file);
    return ref.getDownloadURL().toPromise();
  }

  async onSubmit(description: string) {
    if (!this.blobUrl) {
      return;
    }
    const name = `${Math.random()}.jpeg`;
    const response = await fetch(this.blobUrl as string);
    const file = await response.blob();
    const url = await this.uploadPicture(file, name);
    this.db.collection('pictures').add({
      url,
      description,
      name
      // location: this.location,
      // date: this.date
    });
  }
}
