import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-features-style-one',
    templateUrl: './features-style-one.component.html',
    styleUrls: ['./features-style-one.component.scss'],
    standalone: true,
    // imports: [RouterLink], // <-- this is OK if you use it in template
})
export class FeaturesStyleOneComponent { }
