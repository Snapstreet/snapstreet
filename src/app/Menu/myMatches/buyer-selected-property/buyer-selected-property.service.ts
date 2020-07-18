import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { matchesBuyer } from "../../../Model/matchesBuyer";
import { matchesSeller } from "../../../Model/matchesSeller";
@Injectable({
  providedIn: 'root'
})

export class BuyerSelectedPropertyService {
  return:any
  constructor(private db: AngularFirestore) { 
 

    
   }
     //create Database Buyer Matches
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
}
