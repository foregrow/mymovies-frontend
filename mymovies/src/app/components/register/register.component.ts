import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required]
    });
  emails:string[] = [];
  emailExists = false;
  constructor(private fb: FormBuilder,
    private _us: UserService,
    private _router: Router){
    }


  ngOnInit(): void {
    this.getAllUserEmails();
    this.registerForm.valueChanges.subscribe(data =>
      {
        this.existingEmail();
      });
  }

  getAllUserEmails(){
    this._us.getAll().subscribe(
      data=>{
        let users:User[] = data;
        users.forEach((user: { email: any; }) => {
          let email = user.email;
          this.emails.push(email);
        });
      },
      error=>{console.log(error)}
    );
  }

  existingEmail(){
    
    if(this.emails.includes(this.email?.value))
      this.emailExists = true;
    else
      this.emailExists = false;
    
    
  }

  submitRegistration(){
    let email = this.email?.value;
    let password = this.password?.value;
    let data = new User(0,email,password,environment.userRole);
    this._us.add(data).subscribe(data=>{
      alert('Successfully registered! ');
      this._router.navigate(['login']);
    },error=>{
      alert("Error! Bad submition!");
    });
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
}
