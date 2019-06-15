import { Component, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition, state, style } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
  animations: [
    trigger('swipe', [
      state('right', style({
        opacity: 0,
        transform: 'rotate(45deg)',
        transformOrigin: 'right bottom'
      })),
      state('left', style({
        opacity: 0,
        transform: 'rotate(-45deg)',
        transformOrigin: 'left bottom'
      })),
      transition('* => right', [
        style({transformOrigin: 'right bottom'}), 
        animate(300)]),
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
