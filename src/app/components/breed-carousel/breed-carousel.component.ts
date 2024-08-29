import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { CatService } from '../../services/cat.service';

@Component({
  selector: 'app-breed-carousel',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './breed-carousel.component.html',
})
export class BreedCarouselComponent {
  @Input() breedId: string = '';
  breedDetails: any;
  images: any[] = [];

  constructor(private catService: CatService) {}

  ngOnChanges() {
    if (this.breedId) {
      this.loadBreedDetails();
    }
  }

  async loadBreedDetails() {
    try {
      console.log('Breed id:', this.breedId);
      this.breedDetails = await this.catService.getBreedById(this.breedId);
      this.images = await this.catService.getImagesByBreedId(this.breedId);
      console.log('Breed details:', this.breedDetails);
      console.log('Breed images:', this.images);
    } catch (err) {
      console.error('Error loading breed details:', err);
    }
  }
}
