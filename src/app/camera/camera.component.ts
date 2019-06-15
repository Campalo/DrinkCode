import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  constructor(private db: AngularFirestore) {}

  async ngOnInit() {
    await this.takePicture();
    this.addPicture();
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
      correctOrientation: true,
      // Whether to save the photo to the gallery/photostream
      saveToGallery: true
      // The base64 encoded string representation of the image, if using CameraResultType.Base64.
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
  }

  addPicture() {
    this.db.collection('pictures').add({
      url: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      name: 'chiba'
    });
  }
}
