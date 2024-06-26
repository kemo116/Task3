import { Injectable } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: AngularFirestore) { }
  //for home component
  getRecipes(): Observable<any[]> {
    return this.firestore.collection('recipes').valueChanges({ idField: 'id' });
  }

  //for detail component
  getRecipe(id: string): Observable<any> {
    return this.firestore.collection('recipes').doc(id).valueChanges();
  }
  

  // Method to update recipe rating in Firestore
  updateRecipeRating(recipeId: string, newRating: number): Promise<void> {
    const recipeRef = this.firestore.collection('recipes').doc(recipeId);
    return recipeRef.update({ ratings: newRating });
  }
  // In RecipeService
getRecipesByMealType(mealType: string): Observable<any[]> {
  return this.firestore.collection('recipes', ref => ref.where('mealType', '==', mealType)).valueChanges({ idField: 'id' });
}

  getRecipeByTitle(title: string): Observable<any[]> {
    return this.firestore.collection('recipes', ref => ref.where('title', '==', title)).valueChanges({ idField: 'id' });
}
getRecipesByTags(tags: string[]): Observable<any[]> {
  return this.firestore.collection('recipes', ref => 
    ref.where('tags', 'array-contains-any', tags)
  ).valueChanges({ idField: 'id' });
}
getRecipesByCommonUsername(username: string): Observable<Recipe[]> {
  return this.firestore.collection('recipes', ref => ref.where('username', '==', username)).valueChanges({ idField: 'id' }) as Observable<Recipe[]>;
}


  
  

}
