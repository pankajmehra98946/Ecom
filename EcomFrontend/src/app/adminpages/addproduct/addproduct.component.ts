import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }
  categories:any;
  formdata:any;
  submitted = false;
  subcategories:any;
  ngOnInit() { 
    
    this.formdata = this.formBuilder.group({
      product_name: ['', [Validators.required]],
      product_discription: ['', [Validators.required]],
      product_price: ['', [Validators.required]],
      product_image: [''],
      product_imagename: [''],
      product_quantity: ['', [Validators.required]],
      product_category: ['', [Validators.required]],
       product_subcategory: ['', [Validators.required]],
       product_nestedsubcategory: ['', [Validators.required]],
     
    });


    this.service.showCategory().subscribe({
      next: data => {

        var dataarry=data.data;
        this.categories =  dataarry.filter((element:any) => {
       
            return element['parent_id']=="0";
 
        });
         
       
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
 } 
 get f() {
  return this.formdata.controls;
  }

  file:any;
  imageSrc:any = '';
  status:boolean = false;
  imagename:any;
  onFileChanged(event:any) {
    this.status = false;
    this.imagename=event.target.files[0].name;
    this.readFile(event).then(data =>{
      this.formdata.get('product_image').setValue(data);
      this.formdata.get('product_imagename').setValue(event.target.files[0].name);
    });;
 
  }

   readFile(file:any){
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.readAsDataURL(file.target.files[0]);  
      fr.onload = () => {
        resolve(fr.result )
      };
    
    });
  }
  onClickSubmit() {
    this.submitted = true;

    const formData= new FormData();

    formData.append('product_image', this.formdata.get('product_image').value);
    formData.append('product_imagename',this.formdata.get('product_imagename').value );
    
   
   // console.log(this.formdata.value);
    this.service.insertProduct(this.formdata.value).subscribe({
      next: data => {
          console.log(data);
       
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('product created successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }


    //get sub cat
    changeCategory(e:any){
      console.log(e.target.value);
      this.service.showCategory().subscribe({
        next: data => {
  
          var dataarry=data.data;
         
          this.subcategories =  dataarry.filter((element:any) => {
         
              return element['parent_id']==e.target.value;
   
          });
          console.log(this.subcategories);
           
         
        },
        error: error => {
          this.toastr.error('please enter valid credentials');
            
        }
        
    });
   

    }


    nestedcat:any;
     //get nestedsub cat
     changesubCategory(e:any){
      console.log(e.target.value);
      this.service.showCategory().subscribe({
        next: data => {
  
          var dataarry=data.data;
         
          this.nestedcat =  dataarry.filter((element:any) => {
         
              return element['parent_id']==e.target.value;
   
          });
          console.log(this.nestedcat);
           
         
        },
        error: error => {
          this.toastr.error('please enter valid credentials');
            
        }
        
    });
   

    }

}
