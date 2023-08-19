import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { QuizCategory } from '../quiz-category.interface';

@Component({
  selector: 'app-quiz-creator',
  templateUrl: './quiz-creator.component.html',
  styleUrls: ['./quiz-creator.component.css']
})
export class QuizCreatorComponent {
  categories: QuizCategory[] = [];
  difficulties: string[] = ['easy', 'medium', 'hard'];
  selectedCategory: number = 9;
  selectedDifficulty: string = 'easy';

  constructor(private quizService: QuizService, private router: Router) {
    this.getCategories();
  }

  getCategories() {
    this.quizService.getCategories().subscribe(
      (data: { trivia_categories: QuizCategory[] }) => {
        this.categories = data.trivia_categories;
        console.log(this.categories);
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  createQuiz() {
    this.router.navigate(['/quiz-questions'], {
      queryParams: {
        category: this.selectedCategory,
        difficulty: this.selectedDifficulty
      }
    });
  }
}
