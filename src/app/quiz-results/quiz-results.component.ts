import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizQuestion } from '../quiz-question.interface';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  userAnswers: string[] = [];
  correctAnswers: string[] = [];
  score: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.quizQuestions = JSON.parse(params['quizQuestions']);
      this.userAnswers = JSON.parse(params['userAnswers']);
      this.correctAnswers = JSON.parse(params['correctAnswers']);
      this.calculateScore();
      this.populateWrongAnswers();
    });
  }

  calculateScore() {
    for (let i = 0; i < this.quizQuestions.length; i++) {
      if (this.userAnswers[i] === this.correctAnswers[i]) {
        this.score++;
      }
    }
  }

  populateWrongAnswers() {
    for (let i = 0; i < this.quizQuestions.length; i++) {
      const question = this.quizQuestions[i];
      question.wrong_answer = this.isAnswerChosenAndWrong(i, this.userAnswers[i]) ? this.userAnswers[i] : '';
    }
  }

  isAnswerChosen(questionIndex: number, answer: string): boolean {
    return this.userAnswers[questionIndex] === answer;
  }

  isAnswerCorrect(questionIndex: number, answer: string): boolean {
    return answer === this.quizQuestions[questionIndex].correct_answer;
  }

  isAnswerChosenAndWrong(questionIndex: number, answer: string): boolean {
    return this.isAnswerChosen(questionIndex, answer) && !this.isAnswerCorrect(questionIndex, answer);
  }
  getColorClassForScore(): string {
    if (this.score <= 1) {
      return 'red';
    } else if (this.score <= 3) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  restartQuiz() {
    this.router.navigate(['/']);
  }
}
