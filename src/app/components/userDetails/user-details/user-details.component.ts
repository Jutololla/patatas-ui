import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: [ './user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
	id: string = '';
	subscriberInfo: any;
	form: FormGroup = new FormGroup({
		name: new FormControl(''),
		email: new FormControl(''),
		countryCode: new FormControl(''),
		phoneNumber: new FormControl(''),
		Area: new FormControl(''),
		jobTitle: new FormControl(false)
	});
	submitted = false;
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
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.id = params['id'];
			}
		});
		this.subcribersService.getSubscriberInfoById(this.id).pipe(take(1)).subscribe({
			next: (data) => {
				const content: any = data;
				if (!!content) {
					this.subscriberInfo = content;
				}
			},
			error: (err) => {}
		});
		const { Name, Email, CountryCode, PhoneNumber, Area, JobTitle } = this.subscriberInfo;
		this.form = this.formBuilder.group({
			name: [ Name, Validators.required ],
			email: [ Email, [ Validators.required, Validators.email ] ],
			countryCode: [ CountryCode, [ Validators.required ] ],
			phoneNumber: [ PhoneNumber, [ Validators.required, Validators.pattern('^[0-9]+$') ] ],
			Area: [ Area, Validators.required ],
			jobTitle: [ JobTitle, Validators.requiredTrue ]
		});
	}
	get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.form.invalid) {
			return;
		}

		console.log(JSON.stringify(this.form.value, null, 2));
	}

	onReset(): void {
		this.submitted = false;
		this.form.reset();
	}
}
