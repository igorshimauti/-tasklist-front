import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-read',
  templateUrl: './task-read.component.html',
  styleUrls: ['./task-read.component.css']
})
export class TaskReadComponent implements OnInit {

  innerWidth: any;
  tasks: Task[] = [];
  displayedColumns = ['titulo', 'status', 'dataCriacao', 'action'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if (window.innerWidth <= 500) {
      this.displayedColumns = ['titulo', 'status', 'action'];
    }

    this.taskService.read().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}