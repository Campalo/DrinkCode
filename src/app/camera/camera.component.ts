import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  // triggered when user arrives on the page
  async ngOnInit() {
    const file = await this.takePicture();
    const name = `${Math.random()}.jpeg`;
    const url = await this.uploadPicture(file, name);
    this.addPicture(url, name);
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
      height: 600,
      width: 600
    });
    const response = await fetch(image.webPath);
    return response.blob();
  }

  addPicture(url: string, name: string) {
    this.db.collection('pictures').add({
      url,
      description: 'some water',
      name,
      location: 'earth',
      date: 'today'
    });
  }

  async uploadPicture(file: Blob, name: string): Promise<string> {
    const ref = this.storage.ref(`pictures/${name}`);
    console.log(name);
    await ref.put(file);
    return ref.getDownloadURL().toPromise();
  }
}
