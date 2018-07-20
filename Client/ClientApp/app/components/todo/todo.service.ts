import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { ToDo } from "../../models/todo.interface"
import { LocalStorage } from "@ngx-pwa/local-storage";

@Injectable()
export class ToDoDataService {
    baseUrl: string;
    headers: Headers;

    constructor(private http: Http, private localStorage: LocalStorage) {
        this.baseUrl = "http://localhost:61790/api";

        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Access-Control-Allow-Origin", "*");


    }

    getToDoHeaders(): Promise<any> {
        let promise = new Promise((success, fail) => {
            let apiURL = `${this.baseUrl}/todo`;
            let headers = this.headers;

            this.localStorage.getItem("auth_token").toPromise().then(auth_token => {
                if (auth_token != null) {
                    headers.append("Authorization", `Bearer ${auth_token}`);

                    this.http.get(apiURL, { headers })
                        .toPromise()
                        .then(
                            res => { // Success
                                success(res.json())
                            },
                            msg => { // Error
                                fail(msg.json())
                            }
                        );
                }
            });
        });

        return promise;
    }

    getToDoDetails(id: number): Promise<any> {
        let promise = new Promise((success, fail) => {
            let apiURL = `${this.baseUrl}/todo/${id}`;
            let headers = this.headers;

            this.localStorage.getItem("auth_token").toPromise().then(auth_token => {
                if (auth_token != null) {

                    this.http.get(apiURL, { headers })
                        .toPromise()
                        .then(
                            res => { // Success
                                success(res.json())
                            },
                            msg => { // Error
                                fail(msg.json())
                            }
                        );
                }
            });
        });

        return promise;
    }

    addTodo(todo: ToDo): Promise<any> {
        let promise = new Promise((success, fail) => {
            let apiURL = `${this.baseUrl}/todo`;
            let headers = this.headers;

            this.localStorage.getItem("auth_token").toPromise().then(auth_token => {
                if (auth_token != null) {

                    let body = JSON.stringify(todo);
                    this.http.post(apiURL, body, { headers })
                        .toPromise()
                        .then(
                            res => { // Success
                                success(res.json())
                            },
                            msg => { // Error
                                fail(msg.json())
                            }
                        );
                }
            });
        });

        return promise;
    }

    removeToDo(id: number): Promise<any> {
        let promise = new Promise((success, fail) => {
            let apiURL = `${this.baseUrl}/todo/${id}`;
            let headers = this.headers;

            this.localStorage.getItem("auth_token").toPromise().then(auth_token => {
                if (auth_token != null) {

                    this.http.delete(apiURL, { headers })
                        .toPromise()
                        .then(
                            res => { // Success
                                success(res.json())
                            },
                            msg => { // Error
                                fail(msg.json())
                            }
                        );
                }
            });
        });

        return promise;
    }

    updateToDo(todo: ToDo): Promise<any> {
        let promise = new Promise((success, fail) => {
            let apiURL = `${this.baseUrl}/todo/${todo.id}`;
            let headers = this.headers;

            this.localStorage.getItem("auth_token").toPromise().then(auth_token => {
                if (auth_token != null) {

                    let body = JSON.stringify(todo);
                    this.http.put(apiURL, body, { headers })
                        .toPromise()
                        .then(
                            res => { // Success
                                success(res.json())
                            },
                            msg => { // Error
                                fail(msg.json())
                            }
                        );
                }
            });
        });

        return promise;
    }
}