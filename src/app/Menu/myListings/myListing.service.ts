import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class MyListingService {
  customersRef: any;
  SellerRef:any;
  itemscollection: any;
uid:any
  return: any;
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection("listingBuyer");
    this.SellerRef = db.collection("listingSeller");

    
  }

  getBuyerRequirement(uid): Promise<any> {
    return this.customersRef
      .doc(uid)
      .collection("requirements")
      .ref.get();
  }
  getSellerProperties(uid): Promise<any> {
    return this.SellerRef
      .doc(uid)
      .collection("properties")
      .ref.get();
  }

  deleteCoffeeOrder(uid,docid) {
   return this.SellerRef
        .doc(uid)
        .collection("properties")
        .doc(docid)
        .delete();
 }
 deleteBuyer(uid,docid) {
  return this.customersRef
       .doc(uid)
       .collection("requirements")
       .doc(docid)
       .delete();
}

}
