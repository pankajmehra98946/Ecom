import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
 
   APIEndpoint = environment.apiUrl;
   token =localStorage.getItem('token');
   admintoken =localStorage.getItem('admintoken');
   
   
   headers= new HttpHeaders()
  .set('Accept', 'application/json');
  



  getAllPosts(){
    console.log(this.token);
    return this.http.get<any>(this.APIEndpoint+'/products/show_product.php', { 'headers': this.headers });
  }


  
  getoneproduct(id:any){
   
    return this.http.get<any>(this.APIEndpoint+'/products/show_product.php?id='+id, { 'headers': this.headers });
  }
  getproductsubcatebase(id:any){
   
    return this.http.get<any>(this.APIEndpoint+'/products/show_product.php?subid='+id, { 'headers': this.headers });
  }
  getproductnestedsubcatebase(id:any){
   
    return this.http.get<any>(this.APIEndpoint+'/products/show_product.php?nestedid='+id, { 'headers': this.headers });
  }



  deleteProduct(id:any){
    var headers= new HttpHeaders()
    .set('Authorization', 'Bearer '+this.admintoken);
    return this.http.get<any>(this.APIEndpoint+'/products/delete_product.php?id='+id, { 'headers': headers });
  }


  // update product

  upateProduct(data:any){
   // console.log(data.product_image);
    var headers= new HttpHeaders()
  .set('Authorization', 'Bearer '+this.admintoken);
  
 
    return this.http.post<any>(this.APIEndpoint+'/products/update_product.php',data, { 'headers': headers });

  }


  // insert post

  insertProduct(data:any){
    console.log(data.product_image);
    var headers= new HttpHeaders()
  .set('Authorization', 'Bearer '+this.admintoken);
  
 
    return this.http.post<any>(this.APIEndpoint+'/products/create_product.php',data, { 'headers': headers });

  }

  // add new category


  insertCategory(data:any){
   
    
    var headers= new HttpHeaders()
  
  .set('Authorization', 'Bearer '+this.admintoken);
  
 
    return this.http.post<any>(this.APIEndpoint+'/category/create_category.php',data, { 'headers': headers });

  }
  

  //show all category


  showCategory(){
   
    
    var headers= new HttpHeaders()
  
  .set('Authorization', 'Bearer '+this.admintoken);
  
 
    return this.http.get<any>(this.APIEndpoint+'/category/show_category.php',{ 'headers': headers });

  }


  // show orders according users

  getorders(){
    
  var user_id= localStorage.getItem("user_id");

    var headers= new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer'+this.token);
    return this.http.get<any>(this.APIEndpoint+'/order/show_order.php?id='+user_id, { 'headers': this.headers });
  }


//all orders
getallorders(){
    var headers= new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer'+this.token);
    return this.http.get<any>(this.APIEndpoint+'/order/show_order.php', { 'headers': this.headers });
  }
 // show users all

 showUsers(){
  var headers= new HttpHeaders()
  
  .set('Authorization', 'Bearer '+this.admintoken);
  
 
    return this.http.get<any>(this.APIEndpoint+'/users/show_user.php',{ 'headers': headers });


    
 }

 // delete user


 deleteUser(id:any){
  var headers= new HttpHeaders()
  .set('Authorization', 'Bearer '+this.admintoken);
  return this.http.get<any>(this.APIEndpoint+'/users/delete_user.php?id='+id, { 'headers': headers });
}


// forget password

forgetPassword(data:any){
 

  return this.http.post<any>(this.APIEndpoint+'/users/reset_password.php',data);

}

// update password

updatePassword(data:any){
 

  return this.http.post<any>(this.APIEndpoint+'/users/update_password.php',data);

}


// create coupon service

createCoupon(data:any){
  var headers= new HttpHeaders()
.set('Authorization', 'Bearer '+this.admintoken);
  return this.http.post<any>(this.APIEndpoint+'/coupon/create_coupon.php',data, { 'headers': headers });

}

// show coupon service

showSingleCoupon(code:any){

  return this.http.get<any>(this.APIEndpoint+'/coupon/show_coupon.php?code='+code);

}

// show coupon service

showSingleCouponbyid(id:any){

  return this.http.get<any>(this.APIEndpoint+'/coupon/show_coupon.php?id='+id);

}

// show all coupon service

showCoupons(){

  return this.http.get<any>(this.APIEndpoint+'/coupon/show_coupon.php');

}


// update coupon
updateCoupon(data:any){
  var headers= new HttpHeaders()
.set('Authorization', 'Bearer '+this.admintoken);
  return this.http.post<any>(this.APIEndpoint+'/coupon/update_coupon.php',data, { 'headers': headers });

}
// update coupon
deleteCoupon(id:any){
  var headers= new HttpHeaders()
.set('Authorization', 'Bearer '+this.admintoken);
  return this.http.get<any>(this.APIEndpoint+'/coupon/delete_coupon.php?id='+id, { 'headers': headers });

}

// update coupon
insertReview(data:any){
  var headers= new HttpHeaders()
.set('Authorization', 'Bearer '+this.admintoken);
  return this.http.post<any>(this.APIEndpoint+'/review/create_review.php',data, { 'headers': headers });

}



// show coupon
showReview(){
 
  return this.http.get<any>(this.APIEndpoint+'/review/show_review.php');

}

}
