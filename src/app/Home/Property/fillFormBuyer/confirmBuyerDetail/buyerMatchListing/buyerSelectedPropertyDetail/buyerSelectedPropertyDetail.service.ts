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
import { matchesBuyer } from "../../../../../../Model/matchesBuyer";
import { matchesSeller } from "../../../../../../Model/matchesSeller";
import { expressInterest } from "../../../../../../Model/expressInterest";
import { StateServiceService } from "../../../../../../state-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import {notification} from "../../../../../../Model/notification"
@Injectable({
  providedIn: "root",
})

export class SelectedpropertydetailService {
  customersRef: any;
  propertiesRef: any;
  return: any;
  Userref: any;
  dataSavedEventEmitter = new EventEmitter<string>();
  dbnotification ="notification";
  matcheBuyerRef: AngularFirestoreCollection<matchesBuyer> = null;
  matcheSellerRef: AngularFirestoreCollection<matchesSeller> = null;
  expressInterestRef: AngularFirestoreCollection<expressInterest> = null;
  UserId: any;
  uid: any;
  sub: any;
  Lookingpostcode: string;
  Lookingstate: string;
  LookingTown: string;
  norooms: string;
  PropertyCondition: string;
  MaxAmount: string;
  LookingAddress: string;
  ownership: string;
  PropertyType: string;
  features: string;
  MinAmount: string;
  Maxbathrooms: string;
  Maxrooms: string;
  Maxreception: string;
  user: any;
  Interest: any;
  notificationRef:any;
  

  constructor(
    private db: AngularFirestore,
    private StateServiceService: StateServiceService,
    private _Activatedroute: ActivatedRoute
  ) {
  
    this.customersRef = db.collection("listingSeller");
    this.Userref = db.collection("users");
    this.expressInterestRef = db.collection("expressInterest");
    this.Interest = db.collectionGroup("Express");
    this.notificationRef = db.collection(this.dbnotification);
  }

  //create Database Buyer Matches
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
  async matchesSellerCreate(key, customer: matchesSeller) {
    this.return = await this.db
      .collection("matchesSeller")
      .doc(key)
      .collection("matches")
      .add({ ...customer })
      .then(function (data) {
        console.log("Document seller successfully written!");
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

  getUser(uid): any {
    return this.Userref.get();
  }
  getExpress(uid): any {
    return this.expressInterestRef.get();
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
