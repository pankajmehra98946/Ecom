import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { RegistationService } from '../../providers/registation.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registation',
  templateUrl: './registation.component.html',
  styleUrls: ['./registation.component.css']
})
export class RegistationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private service: RegistationService,private router: Router,private toastr: ToastrService) { }
  formdata:any;
  submitted = false;


  ngOnInit() { 
    this.formdata = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
  });
 } 

 get f() {
  return this.formdata.controls;
  }

  // after form submittion
 onClickSubmit() {
  this.submitted = true;
  this.service.registation(this.formdata.value).subscribe({
    next: data => {
        this.router.navigate(['/login']);
        this.toastr.success('registered successfully ');
    },
    error: error => {
        console.error('There was an error!', error);
        this.toastr.error('NOt registered');
    }
});

  }

}
