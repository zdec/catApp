import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { BreedSelectorComponent } from '../../components/breed-selector/breed-selector.component';
import { BreedCarouselComponent } from '../../components/breed-carousel/breed-carousel.component';
import { BreedTableComponent } from '../../components/breed-table/breed-table.component';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BreedSelectorComponent,
        BreedCarouselComponent,
        BreedTableComponent, HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty initial selectedBreedId', () => {
    expect(component.selectedBreedId).toBe('');
  });

  it('should update selectedBreedId when onBreedSelected is called', () => {
    const testBreedId = 'test-breed-id';
    component.onBreedSelected(testBreedId);
    expect(component.selectedBreedId).toBe(testBreedId);
  });

  it('should log the selected breed ID', () => {
    spyOn(console, 'log');
    const testBreedId = 'test-breed-id';
    component.onBreedSelected(testBreedId);
    expect(console.log).toHaveBeenCalledWith('Breed selected in Home Component:', testBreedId);
  });
});
