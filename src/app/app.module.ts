import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoteComponent } from './vote/vote.component';
import { CameraComponent } from './camera/camera.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    LoginComponent,
    CameraComponent,
    LayoutComponent
  ]
})
@NgModule({
  declarations: [AppComponent, CameraComponent, VoteComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    // Material
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    // Routing
    RouterModule.forRoot([
      { path: '', redirectTo: 'layout', pathMatch: 'full' },
      {
        path: 'layout',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'vote', pathMatch: 'full' },
          { path: 'vote', component: VoteComponent },
          { path: 'camera', component: CameraComponent }
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
