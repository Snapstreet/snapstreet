
import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  user: any;
  uid: any;
  confirmInterest= [];

  constructor(private NotificationService:NotificationService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;
  

    this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
      this.confirmInterest.push(item.data())
     
      });
    });
  }

}
