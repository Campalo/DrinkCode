import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  routes = [{
    label: 'Vote',
    path: 'vote',
    icon: 'thumbs_up_down'
  }, {
    label: 'Map',
    path: 'map',
    icon: 'map'
  }, {
    label: 'Camera',
    path: 'camera',
    icon: 'local_see'
  }];

  constructor() { }

  ngOnInit() {
  }

}
