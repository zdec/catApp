import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService } from '../../services/cat.service';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-breed-selector',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './breed-selector.component.html',
})
export class BreedSelectorComponent {
  breeds: any[] = [];
  selectedBreed: string = '';
  @Output() breedSelected = new EventEmitter<string>();

  constructor(private catService: CatService) {
    this.loadBreeds();
  }

  async loadBreeds() {
    try {
      this.breeds = await this.catService.getBreeds();
      console.log('Breeds loaded:', this.breeds);
    } catch (err) {
      console.error('Error loading breeds:', err);
    }
  }

  onSelectBreed() {
    this.breedSelected.emit(this.selectedBreed);
    console.log('Selected breed:', this.selectedBreed);
  }
}
