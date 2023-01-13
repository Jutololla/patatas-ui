import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  id: string = '';
	subscriberInfo: any;
	form: FormGroup = new FormGroup({
		Name: new FormControl(),
		Email: new FormControl(),
		CountryCode: new FormControl(),
		PhoneNumber: new FormControl(),
		Area: new FormControl(),
		JobTitle: new FormControl()
	});
	submitted = false;
	canUserEdit: boolean = false;
	countryCodes:any[]=[]
	constructor(
		private route: ActivatedRoute,
		private subcribersService: SubscribersService,
		private tokenStorageService: TokenStorageService,
		private router: Router,
		private formBuilder: FormBuilder
	) {}
	ngOnInit(): void {
		if (!this.tokenStorageService.getToken()) {
			this.router.navigateByUrl('');
		}
					this.form = this.formBuilder.group({
						Name: [ '', Validators.required ],
						Email: [ '', [ Validators.required, Validators.email ] ],
						CountryCode: [ '', [ Validators.required ] ],
						PhoneNumber: [ '', [ Validators.required, Validators.pattern('^[0-9]+$') ] ],
						Area: [ '', Validators.required ],
						JobTitle: [ '', Validators.required ]
					});
	}
	get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	return() {
		this.router.navigateByUrl('/list');
	}

	saveData() {
		this.submitted=true
		if (this.form.invalid) {
			return;
		}
		const body = { ...this.form.value, Topics: [] };
		this.subcribersService.createTechnician(body).pipe(take(1)).subscribe({
			next: () => {
				this.return()
			}
		});
	}
}
