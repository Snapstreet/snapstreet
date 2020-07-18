
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PropertyComponent } from "./Home/Property/Property.component";
import { HomeComponent } from "././Home/Home.component";
import { FillFormBuyerComponent } from "./Home/Property/fillFormBuyer/fillFormBuyer.component";
import { ConfirmSellerDetailComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/confirmSellerDetail.component";
import { BuyerMatcheListingComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerMatchListing.component";
import { SellerSelectedPropertyComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerSelectedPropertyDetail/sellerSelectedPropertyDetail.component";
import { FillFormSellerComponent } from "./Home/Property/fillFormSeller/fillFormSeller.component";
import { SellerMatchListingComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerMatchListing.component";
import { ConfirmBuyerDetailComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/confirmBuyerDetail.component";
import { MyProfileComponent } from "././Menu/myProfile/Profile.component";
import { EditProfileComponent } from "./Menu/myProfile/editProfile/editProfile.component";
import { BuyerSelectedPropertyDetailComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerSelectedPropertyDetail/buyerSelectedPropertyDetail.component";
import { MyListingComponent } from "./Menu/myListings/myListing.component";
import { PrefrencesComponent } from "./Menu/Prefrences/Prefrences.component";
import { ChatsComponent } from "./Menu/Chats/chats.component";
import { DashboardComponent } from "./Misc/components/dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./Misc/components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./Misc/components/verify-email/verify-email.component";
import { SignInComponent } from "./Misc/components/sign-in/sign-in.component";
import { FormsModule } from "@angular/forms";
import { MyMatchesComponent } from "./Menu/myMatches/myMatches.component";
import { MyMatchesSelectedDetailsComponent } from "./Menu/myMatches/my-matches-selected-details/my-matches-selected-details.component";
import { AgentSignupComponent } from "./Home/agent-signup/agent-signup.component";

import { PrivacyPolicyComponent } from "./Misc/privacy-policy/privacy-policy.component";
import { MyMatchesToSellSelectedDetailComponent } from "./Menu/myMatches/my-matches-to-sell-selected-detail/my-matches-to-sell-selected-detail.component";
import { TemplateComponent } from "./template/template.component";

import { PlusComponent } from "./Menu/plus/plus.component";


import { TermsConditionComponent } from "./terms-condition/terms-condition.component";
import { SelectAgentComponent } from "./Menu/myMatches/select-agent/select-agent.component";
import { AgentsignupformComponent } from "./Home/agentsignupform/agentsignupform.component";
import {ListingPropertyDetailComponent} from "./Menu/myListings/listing-property-detail/listing-property-detail.component"
import {ListingSellingPropertyDetailComponent} from "./Menu/myListings/listing-selling-property-detail/listing-selling-property-detail.component"
import {CookiesComponent} from "./Misc/cookies/cookies.component";
import {BuyerAwaitingDetailComponent} from "./Menu/myMatches/buyerAwaitingDetail/buyerAwaitingDetail.component"
import { BuyerSelectedPropertyComponent } from "./Menu/myMatches/buyer-selected-property/buyer-selected-property.component"
import {EditListingBuyerComponent } from "./Menu/myListings/edit-listing-buyer/edit-listing-buyer.component"
import {EditListingSellerComponent}  from "./Menu/myListings/edit-listing-seller/edit-listing-seller.component";
import {BuyerConfirmedSelectedMatchesComponent} from "./Menu/myMatches/buyer-confirmed-selected-matches/buyer-confirmed-selected-matches.component"
import {SellerConfirmedPropertyComponent} from "./Menu/myMatches/seller-confirmed-property/seller-confirmed-property.component"
import {PropertyMatchesComponent} from "./property-matches/property-matches.component";
const routes: Routes = [
  { path: "Property/:use", component: PropertyComponent },
  { path: "", component: HomeComponent },
  {
    path:
      "fillFormBuyer/:Currentpostcode/:CurrentTown/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:SearchRadius/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:CurrentAddress",
    component: FillFormBuyerComponent,
  },
  { path: "confirmSellerdetail", component: ConfirmSellerDetailComponent },
  { path: "buyerMatchlisting/:Lookingpostcode/:PropertyType/:LookingTown/:MinAmount/:MaxAmount/:latitude/:longitude/:newUser", component: BuyerMatcheListingComponent },
  {
    path:
      "SellerSelectedProperty/:MaxAmount/:Lookingpostcode/:LookingStreetname/:Position/:PropertyType/:Roomsmax/:Ownership/:Conditions/:Maxbathroom/:Maxreception/:features/:UserId/:FinancialPosition/:propertyId/:expressed",
    component: SellerSelectedPropertyComponent,
  },
  {
    path:
      "fillformseller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:features/:Country",
    component: FillFormSellerComponent,
  },
  { path: "sellerMatchlisting/:Lookingpostcode/:PropertyType/:LookingTown/:MaxAmount/:latitude/:longitude/:newUser", component: SellerMatchListingComponent },
  {
    path: "confirmbuyerdetail",
    component: ConfirmBuyerDetailComponent,
  },
  {
    path: "mymatches",
    component: MyMatchesComponent,
  },
  { path: "profile", component: MyProfileComponent },
  { path: "editprofile", component: EditProfileComponent },

  {
    path:
      "buyerSelectedPropertyDetail/:Lookingpostcode/:Lookingstate/:LookingTown/:norooms/:PropertyCondition/:MaxAmount/:LookingAddress/:ownership/:PropertyType/:features/:UserId/:MinAmount/:Maxbathrooms/:Maxrooms/:Maxreception/:propertyId/:expressed",
    component: BuyerSelectedPropertyDetailComponent,
  },
  { path: "myListing", component: MyListingComponent },
  { path: "prefrences", component: PrefrencesComponent },
  { path: "chats", component: ChatsComponent },
  { path: "sign-in", component: SignInComponent },

  { path: "dashboard", component: DashboardComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  {
    path:
      "mymatchesselecteddetail/:Lookingpostcode/:LookingAddress/:Roomsmax/:PropertyCondition/:MaxAmount/:Lookingstate/:PropertyType/:ownership/:features/:matchStatus/:propertyId/:expressed/:UserId",
    component: MyMatchesSelectedDetailsComponent,
  },  
  { path: "agentSignup", component: AgentSignupComponent },

  { path: "PrivacyPolicy", component: PrivacyPolicyComponent },
  {
    path:"MyMatchesseller/:Lookingpostcode/:FinancialPosition/:PropertyType/:Position/:matchStatus",
    
    component: MyMatchesToSellSelectedDetailComponent,
  },
  { path: "checkLogin", component: TemplateComponent },
  { path: "Plus", component: PlusComponent },

  { path: "terms", component: TermsConditionComponent },
  { path: "selectAgent/:Lookingpostcode/:Lookingstate/:LookingAddress/:norooms/:PropertyCondition/:MaxAmount/:PropertyType/:ownership/:features/:propertyId/:userId", component: SelectAgentComponent },
  { path: "Agentsignupform", component: AgentsignupformComponent },

  { path: "listingpropertydetail/:MinAmount/:MaxAmount/:Lookingpostcode/:ChainStatus/:FinancialPosition/:PropertyType/:Position/:SearchRadius/:requirement", component: ListingPropertyDetailComponent},
  { path: "listingsellerpropertydetail/:MaxAmount/:PropertyType/:Lookingpostcode/:Maxrooms/:Maxreception/:PropertyCondition/:Maxbathrooms", component: ListingSellingPropertyDetailComponent},
  { path: "cookies", component: CookiesComponent},
  {path:"awaitingResponse/:Lookingpostcode/:LookingAddress/:PropertyCondition/:MaxAmount/:Lookingstate/:PropertyType/:ownership/:features/:matchStatus" ,component:BuyerAwaitingDetailComponent},
  {path:"buyerSelcted/:Lookingpostcode/:ChainStatus/:Conditions/:SearchRadius/:Position/:MinAmount/:MaxAmount/:PropertyType/:propertyId/:expressed/:UserId" ,component: BuyerSelectedPropertyComponent},


  {path:"EditListingBuyer/:Currentpostcode/:CurrentTown/:CurrentAddress/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:SearchRadius/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:features/:docid" , component:EditListingBuyerComponent},
  {path:"editListingSeller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:features/:Country" , component:EditListingSellerComponent},
  {path:"BuyerConfirmedSelectedMatches/:Lookingpostcode/:MaxAmount/:Position/:ChainStatus/:Conditions/:SearchRadius/:Type/:propertyId/:expressed/:UserId",component:BuyerConfirmedSelectedMatchesComponent},
{path:"SellerConfirmedProperty/:LookingAddress/:Lookingpostcode/:Lookingstate/:MaxAmount/:PropertyCondition/:PropertyType/:UserId/:matchStatu/:ownership/:propertyId/:expressed",component:SellerConfirmedPropertyComponent},

{path:"potentialMatches/:Lookingpostcode/:PropertyType/:LookingTown/:MinAmount/:MaxAmount/:latitude/:longitude/:newUser" , component:PropertyMatchesComponent}

];
 
 
 @NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

