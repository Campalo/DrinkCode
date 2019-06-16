import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource, Geolocation, GeolocationPosition } from '@capacitor/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, query, style, stagger, animate, sequence } from '@angular/animations';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
  animations: [
    trigger('form', [
      transition(':enter', [
        query('*', [
          style({ opacity: 0, transform: 'translateY(20px)'}),
          stagger(30, animate('300ms ease-out'))
        ])
      ])
    ])
  ]
})
export class CameraComponent implements OnInit {
  public blobUrl: string;
  public location: { longitude: number, latitude: number};
  public date: Date;
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar,
  ) {}

  // triggered when user arrives on the page
  async ngOnInit() {
    this.takePicture();
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
    const position = await Geolocation.getCurrentPosition();
    this.location = position.coords;
    this.date = new Date();
    this.blobUrl = image.webPath;

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
    await ref.put(file);
    return ref.getDownloadURL().toPromise();
  }

  async submit(description: string) {
    if (!this.blobUrl) {
      return;
    }
    this.snackbar.open('Uploading your image');
    const name = `${Math.random()}.jpeg`;
    const response = await fetch(this.blobUrl);
    const file = await response.blob();
    const url = await this.uploadPicture(file, name);
    this.db.collection('pictures').add({ url, description, name });
    this.snackbar.open('Thanks for contributing', 'dismiss', { duration: 500 });
  }
}
