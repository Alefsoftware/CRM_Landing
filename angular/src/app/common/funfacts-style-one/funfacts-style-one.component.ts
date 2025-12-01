import { Component } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'app-funfacts-style-one',
    imports: [CountUpModule],
    templateUrl: './funfacts-style-one.component.html',
    styleUrls: ['./funfacts-style-one.component.scss']
})
export class FunfactsStyleOneComponent {}