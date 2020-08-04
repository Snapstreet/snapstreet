import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notification.service';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  user: any;
  uid: any;
  confirmInterest= [];
  now = new Date();
  docid: any;
  Lastseen: Date;
  return: Promise<void>;
  Notification:any
  constructor(private NotificationService:NotificationService,public Router:Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;

  

    this.NotificationService.getnotifications(this.uid).subscribe((ref) => {
      ref.forEach((item) => {
      this.confirmInterest.push({Detail:item.data(),id:item.id})

      });

      console.log(this.confirmInterest)
    });
  }
  getDocid(id,propertyId,time,userId,viewed,now,Type)
{
  this.Router.navigate(["/mymatches"])
this.Notification =  {

  propertyId:propertyId,
  time:time,
  userId:userId,
  viewed:viewed,
  Lastseen:now,
  Type:Type
}
 
this.Notification.Lastseen = this.now
  this.return = this.NotificationService.createDateCustomer(this.uid,id,this.Notification).then(data => {

  })
}

}
