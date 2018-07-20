import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserRegistration } from "../../models/user.registration.interface";
import { UserService } from "../../shared/services/user.service";

@Component({
    selector: "app-registration-form",
    templateUrl: "./registration.component.html",
    styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

    errors: string = "";
    isRequesting: boolean = false;
    submitted: boolean = false;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }

    registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = "";
        if (valid) {
            this.userService.register(value.email, value.password, value.firstName, value.lastName)
                .finally(() => this.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            this.router.navigate(["/login"], { queryParams: { brandNew: true, email: value.email } });
                        }
                    },
                    errors => this.errors = errors);
        }
    }



}
