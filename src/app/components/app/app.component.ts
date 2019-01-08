import { DOCUMENT } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpStatusModel } from '../../models';
import { AlertService, PaginationService, SeoService } from '../../services';

/**
 * App Component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    /** http status */
    httpStatus$: Observable<HttpStatusModel>;

    /**
     * constructor of AppComponent
     * @param platformId: PLATFORM_ID
     * @param doc: DOCUMENT
     * @param locale: LOCALE_ID
     * @param renderer: Renderer2
     * @param router: Router
     * @param seo: SeoService
     * @param alert: AlertService
     * @param pagination: PaginationService
     */
    constructor(@Inject(PLATFORM_ID) private readonly platformId: string,
                @Inject(DOCUMENT) doc: Document,
                @Inject(LOCALE_ID) locale: string,
                renderer: Renderer2,
                public router: Router,
                public seo: SeoService,
                public alert: AlertService,
                public pagination: PaginationService) {
        renderer.setAttribute(doc.documentElement, 'lang', locale.substr(0, 2));
    }

    /**
     * ngOnInit
     */
    ngOnInit(): void {
        this.httpStatus$ = this.seo.getHttpStatus();
    }
}
