import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';
import { AnsweredQuestion } from './question.interface';

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
  progress: string = "0";
  interval$: any;
  isQuizCompleted: boolean=false;
  answeredQuestion: AnsweredQuestion[]=[];
  constructor(
    private router: ActivatedRoute,
    private qs: QuestionService
  ) { }

  ngOnInit(): void {
    this.user = this.router.snapshot.queryParams['user'];
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.qs.getQuestionJson().subscribe(res=>{
      this.questionList = res.questions;
      for(let i = 0;i<this.questionList.length;i++){
        this.answeredQuestion.push({
          questionNumber: i,
          isAnswered: false
        });
      }
    });
  }
  nextQuestion(){
    this.currentQuestion += 1;
    this.resetCounter();
  }
  prevQuestion(){
    this.currentQuestion -= 1;
    this.resetCounter();
  }
  answer(questionNumber:any, option:any){
    if(questionNumber == this.questionList.length){
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    console.log(questionNumber+" "+this.correctAnswer+" "+this.incorrectAnswer);
    if(this.answeredQuestion[questionNumber-1].isAnswered == true){
      alert("Already Answered!");
      this.nextQuestion();
    }
    else{
      if(option.correct){
        this.points+=4;
        this.correctAnswer++;
        this.answeredQuestion[questionNumber-1].isAnswered = true;
        setTimeout(()=>{
          this.currentQuestion++;
          this.resetCounter();
          this.getProgressPerc();
        },1000);
        
      }else{
        setTimeout(()=>{
          this.incorrectAnswer++;
          this.currentQuestion++;
          this.resetCounter();
          this.getProgressPerc();
        },1000);
        this.points-=1;
        this.answeredQuestion[questionNumber-1].isAnswered = true;
      }
    }    
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter ==0){
        this.nextQuestion();
        this.counter = 60;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },600000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 60;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";
    this.answeredQuestion=[];
    this.correctAnswer = 0;
    this.incorrectAnswer = 0;
    // for(let i = 0;i<this.questionList.length;i++){
    //   this.answeredQuestion.push({questionNumber:i,isAnswered:false});
    // }
  }
  getProgressPerc(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
