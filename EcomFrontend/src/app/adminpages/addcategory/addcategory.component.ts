import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }

  formdata:any;
  submitted = false;
  ngOnInit() { 
    
    this.formdata = this.formBuilder.group({
      category: ['', [Validators.required]],
      
     
    });
 } 
 get f() {
  return this.formdata.controls;
  }

 
  onClickSubmit() {
    this.submitted = true;
   
    var catdata={
      "parent_id":0,
      "category":this.formdata.get('category').value
    }
   // console.log(this.formdata.value);
    this.service.insertCategory(catdata).subscribe({
      next: data => {
          console.log(data);
       
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('category inserted successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }

}
