import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-get-started',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {
    integration: any = null;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any>('https://admin.realstatecrm-development.dev.alefsoftware.com/site')
            .subscribe(res => {
                this.integration = res?.data?.integeration ?? null;
            });
    }
}
