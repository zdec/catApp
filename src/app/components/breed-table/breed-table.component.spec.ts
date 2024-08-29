import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BreedTableComponent } from './breed-table.component';
import { CatService } from '../../services/cat.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('BreedTableComponent', () => {
  let component: BreedTableComponent;
  let fixture: ComponentFixture<BreedTableComponent>;
  let catService: CatService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, HttpClientTestingModule, BreedTableComponent],
      providers: [CatService],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedTableComponent);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the BreedTableComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('loadBreeds', () => {
    it('should load breeds and set them to the breeds property', async () => {
      const dummyBreeds = [{ id: '1', name: 'Persian' }, { id: '2', name: 'Maine Coon' }];
      spyOn(catService, 'getBreeds').and.returnValue(Promise.resolve(dummyBreeds));

      await component.loadBreeds();
      expect(component.breeds).toEqual(dummyBreeds);
      expect(console.log).toHaveBeenCalledWith('Breeds loaded in table:', dummyBreeds);
    });

    it('should handle error and log to console if loading breeds fails', async () => {
      const errorMessage = 'Error loading breeds';
      spyOn(catService, 'getBreeds').and.returnValue(Promise.reject(errorMessage));
      spyOn(console, 'error');

      await component.loadBreeds();
      expect(component.breeds).toEqual([]);
      expect(console.error).toHaveBeenCalledWith('Error loading breeds in table:', errorMessage);
    });
  });

  describe('filteredBreeds', () => {
    it('should filter breeds based on searchText', () => {
      component.breeds = [
        { id: '1', name: 'Persian' },
        { id: '2', name: 'Maine Coon' }
      ];
      component.searchText = 'Persian';
      
      expect(component.filteredBreeds).toEqual([{ id: '1', name: 'Persian' }]);
    });

    it('should return all breeds if searchText is empty', () => {
      component.breeds = [
        { id: '1', name: 'Persian' },
        { id: '2', name: 'Maine Coon' }
      ];
      component.searchText = '';
      
      expect(component.filteredBreeds).toEqual([
        { id: '1', name: 'Persian' },
        { id: '2', name: 'Maine Coon' }
      ]);
    });
  });
});
