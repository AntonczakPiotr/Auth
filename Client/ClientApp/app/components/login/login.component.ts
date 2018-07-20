import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Credentials } from "../../models/credentials.interface";
import { UserService } from "../../shared/services/user.service";

@Component({
    selector: "app-login-form",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription;

    brandNew: boolean = false;
    errors: string = "";
    isRequesting: boolean = false;
    submitted: boolean = false;
    credentials: Credentials = { email: "", password: "" };

    constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param["brandNew"];
                this.credentials.email = param["email"];
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    login({ value, valid }: { value: Credentials, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = "";
        if (valid) {
            this.userService.login(value.email, value.password)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigate(["/todo"]);
                        }
                    },
                    error => this.errors = error);
        }
    }
}
