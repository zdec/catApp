import { Component } from '@angular/core';
import { BreedSelectorComponent } from '../../components/breed-selector/breed-selector.component';
import { BreedCarouselComponent } from '../../components/breed-carousel/breed-carousel.component';
import { BreedTableComponent } from '../../components/breed-table/breed-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, BreedSelectorComponent, BreedCarouselComponent, BreedTableComponent],
  templateUrl: './table.component.html',
})
export class TableComponent {
  selectedBreedId: string = '';

  onBreedSelected(breedId: string) {
    this.selectedBreedId = breedId;
    console.log('Breed selected in Table Component:', this.selectedBreedId);
  }
}

