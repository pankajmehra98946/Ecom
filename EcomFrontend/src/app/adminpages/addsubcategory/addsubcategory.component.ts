import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }

  formdata:any;
  submitted = false;
  categories:any;
  cat:any=[];
  ngOnInit() { 


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
    
    this.formdata = this.formBuilder.group({
      category: ['', [Validators.required]],
      parent_id: ['', [Validators.required]],
      
    });



 } 
 get f() {
  return this.formdata.controls;
  }

 
  onClickSubmit() {
    this.submitted = true;
   
    var catdata={
      "parent_id":this.formdata.get('parent_id').value,
      "category":this.formdata.get('category').value
    }
   // console.log(this.formdata.value);
    this.service.insertCategory(catdata).subscribe({
      next: data => {
          console.log(data);
       
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('subcategory inserted successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }

}
