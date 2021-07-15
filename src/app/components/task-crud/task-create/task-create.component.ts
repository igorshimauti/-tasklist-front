import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  task: Task = {
    titulo: "",
    status: "",
    descricao: ""
  };

  status = [
    {value: 'ABERTO', viewValue: 'Aberto'},
    {value: 'CONCLUIDO', viewValue: 'Concluído'},
  ];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.taskService.create(this.task).subscribe(() => {
      this.taskService.showMessage('Task cadastrada com sucesso.');
      this.router.navigate(['/']);
    })
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}