import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToDoDataService } from "./todo.service";
import { Observable } from "rxjs/Rx";
import { ToDo } from "../../models/todo.interface";
import { Http, Response, Headers } from "@angular/http";

@Component({
    selector: "todo-list",
    templateUrl: "./todo.component.html",
    styleUrls: ["./todo.component.css"]
})

export class ToDoComponent implements OnInit {

    toDos: ToDo[] = [];
    newToDo: ToDo = { id: 0, header: "", description: "", completed: false, timeStamp: "" };
    selectedToDo: ToDo = { id: 0, header: "", description: "", completed: false, timeStamp: "" };;

    constructor(private toDoService: ToDoDataService) {
    }


    ngOnInit(): void {
        this.toDoService.getToDoHeaders().then(
            res => {
                this.toDos = res;
            },
            msg => {
            });
    }

    onSelect(toDo: ToDo) {
        this.toDoService.getToDoDetails(toDo.id).then(res => {
            this.selectedToDo = res as ToDo;
        });
    }

    addToDo() {
        this.toDoService.addTodo(this.newToDo).then(data => {
            if (data) {
                this.toDos.push(data);
                this.newToDo.header = "";
            }
        });
    }

    removeTodo(toDo: ToDo) {
        this.toDoService.removeToDo(toDo.id).then(data => {
            let index = -1;

            for (var j = 0; j < this.toDos.length; j++) {
                if (this.toDos[j].id === toDo.id) {
                    index = j;
                }
            }

            if (index !== -1) {
                this.toDos.splice(index, 1);
            }
            alert('Removed')
        });
    }

    update(toDo: ToDo) {
        this.toDoService.updateToDo(toDo).then(data => {
             alert('Updated')
        });
    }
}

