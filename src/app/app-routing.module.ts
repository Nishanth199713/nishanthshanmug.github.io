import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizCreatorComponent } from './quiz-creator/quiz-creator.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  { path: '', component: QuizCreatorComponent },
  { path: 'quiz-questions', component: QuizQuestionsComponent },
  { path: 'quiz-results', component: QuizResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
