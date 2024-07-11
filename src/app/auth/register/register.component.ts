import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TipoAuto } from '../../models/tipo-auto.enum';
import { TipoMotore } from '../../models/tipo-motore.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,BrowserModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup ;
  tipoAutoOptions = Object.values(TipoAuto);
  tipoMotoreOptions = Object.values(TipoMotore);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confermaPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      attivo: [false],
      dataConseguimentoPatente: ['', Validators.required],
      creditoDisponibile: [0, [Validators.required, Validators.min(0)]],
      tipoAuto: ['', Validators.required],
      tipoMotore: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('registration' + this.registerForm.value);
      // Implementa la logica di invio del modulo qui
    }
  }
}