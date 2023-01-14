import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { take } from 'rxjs';
import { Technician } from 'src/app/models';
import { TechniciansService } from 'src/app/services/technicians/technicians.service';

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
		position_name: new FormControl()
	});
	submitted = false;
	isLoading: boolean = true;
	constructor(
		private route: ActivatedRoute,
		private techniciansService: TechniciansService,
		private formBuilder: FormBuilder,
		private notification: NzNotificationService,
		private router: Router
	) {}
	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			if (params['id']) {
				this.id = params['id'];
			}
		});
		this.techniciansService.getTechnicianInfoById(this.id).pipe(take(1)).subscribe({
			next: (data) => {
				const content: any = data;
				if (!!content) {
					const { full_name, phone_number, email_address, position_name } = content;
					this.technicianInfo = content;
					this.form = this.formBuilder.group({
						full_name: [ full_name, Validators.required ],
						phone_number: [ phone_number, [ Validators.required, Validators.pattern('[- +()0-9]+[0-9]') ] ],
						email_address: [ email_address, [ Validators.required, Validators.email ] ],
						position_name: [ position_name, Validators.required ]
					});
				}
			},
			error: () => {},
			complete: () => {
				this.isLoading = false;
			}
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

		const body: Technician = { ...this.form.value, id: this.id, id_number: this.technicianInfo.id_number };
		this.isLoading = true;
		this.techniciansService.updateTechnician(this.id, body).pipe(take(1)).subscribe({
			next: () => {
				this.notification.success('Success', `The technician information was updated`, {
					nzDuration: 0,
					nzPlacement: 'topRight'
				});
				this.form.markAsPristine();
				this.submitted = false;
			},
			error: () => {
				this.notification.error('Error', `There was an unexpected error. Please try again`, {
					nzDuration: 0,
					nzPlacement: 'topRight'
				});
			},
			complete: () => {
				this.isLoading = false;
			}
		});
	}
}
