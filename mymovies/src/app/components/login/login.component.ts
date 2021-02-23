import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateApiService } from 'src/app/services/translate-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _us: UserService,
    private _router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }


  ngOnInit(): void {

  }

  submitLogin() {
    this._us.login(this.loginForm.value)
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.jwt);
          let loggedInUserRole = this._us.getRole();
          this._us.getRedirectedByRole(loggedInUserRole);
        },
        error => {
          alert('Wrong email/password!');
        }
      );
  }

  goToRegistration() {
    this._router.navigate(['register']);
  }


}
