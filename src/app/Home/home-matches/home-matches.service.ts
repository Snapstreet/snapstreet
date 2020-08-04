import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class HomeMatchesService {
  customersRef: any;
  SellerRef:any;
  itemscollection: any;
uid:any
  constructor(private db: AngularFirestore) {
    this.customersRef = db.collection("listingBuyer");
    this.SellerRef = db.collection("listingSeller"); }

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
}
