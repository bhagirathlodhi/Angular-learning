import { Component } from '@angular/core';
import { faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
    faLinkedin = faLinkedin;
    faInstagram = faInstagram;
    faFacebook = faFacebook;

}
