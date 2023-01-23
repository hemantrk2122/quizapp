import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomComponent } from './welcom/welcom.component';
import { QuestionComponent } from './question/question.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'welcome',
    pathMatch:'full'
  },
  {
    path:'welcome',
    component: WelcomComponent
  },
  {
    path:'question',
    component: QuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
