import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { response } from 'express';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm=this.fb.group({
    fullname:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  })

  constructor(private fb:FormBuilder, 
    private authService:AuthService,
    private messageService:MessageService,
    private router:Router ){}

  get email(){
    return this.registerForm.controls['email']
  }

  get fullname(){
    return this.registerForm.controls['fullname']
  }

  get password(){
    return this.registerForm.controls['password']
  }

  get confirmPassword(){
    return this.registerForm.controls['confirmPassword']
  }

  enviarUsuario(){
    console.log("Estoy enviando datos")
    const datos={...this.registerForm.value}
    delete datos.confirmPassword;

    this.authService.registerUser(datos as User).subscribe(
      response=>{
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Registro Exitosos', 
          detail: 'El usuario ha sido registrado con exito' });
        this.router.navigate(['/login'])
      },
      error=>{
        this.messageService.add(
          {
            severity:'error',
            summary:'Error alta de usuario',
            detail:'Hubo un error al agregar usuario Consulte al administrador'
          }
        )

      }
    );
    
  }
}
