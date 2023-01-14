import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take } from 'rxjs';
import { Technician } from 'src/app/models';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: [ './user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {
	id: string = '';
	technicianInfo: any;
	form: FormGroup = new FormGroup({
		full_name: new FormControl(),
		phone_number: new FormControl(),
		email_address: new FormControl(),
		position_name: new FormControl(),
	});
	submitted = false;
	canUserEdit: boolean = false;
	countryCodes:any[]=[]
	constructor(
		private route: ActivatedRoute,
		private subcribersService: SubscribersService,
		private tokenStorageService: TokenStorageService,
		private router: Router,
		private formBuilder: FormBuilder,		private notification: NzNotificationService
	) {}
	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.id = params['id'];
			}
		});
		this.subcribersService.getTechnicianInfoById(this.id).pipe(take(1)).subscribe({
			next: (data) => {
				const content: any = data;
				if (!!content) {
					const { id, full_name, id_number, phone_number, email_address,
						position_name, resources } = content;
					this.technicianInfo = content;
					this.form = this.formBuilder.group({
						full_name: [ full_name, Validators.required ],
						phone_number: [ phone_number, [ Validators.required, Validators.pattern('[- +()0-9]+[0-9]') ] ],
						email_address: [ email_address, [ Validators.required, Validators.email ] ],
						position_name: [ position_name, Validators.required ],
					});
				}
			},
			error: (err) => {}
		});
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

		const body:Technician = {...this.form.value, id:this.id,id_number:this.technicianInfo.id_number}
		this.subcribersService.updateTechnician(this.id, body).pipe(take(1)).subscribe({
			next: () => {
				this.notification.success('Success', `The technician information was updated`, {
					nzDuration: 0,
					nzPlacement: 'topRight'
				});
				this.submitted = false;
			},
			error:()=>{
					this.notification.error('Error', `There was an unexpected error. Please try again`, {
						nzDuration: 0,
						nzPlacement: 'topRight'
					});
			}
		});
	}
}
