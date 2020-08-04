import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import {
  AngularFirestoreDocument
} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationRef:any
  notificationcollectionRef:AngularFirestoreCollection<unknown>;
  constructor(private db: AngularFirestore) {  
    this.notificationcollectionRef = db.collection("notification");
 
   }


   getnotifications(uid): any {
    return  this.db.collection("notification").doc(uid).collection("Received").get();
   
  }
  //Create Customer ListingBuyer
  async createDateCustomer(uid,docid,notification) {
 //Create Customer ListingBuyer

  return  this.db
      .collection("notification")
     .doc(uid)
     .collection("Received")
     .doc(docid)
     .set(Object.assign({},notification))
     .then(function(data) {
       console.log("Document successfully written!");
     });
   return true;

   }
 
}
