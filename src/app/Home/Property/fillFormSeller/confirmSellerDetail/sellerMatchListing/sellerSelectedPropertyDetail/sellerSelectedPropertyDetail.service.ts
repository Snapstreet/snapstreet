import { Injectable, EventEmitter } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { expressInterest}  from "../../../../../../Model/expressInterest";
import {notification} from "../../../../../../Model/notification"
@Injectable({
  providedIn: "root",
})
export class SellerSelectedPropertyDetailService {
  customersRef: any;
  propertiesRef: any;
  return: any; 
  Userref:any;
  dataSavedEventEmitter = new EventEmitter<string>();
  matcheBuyerRef: AngularFirestoreCollection<matchesSeller> = null;
  matcheSellerRef: AngularFirestoreCollection<matchesBuyer> = null;
  expressInterestRef: AngularFirestoreCollection<expressInterest> = null;
  Interest: any;
  dbnotification ="notification";
  notificationRef:any;
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection("listingBuyer");
    this.Userref=db.collection("users");
    this.expressInterestRef = db.collection("expressInterest");
    this.Interest = db.collectionGroup("Express");
    this.notificationRef = db.collection(this.dbnotification);
  }

  //create Database Seller Matches
  async matchesSellerCreate(key, customer: matchesSeller) {
    this.return = await this.db
      .collection("matchesSeller")
      .doc(key)
      .collection("matches")
      .add({ ...customer })
      .then(function (data) {
        console.log("Document successfully written!");
      });
    return true;
  }

  async matchesBuyerCreate(key, customer: matchesBuyer) {
    this.return = await this.db
      .collection("matchesBuyer")
      .doc(key)
      .collection("matches")
      .add({ ...customer })
      .then(function (data) {
        console.log("Document successfully written!");
      });
    return true;
  }
  async ExpressInterest(uid, propertyId) {
    this.return = await this.db
      .collection("expressInterest")
      .doc(uid)
      .collection("Express")
      .add({ propertyId: propertyId })
      .then(function (data) {
        console.log("expressInterest Document seller successfully written!");
      });
    return true;
  }

  getUser(uid):any{
    return this.Userref.get();
  }
  getExpressed(uid):any
  {
     return this.Interest.get();
  }
  async createNotification(key, customer: notification) {
    this.return = await this.notificationRef
      .doc(key)
      .collection("Received")
      .add({ ...customer })
      .then(function(data) {
        console.log("Notifiaction Expressed!");
      });
    return true;
  }
}
