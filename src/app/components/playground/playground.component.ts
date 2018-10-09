import { AlertService, SeoService } from '../../services';

declare let window: any;

import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
    renderer = '';
    title = 'Play Ground';
    today: number = Date.now();
    minutes = 0;
    gender = 'female';

    inc(i: number): void {
        this.minutes = Math.min(5, Math.max(0, this.minutes + i));
    }
    male(): void { this.gender = 'male'; }
    female(): void { this.gender = 'female'; }
    other(): void { this.gender = 'other'; }

    constructor(@Inject(PLATFORM_ID) private platformId: string,
                @Inject(LOCALE_ID) public locale: string,
                private seo: SeoService,
                public alert: AlertService) {}

    ngOnInit(): void {
        this.renderer = isPlatformBrowser(this.platformId) ? 'Browser' : 'Server';
        // console.log('LOCALE_ID:', this.locale);

        this.seo.generateTags({
            title: this.title,
            description: this.title
        });
    }

    openAlert(): void {
        this.alert.success('This is alert test');
        if (isPlatformBrowser(this.platformId))
            window.alert('Yes it is!');
    }
}