import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
  animations: [
    trigger('swipe', [
      state('right', style({
        opacity: 0,
        transform: 'rotate(30deg)',
        transformOrigin: 'right bottom'
      })),
      state('left', style({
        opacity: 0,
        transform: 'rotate(-30deg)',
        transformOrigin: 'left bottom'
      })),
      transition(':enter', [
        style({opacity: 0,
         transform: 'translateY(100%) scale(0.9, 1.3)'
        }), 
        animate('600ms 200ms cubic-bezier(.93,.39,.39,1.71)'),        
      ]),
      transition('* => right', [
        style({transformOrigin: 'right bottom'}), 
        animate('300ms cubic-bezier(.93,.39,.39,1.71)')]),
      transition('* => left', [
        style({transformOrigin: 'left bottom'}), 
        animate(300)]),
    ])
  ]
})
export class VoteComponent implements OnInit {
  
  swipeState = 'default';
  pictures: Observable<any[]>;
  active = 0;
  
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.pictures = this.db.collection('pictures').valueChanges();
  }

  next(direction: 'right' | 'left') {
    this.swipeState = direction;
    setTimeout(() => {
      this.swipeState = '';
      this.active++;  
    }, 300)
    
  }
}
