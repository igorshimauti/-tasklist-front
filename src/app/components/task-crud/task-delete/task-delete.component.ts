import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {

  task: Task = {
    titulo: "",
    status: "",
    descricao: ""
  };

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.taskService.readById(id ? id : '').subscribe(task => {
      this.task = task;
    })
  }

  remove(): void {
    this.taskService.delete(this.task).subscribe(() => {
      this.taskService.showMessage("Task removida com sucesso.");
      this.router.navigate(['/']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}