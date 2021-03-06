﻿import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Injectable } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

// sweet global way to handle 401s - works in tandem with existing AuthGuard route checks
// http://stackoverflow.com/questions/34934009/handling-401s-globally-with-angular-2

@Injectable()
export class AuthenticateXHRBackend extends XHRBackend {
    localStorage: LocalStorage;

    constructor(_browserXhr: BrowserXhr, _baseResponseOptions: ResponseOptions, _xsrfStrategy: XSRFStrategy, _localStorage: LocalStorage) {
        super(_browserXhr, _baseResponseOptions, _xsrfStrategy);
        this.localStorage = _localStorage;
    }

    createConnection(request: Request) {
        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error: Response) => {
            if ((error.status === 401 || error.status === 403) && (window.location.href.match(/\?/g) || []).length < 2) {

                console.log("The authentication session expired or the user is not authorized. Force refresh of the current page.");
                /* Great solution for bundling with Auth Guard! 
                1. Auth Guard checks authorized user (e.g. by looking into LocalStorage). 
                2. On 401/403 response you clean authorized user for the Guard (e.g. by removing coresponding parameters in LocalStorage). 
                3. As at this early stage you can't access the Router for forwarding to the login page,
                4. refreshing the same page will trigger the Guard checks, which will forward you to the login screen */
                this.localStorage.removeItem("auth_token").subscribe(obj => {
                    window.location.href = window.location.href + "?" + new Date().getMilliseconds();
                });
               
            }
            return Observable.throw(error);
        });
        return xhrConnection;
    }
}