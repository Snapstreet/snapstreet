import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {
  checked = true;
  Policy: void;
  cookie: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  closeCookie()
  {
    this.Policy=localStorage.setItem("Policy", JSON.stringify(this.cookie))
  }
}
