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
import { AgentSignupComponent } from "./Home/agent-signup/agent-signup.component";

import { PrivacyPolicyComponent } from "./Misc/privacy-policy/privacy-policy.component";
import { TemplateComponent } from "./template/template.component";

import { PlusComponent } from "./Menu/plus/plus.component";


import { TermsConditionComponent } from "./terms-condition/terms-condition.component";
import { SelectAgentComponent } from "./Menu/myMatches/select-agent/select-agent.component";
import { AgentsignupformComponent } from "./Home/agentsignupform/agentsignupform.component";
import {ListingPropertyDetailComponent} from "./Menu/myListings/listing-property-detail/listing-property-detail.component"
import {ListingSellingPropertyDetailComponent} from "./Menu/myListings/listing-selling-property-detail/listing-selling-property-detail.component"
import {CookiesComponent} from "./Misc/cookies/cookies.component";
import {BuyerAwaitingDetailComponent} from "./Menu/myMatches/buyerAwaitingDetail/buyerAwaitingDetail.component"
import {EditListingBuyerComponent } from "./Menu/myListings/edit-listing-buyer/edit-listing-buyer.component"
import {EditListingSellerComponent}  from "./Menu/myListings/edit-listing-seller/edit-listing-seller.component";
import {PropertyMatchesComponent} from "./property-matches/property-matches.component";
import {MatchesBuyerComponent} from "./Menu/myMatches/matches-buyer/matches-buyer.component";
import {SellerMatchesComponent}  from "./Menu/myMatches/seller-matches/seller-matches.component";
import {MyMatchesToSellSelectedDetailComponent} from "./Menu/myMatches/my-matches-to-sell-selected-detail/my-matches-to-sell-selected-detail.component"
import {NestimatesHomeComponent} from "./Home/nestimates-home/nestimates-home.component";
import {HomeMatchesComponent}  from  "./Home/home-matches/home-matches.component";
import {PriceMatchesComponent} from './Potential/price-matches/price-matches.component';
import {AgenthomeComponent} from "./agenthome/agenthome.component";
import {SelecteddetailareaComponent}  from "./agenthome/selecteddetailarea/selecteddetailarea.component";
import {EditDetailsComponent}  from "./agenthome/edit-details/edit-details.component";
import { SelecteddetailsellerComponent }  from "./agenthome/selecteddetailseller/selecteddetailseller.component"
import { ClickhomeComponent}  from "./Home/clickhome/clickhome.component"

const routes: Routes = [
  { path: "Property/:use", component: PropertyComponent },
  { path: "", component: HomeComponent },
  {
    path:
      "fillFormBuyer/:Currentpostcode/:CurrentTown/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:CurrentAddress",
    component: FillFormBuyerComponent,
  },
  { path: "confirmSellerdetail", component: ConfirmSellerDetailComponent },
  { path: "buyerMatchlisting/:Lookingpostcode/:PropertyType/:LookingTown/:MinAmount/:MaxAmount/:latitude/:longitude/:newUser/:PropertyFor/:LookingStreetname/:Conditions/:FinancialPosition/:Validity/:Position/:UserId/:ChainStatus", component: BuyerMatcheListingComponent },
  {
    path:
      "SellerSelectedProperty/:Look_state/:Look_rooms/:Look_Propertycondition/:Look_Address/:Look_ownership/:Look_features/:Look_userId/:Look_postcode/:Look_PropertyType/:Look_maxAmount/:Look_Town/:Look_Address/:Look_Maxbathrooms/:Look_Maxreceptions/:Look_ownership/:Look_Maxrooms/:MaxAmount/:MinAmount/:Lookingpostcode/:LookingStreetname/:Position/:PropertyType/:Roomsmax/:Ownership/:Conditions/:Maxbathroom/:Maxreception/:UserId/:FinancialPosition/:propertyId/:expressed/:Look_PropertyFor/:PropertyFor/:ChainStatus",
    component: SellerSelectedPropertyComponent,
  },
  {
    path:
      "fillformseller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:Country",
    component: FillFormSellerComponent,
  },
  { path: "sellerMatchlisting/:Lookingpostcode/:PropertyType/:LookingTown/:MaxAmount/:latitude/:longitude/:newUser/:PropertyFor/:Lookingstate/:Maxrooms/:PropertyCondition/:LookingAddress/:ownership/:features/:UserId/:Maxbathrooms/:Maxreception/:ownership/:Maxrooms", component: SellerMatchListingComponent },
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
      "buyerSelectedPropertyDetail/:Look_postcodes/:Look_Streetname/:Look_condition/:Look_chainstatus/:Look_FinancialPosition/:Look_minamount/:Look_maxamount/:Look_Validity/:Look_propertytype/:Look_Position/:Look_UserId/:Lookingpostcode/:Lookingstate/:LookingTown/:PropertyCondition/:MaxAmount/:LookingAddress/:ownership/:PropertyType/:features/:UserId/:Maxbathrooms/:Maxrooms/:Maxreception/:propertyId/:expressed/:PropertyFor/:Look_PropertyFor",
    component: BuyerSelectedPropertyDetailComponent,
  },
  { path: "myListing", component: MyListingComponent },
  { path: "prefrences", component: PrefrencesComponent },
  { path: "chats", component: ChatsComponent },
  { path: "sign-in", component: SignInComponent },

  { path: "dashboard", component: DashboardComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "verify-email-address", component: VerifyEmailComponent },
  
  
  { path: "agentSignup", component: AgentSignupComponent },

  { path: "PrivacyPolicy", component: PrivacyPolicyComponent },

  { path: "checkLogin", component: TemplateComponent },
  { path: "Plus", component: PlusComponent },

  { path: "terms", component: TermsConditionComponent },
  { path: "selectAgent/:Lookingpostcode/:ChainStatus/:Conditions/:Position/:MinAmount/:MaxAmount/:Type/:propertyId/:UserId", component: SelectAgentComponent },
  { path: "Agentsignupform", component: AgentsignupformComponent },

  { path: "listingpropertydetail/:MinAmount/:MaxAmount/:Lookingpostcode/:ChainStatus/:FinancialPosition/:PropertyType/:Position/:requirement", component: ListingPropertyDetailComponent},
  { path: "listingsellerpropertydetail/:MaxAmount/:PropertyType/:Lookingpostcode/:Maxrooms/:Maxreception/:PropertyCondition/:Maxbathrooms", component: ListingSellingPropertyDetailComponent},
  { path: "cookies", component: CookiesComponent},
  {path:"awaitingResponse/:Lookingpostcode/:LookingAddress/:PropertyCondition/:MaxAmount/:Lookingstate/:PropertyType/:ownership/:features/:matchStatus" ,component:BuyerAwaitingDetailComponent},


  {path:"EditListingBuyer/:Currentpostcode/:CurrentTown/:CurrentAddress/:Currentstate/:Currentcountry/:Lookingpostcode/:LookingStreetname/:LookingTown/:Lookingstate/:Country/:FinancialPosition/:PropertyType/:Roommin/:Roomsmax/:MinAmount/:MaxAmount/:Validity/:Minbathroom/:Maxbathroom/:Minreception/:Maxreception/:Conditions/:Ownership/:features/:docid" , component:EditListingBuyerComponent},
  {path:"editListingSeller/:Lookingpostcode/:LookingAddress/:LookingTown/:Lookingstate/:PropertyType/:Maxrooms/:MaxAmount/:ownership/:Maxbathrooms/:Maxreception/:PropertyCondition/:Country/:sellerId" , component:EditListingSellerComponent},
  


{path:"potentialMatches/:Lookingpostcode/:PropertyType/:LookingTown/:MinAmount/:MaxAmount/:latitude/:longitude/:newUser" , component:PropertyMatchesComponent},

{path:"myMtachesBuyer/:Lookingpostcode/:LookingAddress/:Roomsmax/:PropertyCondition/:MaxAmount/:Lookingstate/:PropertyType/:ownership/:features/:matchStatus/:propertyId/:expressed/:UserId" , component:MatchesBuyerComponent},

{path:"matchesSeller/:Lookingpostcode/:ChainStatus/:Conditions/:Position/:MinAmount/:MaxAmount/:PropertyType/:propertyId/:expressed/:matchStatus/:UserId" , component:SellerMatchesComponent},
{path:"MyMatchesseller/:Lookingpostcode/:FinancialPosition/:PropertyType/:Position/:matchStatus" , component:MyMatchesToSellSelectedDetailComponent},
{path:"nestimatesHome", component:NestimatesHomeComponent},

{path:"homeMatches" , component:HomeMatchesComponent },
{path:"PriceMatches" , component:PriceMatchesComponent},
{path:"Agenthome",   component:AgenthomeComponent},
{path:"selectedAgentbuyerdetail/:MinAmount/:MaxAmount/:ChainStatus/:Conditions/:Lookinpostcode" , component:SelecteddetailareaComponent},
{path:"editagentDetail" , component:EditDetailsComponent},
{path:"sellerSelectedagent/:LookingAddress/:LookingTown/:Lookingpostcode/:Lookingstate/:MaxAmount/:Maxbathroom/:Maxbathrooms/:Maxreception/:PropertyCondition/:PropertyType/:Roomsmax/:ownership", component:SelecteddetailsellerComponent},
{path:"homenew" , component:ClickhomeComponent }

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
