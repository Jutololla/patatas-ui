import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SubscribersService } from 'src/app/services/subscribers/subscribers.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

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
	submitted = false;
	constructor(
		private route: ActivatedRoute,
		private subcribersService: SubscribersService,
		private tokenStorageService: TokenStorageService,
		private router: Router,
		private formBuilder: FormBuilder
	) {}
	ngOnInit(): void {
		this.form = this.formBuilder.group({
						full_name: [ '', Validators.required ],
						id_number: [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ] ],
						phone_number: [ '', [ Validators.required, Validators.pattern('[- +()0-9]+[0-9]') ] ],
						email_address: [ '', [ Validators.required, Validators.email ] ],
						position_name: [ '', Validators.required ],
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
		this.subcribersService.createTechnician(body).pipe(take(1)).subscribe({
			next: () => {
				/* this.return(); */
				//toast que informe que se creo el usuario con id tal
				this.form.reset()
				this.submitted = false
			}
		});
	}
}
