import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private apiUrl = 'http://localhost:3000/api/cats';
  private apiUrlImg = 'http://localhost:3000/api/images';

  constructor(private http: HttpClient) { }

  async getBreeds(): Promise<any[]> {
    try {
      const response = await this.http.get<any[]>(`${this.apiUrl}/breeds`).toPromise();
      return response || [];  // Devuelve un array vacío si la respuesta es `undefined`
    } catch (error) {
      console.error('Error fetching breeds:', error);
      return [];  // Devuelve un array vacío en caso de error
    }
  }

  async getImagesByBreedId(breedId: string): Promise<any[]> {
    try {
      const response = await this.http.get<any[]>(`${this.apiUrlImg}/imagesbybreedid?breed_id=${breedId}`).toPromise();
      return response || [];  // Devuelve un array vacío si la respuesta es `undefined`
    } catch (error) {
      console.error('Error fetching breeds:', error);
      return [];  // Devuelve un array vacío en caso de error
    }
  }

  async getBreedById(id: string): Promise<any[]> {
    try {
      const response = await this.http.get<any>(`${this.apiUrl}/breeds/${id}`).toPromise();
      return response || [];  // Devuelve un array vacío si la respuesta es `undefined`
    } catch (error) {
      console.error('Error fetching breeds:', error);
      return [];  // Devuelve un array vacío en caso de error
    }
  }


  
}

