import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // <-- add this
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'registor',
   imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,          
    ReactiveFormsModule    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registor.component.html',
  styleUrl: './registor.component.css'
})
export class RegistorComponent {

}
