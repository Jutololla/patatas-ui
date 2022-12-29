import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	form = new FormGroup({
		username: new FormControl('', [ Validators.required ]),
		password: new FormControl('', [ Validators.required ])
	});
	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';

	constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
			this.router.navigateByUrl('/list');
		}
	}

	onSubmit(): void {
		const { username, password } = this.form.value;
/* 		this.authService
			.login(username, password) */
			this.authService.login("patata","MrPotat0")
			.subscribe({
				next: (data) => {
          if(data){
					const { Token, ...userData } = data;
					this.tokenStorage.saveToken(Token);
					this.tokenStorage.saveUser(userData);

					this.isLoginFailed = false;
					this.isLoggedIn = true;
					this.router.navigateByUrl('/list');
				
        }
				},
				error: (err) => {
					this.errorMessage = err.error.message;
					this.isLoginFailed = true;
				}
			});
	}
  setErrors(){
    this.form.errors
  }

/* 	reloadPage(): void {
		window.location.reload();
	} */
}
