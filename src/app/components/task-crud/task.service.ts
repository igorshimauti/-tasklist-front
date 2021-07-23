import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = "https://ec2-3-142-255-209.us-east-2.compute.amazonaws.com:8443/tasklist/task";
  httpHeader = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": "86400"    
  });

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, { headers: this.httpHeader }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, { headers: this.httpHeader });
  }

  readById(id: string): Observable<Task> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Task>(url, { headers: this.httpHeader });
  }

  update(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.put<Task>(url, task, { headers: this.httpHeader }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.delete<Task>(url, { headers: this.httpHeader }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
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
