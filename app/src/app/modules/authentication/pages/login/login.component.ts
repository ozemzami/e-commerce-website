import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  constructor( private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private authService: AuthService) {
                this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

                this.form = this.fb.group({
                  username: ['', Validators.email],
                  password: ['', Validators.required]
                });
               }

  ngOnInit(): void {

  }


  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    console.log('hello')
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      console.log('hello')
      this.authService.login(username, password)
      .subscribe((res) => console.group(res), err => console.log(err))
    }
  }
}
