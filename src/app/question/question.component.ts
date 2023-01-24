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
  public questionList : any = [];
  public currentQuestion :number = 0;
  public points: number = 0;
  counter = 60;
  public correctAnswer: number = 0;
  public incorrectAnswer: number = 0;
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
    this.qs.getQuestionJson().subscribe(res=>{
      this.questionList = res.questions;
      console.log(this.questionList);
    });
  }
  nextQuestion(){
    this.currentQuestion += 1;
  }
  prevQuestion(){
    this.currentQuestion -= 1;
  }
  answer(questionNumber:any, option:any){
    if(this.correctAnswer+this.incorrectAnswer != this.questionList.length){
      if(option.correct){
        this.points+=4;
        this.correctAnswer++;
        if(this.currentQuestion<this.questionList.length-1)
        this.currentQuestion++;
      }else{
        this.points-=1;
        this.incorrectAnswer++;
        if(this.currentQuestion<this.questionList.length-1)
        this.currentQuestion++;
      }
    }
  }
}
