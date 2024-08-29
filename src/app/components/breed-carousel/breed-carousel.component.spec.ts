import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreedCarouselComponent } from './breed-carousel.component';
import { CatService } from '../../services/cat.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('BreedCarouselComponent', () => {
  let component: BreedCarouselComponent;
  let fixture: ComponentFixture<BreedCarouselComponent>;
  let catService: CatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, BreedCarouselComponent],
      providers: [CatService],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedCarouselComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    fixture.detectChanges();
  });

  it('should create the BreedCarouselComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should call loadBreedDetails when breedId changes', () => {
      spyOn(component, 'loadBreedDetails');
      component.breedId = 'test-breed-id';
      component.ngOnChanges();
      expect(component.loadBreedDetails).toHaveBeenCalled();
    });

    it('should not call loadBreedDetails when breedId is empty', () => {
      spyOn(component, 'loadBreedDetails');
      component.breedId = '';
      component.ngOnChanges();
      expect(component.loadBreedDetails).not.toHaveBeenCalled();
    });
  });

  
});
