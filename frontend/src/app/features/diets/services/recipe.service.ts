import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs';
import { Recipe } from '../../../shared/models/recipe';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipeById(id: number): Observable<Recipe | null> {
    console.log('RecipeService: Buscando receta con ID:', id);
    return this.http.get<Recipe[]>('/assets/Recipes.json').pipe(
      map(recipes => {
        console.log('RecipeService: Total recetas cargadas:', recipes.length);
        const found = recipes.find(r => r.id === id);
        console.log('RecipeService: Receta encontrada:', found ? found.name : 'No encontrada');
        return found || null;
      }),
      catchError((error) => {
        console.error('RecipeService: Error cargando Recipes.json:', error);
        return of(null);
      })
    );
  }
}
