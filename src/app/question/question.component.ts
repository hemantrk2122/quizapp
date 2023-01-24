import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  user: any;
  public name : string = "";
  constructor(
    private router: ActivatedRoute,
    private qs: QuestionService
  ) { }

  ngOnInit(): void {
    this.user = this.router.snapshot.queryParams['user'];
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions(){
    this.qs.getQuestionJson().subscribe(res=>{});
  }
}
