import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatService } from './cat.service';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/cats';
  const apiUrlImg = 'http://localhost:3000/api/images';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService],
    });

    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBreeds', () => {
    it('should return an array of breeds on success', async () => {
      const dummyBreeds = [{ id: '1', name: 'Persian' }, { id: '2', name: 'Maine Coon' }];

      service.getBreeds().then(result => {
        expect(result).toEqual(dummyBreeds);
      });

      const req = httpMock.expectOne(`${apiUrl}/breeds`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBreeds);
    });

    it('should return an empty array on error', async () => {
      spyOn(console, 'error');

      service.getBreeds().then(result => {
        expect(result).toEqual([]);
      });

      const req = httpMock.expectOne(`${apiUrl}/breeds`);
      expect(req.request.method).toBe('GET');
      req.flush('Error fetching breeds', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getImagesByBreedId', () => {
    it('should return an array of images on success', async () => {
      const dummyImages = [{ id: '1', url: 'http://example.com/image1.jpg' }, { id: '2', url: 'http://example.com/image2.jpg' }];
      const breedId = '1';

      service.getImagesByBreedId(breedId).then(result => {
        expect(result).toEqual(dummyImages);
      });

      const req = httpMock.expectOne(`${apiUrlImg}/imagesbybreedid?breed_id=${breedId}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyImages);
    });

    it('should return an empty array on error', async () => {
      spyOn(console, 'error');

      const breedId = '1';

      service.getImagesByBreedId(breedId).then(result => {
        expect(result).toEqual([]);
      });

      const req = httpMock.expectOne(`${apiUrlImg}/imagesbybreedid?breed_id=${breedId}`);
      expect(req.request.method).toBe('GET');
      req.flush('Error fetching images', { status: 500, statusText: 'Server Error' });
    });
  });

  
});
