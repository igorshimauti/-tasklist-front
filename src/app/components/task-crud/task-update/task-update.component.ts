import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  task: Task = {
    titulo: "",
    status: "",
    descricao: ""
  };

  status = [
    {value: 'ABERTO', viewValue: 'Aberto'},
    {value: 'CONCLUIDO', viewValue: 'Concluído'},
  ];

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskService.readById(id ? id : '').subscribe(task => {
      this.task = task;
    });
  }

  update(): void {
    this.taskService.update(this.task).subscribe(() => {
      this.taskService.showMessage('Task atualizada com sucesso.');
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}