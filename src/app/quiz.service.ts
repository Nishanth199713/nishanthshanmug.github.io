import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuizQuestions(amount: number, category: number, difficulty: string) {
    const url = `${this.baseUrl}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get(url);
  }

  getCategories() {
    const url = 'https://opentdb.com/api_category.php';
    return this.http.get(url);
  }
}
