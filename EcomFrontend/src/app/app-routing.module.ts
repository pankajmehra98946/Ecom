import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; 
import { RegistationComponent } from './pages/registation/registation.component'; 
import { HomeComponent } from './pages/home/home.component'; 

import { AuthGuard } from './providers/auth.guard';
import { LoggedinauthGuard } from './providers/loggedinauth.guard';
import { IndexComponent } from './pages/index/index.component';
import { ProductdetailsComponent } from './pages/productdetails/productdetails.component';
import { ShoppingcardComponent } from './pages/shoppingcard/shoppingcard.component';

import { AdminloginComponent } from './adminpages/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './adminpages/admindashboard/admindashboard.component';
import { OrderComponent } from './pages/order/order.component';
import { UpdateproductComponent } from './adminpages/updateproduct/updateproduct.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { EditcouponComponent } from './adminpages/editcoupon/editcoupon.component';
const routes: Routes = [
  {path:"login", component:LoginComponent , canActivate: [LoggedinauthGuard]}, 
  {path:"register", component:RegistationComponent, canActivate: [LoggedinauthGuard]}, 
  {path:"home", component:HomeComponent, canActivate: [AuthGuard]}, 
  {path:"", component:IndexComponent }, 
  {path:"index", component:IndexComponent }, 
  {path:"product/:id", component:ProductdetailsComponent}, 
  {path:"card", component:ShoppingcardComponent}, 
  {path:"myorder", component:OrderComponent, canActivate: [AuthGuard]}, 
  {path:"adminlogin", component:AdminloginComponent}, 
  {path:"admindashboard", component:AdmindashboardComponent}, 
  {path:"updateproduct/:id", component:UpdateproductComponent}, 
  {path:"forgetpassword", component:ForgetPasswordComponent}, 
  {path:"changepassword/:id", component:ChangepasswordComponent},
  {path:"editcoupon/:id", component:EditcouponComponent},  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
