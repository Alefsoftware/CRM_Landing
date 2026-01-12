import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-info',
    standalone: true,
    imports: [CommonModule, HttpClientModule], // ✅ Add HttpClientModule here
    templateUrl: './contact-info.component.html',
    styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
    contactData: any = null;
    lines = Array(5);
    apiUrl = 'https://admin.realstatecrm-development.dev.alefsoftware.com/site/contactus';

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchContactData();
    }

    fetchContactData() {
        this.http.get(this.apiUrl).subscribe((res: any) => {
            if (res.status && res.data) {
                this.contactData = res.data;
            }
        }, error => {
            console.error('Error fetching contact data:', error);
        });
    }
}
