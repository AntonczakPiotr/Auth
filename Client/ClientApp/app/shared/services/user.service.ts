import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { UserRegistration } from "../../models/user.registration.interface";

import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/Rx";

import { LocalStorage } from "@ngx-pwa/local-storage";

// Add the RxJS Observable operators we need in this app.
import "../../rxjs-operators";
@Injectable()

export class UserService {

    baseUrl: string = "http://localhost:61827/api";

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private localStorage: LocalStorage

    private loggedIn = false;

    constructor(private http: Http, _localStorage: LocalStorage) {
        this.localStorage = _localStorage;
        this.localStorage.getItem("auth_token").subscribe(data => {
            // Done
            this.loggedIn = data !== null;
        }, () => {
            // Error
        });

        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
    }

    register(email: string, password: string, firstName: string, lastName: string): Observable<UserRegistration> {
        let body = JSON.stringify({ email, password, firstName, lastName });
        let headers = new Headers({ 'Content-Type': "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/account", body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    login(userName: string, password: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http
            .post(
                this.baseUrl + "/Auth/login",
                JSON.stringify({ userName, password }), { headers }
            )
            .map(res => {
                let jwtToken = JSON.parse(res.json());
                this.localStorage.setItem("auth_token", jwtToken.auth_token).subscribe(() => {
                    this.loggedIn = true;
                    this._authNavStatusSource.next(this.loggedIn);
                }, () => { });

                return true;
            })
            .catch(this.handleError);
    }

    logout() {
        this.localStorage.removeItem("auth_token").subscribe(obj => {
            this.loggedIn = false;
            this._authNavStatusSource.next(false);
        });

    }

    isLoggedIn() {
        return this.loggedIn;
    }

    protected handleError(error: any) {
        var applicationError = error.headers.get("Application-Error");

        // either applicationError in header or model error in body
        if (applicationError) {
            return Observable.throw(applicationError);
        }

        var modelStateErrors: string = "";
        var serverError = error.json();

        if (!serverError.type) {
            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + "\n";
            }
        }

        modelStateErrors = modelStateErrors = "" ? "" : modelStateErrors;
        return Observable.throw(modelStateErrors || "Server error");
    }
}

