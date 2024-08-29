import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreedSelectorComponent } from './breed-selector.component';
import { CatService } from '../../services/cat.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('BreedSelectorComponent', () => {
  let component: BreedSelectorComponent;
  let fixture: ComponentFixture<BreedSelectorComponent>;
  let catService: CatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, BreedSelectorComponent],
      providers: [CatService],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedSelectorComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    fixture.detectChanges();
  });

  it('should create the BreedSelectorComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('loadBreeds', () => {
    it('should load breeds and set them to the breeds property', async () => {
      const dummyBreeds = [{ id: '1', name: 'Persian' }, { id: '2', name: 'Maine Coon' }];
      spyOn(catService, 'getBreeds').and.returnValue(Promise.resolve(dummyBreeds));

      await component.loadBreeds();
      expect(component.breeds).toEqual(dummyBreeds);
      expect(console.log).toHaveBeenCalledWith('Breeds loaded:', dummyBreeds);
    });

    it('should handle error and log to console if loading breeds fails', async () => {
      const errorMessage = 'Error loading breeds';
      spyOn(catService, 'getBreeds').and.returnValue(Promise.reject(errorMessage));
      spyOn(console, 'error');

      await component.loadBreeds();
      expect(component.breeds).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Error loading breeds:', errorMessage);
    });
  });

  describe('onSelectBreed', () => {
    it('should emit the selected breed and log it to the console', () => {
      const spy = spyOn(component.breedSelected, 'emit');
      const breed = 'Persian';
      component.selectedBreed = breed;
      spyOn(console, 'log');

      component.onSelectBreed();

      expect(spy).toHaveBeenCalledWith(breed);
      expect(console.log).toHaveBeenCalledWith('Selected breed:', breed);
    });
  });
});
