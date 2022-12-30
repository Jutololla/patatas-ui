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
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.id = params['id'];
			}
		});
		this.subcribersService.getSubscriberInfoById(this.id).pipe(take(1)).subscribe({
			next: (data) => {
				const content: any = data;
				if (!!content) {
					const { Name, Email, CountryCode, PhoneNumber, Area, JobTitle } = content;
					this.subscriberInfo = content;
					this.form = this.formBuilder.group({
						Name: [ Name, Validators.required ],
						Email: [ Email, [ Validators.required, Validators.email ] ],
						CountryCode: [ CountryCode, [ Validators.required ] ],
						PhoneNumber: [ PhoneNumber, [ Validators.required, Validators.pattern('^[0-9]+$') ] ],
						Area: [ Area, Validators.required ],
						JobTitle: [ JobTitle, Validators.required ]
					});
				}
			},
			error: (err) => {}
		});
		this.getCountryCodes()
	}
	get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	toggleFormDisable(): void {
		this.form.disabled ? this.form.enable() : this.form.disable();
	}

	return() {
		this.router.navigateByUrl('/list');
	}

	saveData() {
		this.submitted=true
		if (this.form.invalid) {
			return;
		}
		const body = { ...this.form.value, Id: this.subscriberInfo.Id, Topics: this.subscriberInfo.Topics };
		this.subcribersService.updateSubscriber(body).pipe(take(1)).subscribe({
			next: () => {
				window.location.reload();
			}
		});
	}

	getCountryCodes(){
		const countryCodes=this.tokenStorageService.getCountryCodes()
		if(countryCodes){
			this.countryCodes = countryCodes
			return
		}
		this.subcribersService.getListOfCountryCodes().pipe(take(1)).subscribe({
			next: (countryCodes:any) => {
				this.countryCodes=countryCodes.Data
				this.tokenStorageService.saveCountryCodes(countryCodes.Data)
			}
		});
	}
}
