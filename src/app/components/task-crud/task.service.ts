import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = "http://localhost:8080/tasklist/task";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  readById(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  update(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(url, task);
  }

  delete(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Erro efetuar a operação.", true);
    return EMPTY;
  }
}
