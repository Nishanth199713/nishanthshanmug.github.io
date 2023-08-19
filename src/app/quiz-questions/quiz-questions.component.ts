import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { QuizQuestion } from '../quiz-question.interface';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {
  quizQuestions: QuizQuestion[] = [];
  shuffledAnswers: string[][] = [];
  userAnswers: string[] = [];
  correctAnswers: string[] = [];
  isQuizComplete = false;
  hoveredQuestionIndex: number | null = null;
  hoveredOptionIndex: number | null = null;

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const difficulty = params['difficulty'];
      this.getQuizQuestions(category, difficulty);
    });
  }

  onOptionHover(questionIndex: number, optionIndex: number): void {
    this.hoveredQuestionIndex = questionIndex;
    this.hoveredOptionIndex = optionIndex;
  }

  onOptionLeave(): void {
    this.hoveredQuestionIndex = null;
    this.hoveredOptionIndex = null;
  }

  getQuizQuestions(category: number, difficulty: string): void {
    this.quizService.getQuizQuestions(5, category, difficulty).subscribe(
      (data: { results: QuizQuestion[] }) => {
        this.quizQuestions = data.results;
        this.quizQuestions.forEach((question, index) => {
          this.shuffledAnswers[index] = this.shuffleArray([...question.incorrect_answers, question.correct_answer]);
        });

        this.userAnswers = new Array(this.quizQuestions.length).fill('');
        this.correctAnswers = this.quizQuestions.map(q => q.correct_answer);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectAnswer(questionIndex: number, answer: string): void {
    this.userAnswers[questionIndex] = answer;
    this.checkQuizCompletion();
  }

  checkQuizCompletion(): void {
    this.isQuizComplete = this.userAnswers.every(answer => answer !== '');
  }

  submitQuiz(): void {
    this.router.navigate(['/quiz-results'], {
      queryParams: {
        quizQuestions: JSON.stringify(this.quizQuestions),
        userAnswers: JSON.stringify(this.userAnswers),
        correctAnswers: JSON.stringify(this.correctAnswers)
      }
    });
  }
}
