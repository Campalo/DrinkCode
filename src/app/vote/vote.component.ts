import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';

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
  
  constructor() { }

  ngOnInit() {
  }

  next(){

  }
}
