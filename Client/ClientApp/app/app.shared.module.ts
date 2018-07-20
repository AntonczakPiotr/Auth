import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { XHRBackend } from "@angular/http";
import { AuthenticateXHRBackend } from "./authenticate-xhr.backend";
import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ToDoComponent } from "./components/todo/todo.component";

import { AuthGuard } from "./auth.guard";
import { UserService } from "./shared/services/user.service";
import { LocalStorageModule } from "@ngx-pwa/local-storage";
import { ToDoDataService } from "./components/todo/todo.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        LoginComponent,
        RegistrationComponent,
        ToDoComponent
    ],
    imports: [
        LocalStorageModule,
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegistrationComponent },
            { path: "todo", component: ToDoComponent, canActivate: [AuthGuard] },
            { path: "**", redirectTo: "home" }
        ])
    ],
    providers: [UserService, AuthGuard, ToDoDataService, {
        provide: XHRBackend,
        useClass: AuthenticateXHRBackend
    }]
})
export class AppModuleShared {
}
