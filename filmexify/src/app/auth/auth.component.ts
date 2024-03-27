import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private formBuilder: FormBuilder, private _api: AuthService) { }
  registerForm!: FormGroup;

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      city: ['']
    });
  }

  onSubmit() {
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}
