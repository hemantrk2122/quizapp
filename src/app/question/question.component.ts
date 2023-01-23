import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  user: any;
  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = this.router.snapshot.queryParams['user'];
  }

}
