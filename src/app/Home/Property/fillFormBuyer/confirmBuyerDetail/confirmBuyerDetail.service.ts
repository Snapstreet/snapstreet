import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import {User} from '../../../../shared/services/user'
import {notification} from "../../../../Model/notification"
@Injectable({
  providedIn: 'root'
})
export class BuyerdetailService {
  customersRef: any;
  propertiesRef:any;
  userCollection:any;
  userDetail:any;
  dbnotification ="notification";
  notificationRef:any;
  return:any
  constructor(private db: AngularFirestore) {

    this.userCollection = db.collection("users")
    this.userDetail = db.collectionGroup("${user.uid}");
    this.notificationRef = db.collection(this.dbnotification);
   }

   getUserDetail(uid): any {
    return this.customersRef.get();
  }
  createUserCustomer(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData: User = {
      uid: user.uid,
      email: user.Email,
      Name :user.Name,
      DOB :user.DOB,
      Phone:user.Phone
    };
    return userRef.set(userData, {
      merge: true
    });
  }
  
  getUser(uid): any {
    return this.userCollection.get();
  }
  async createNotification(key, customer: notification) {
    this.return = await this.customersRef
      .doc(key)
      .collection("Received")
      .add({ ...customer })
      .then(function(data) {
        console.log("Document successfully written!");
      });
    return true;
  }
}
