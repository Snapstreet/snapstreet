import { Injectable } from "@angular/core";
import { listingBuyer } from "./Model/listingBuyer";
import { listingSeller } from "./Model/listingSeller"
import { agentSignup } from "./Model/agentSignup";
import { User } from "./shared/services/user";
import {sellerUser} from "./Model/sellerUser";
import {buyerUser} from './Model/buyerUser';
import {expressInterest} from "./Model/expressInterest";
@Injectable({
  providedIn: "root"
})
export class StateServiceService {
  listingBuyer: listingBuyer;
  listingSeller:listingSeller;
  agentSignup:agentSignup;
  user: User;
  buyerUser:buyerUser;
  sellerUser: sellerUser;
  expressInterest:expressInterest
  constructor() {}
}
