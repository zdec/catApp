import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { BreedSelectorComponent } from '../../components/breed-selector/breed-selector.component';
import { BreedCarouselComponent } from '../../components/breed-carousel/breed-carousel.component';
import { BreedTableComponent } from '../../components/breed-table/breed-table.component';
import { CommonModule } from '@angular/common';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BreedSelectorComponent, BreedCarouselComponent, BreedTableComponent, TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the TableComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty selectedBreedId initially', () => {
    expect(component.selectedBreedId).toBe('');
  });

  it('should update selectedBreedId when onBreedSelected is called', () => {
    const breedId = 'abys';
    component.onBreedSelected(breedId);
    expect(component.selectedBreedId).toBe(breedId);
  });

  it('should log the selected breedId to the console', () => {
    const consoleSpy = spyOn(console, 'log');
    const breedId = 'abys';
    component.onBreedSelected(breedId);
    expect(consoleSpy).toHaveBeenCalledWith('Breed selected in Table Component:', breedId);
  });
});
