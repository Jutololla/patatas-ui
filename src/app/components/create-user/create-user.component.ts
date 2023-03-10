import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take } from 'rxjs';
import { TechniciansService } from 'src/app/services/technicians/technicians.service';

@Component({
	selector: 'app-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: [ './create-user.component.css' ]
})
export class CreateUserComponent implements OnInit {
	id: string = '';
	subscriberInfo: any;
	form: FormGroup = new FormGroup({
		full_name: new FormControl(),
		id_number: new FormControl(),
		phone_number: new FormControl(),
		email_address: new FormControl(),
		position_name: new FormControl()
	});
	submitted:boolean = false;
	isLoading:boolean=false
	constructor(
		private techniciansService: TechniciansService,
		private router: Router,
		private formBuilder: FormBuilder,
		private notification: NzNotificationService
	) {}
	ngOnInit(): void {
		this.form = this.formBuilder.group({
			full_name: [ '', Validators.required ],
			id_number: [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ] ],
			phone_number: [ '', [ Validators.required, Validators.pattern('[- +()0-9]+[0-9]') ] ],
			email_address: [ '', [ Validators.required, Validators.email ] ],
			position_name: [ '', Validators.required ]
		});
	}
	get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	return() {
		this.router.navigateByUrl('/list');
	}

	saveData() {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}
		const body = { ...this.form.value };
		this.isLoading=true
		this.techniciansService.createTechnician(body).pipe(take(1)).subscribe({
			next: (response: any) => {
				this.notification.success('Success', `The technician was created with the id ${response.id}`, {
					nzDuration: 0,
					nzPlacement: 'topRight'
				});
				this.form.reset();
				this.submitted = false;
			},
			error: ()=>{
				this.notification.error('Error', `There was an unexpected error. Please try again`, {
					nzDuration: 0,
					nzPlacement: 'topRight'
				});
			},
			complete:()=>{
				this.isLoading=false
			}
		});
	}
}
