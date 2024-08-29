import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-breed-table',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './breed-table.component.html',
})
export class BreedTableComponent {
  breeds: any[] = [];
  searchText: string = '';

  constructor(private catService: CatService) {
    this.loadBreeds();
  }

  async loadBreeds() {
    try {
      this.breeds = await this.catService.getBreeds();
      console.log('Breeds loaded in table:', this.breeds);
    } catch (err) {
      console.error('Error loading breeds in table:', err);
    }
  }

  get filteredBreeds() {
    return this.breeds.filter(breed =>
      breed.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

