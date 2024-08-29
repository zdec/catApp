import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true and set user on successful login', async () => {
      const dummyResponse = { id: 1, name: 'John Doe' };
      spyOn(console, 'error');

      const username = 'john';
      const password = 'password123';

      service.login(username, password).then(result => {
        expect(result).toBeTrue();
        expect(service.getUser()).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });

    it('should return false on login error', async () => {
      spyOn(console, 'error');

      const username = 'john';
      const password = 'password123';

      service.login(username, password).then(result => {
        expect(result).toBeFalse();
        expect(service.getUser()).toBeUndefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/login`);
      expect(req.request.method).toBe('POST');
      req.flush('Login failed', { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('register', () => {
    it('should return true on successful registration', async () => {
      spyOn(console, 'error');

      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };

      service.register(userData).then(result => {
        expect(result).toBeTrue();
      });

      const req = httpMock.expectOne(`${apiUrl}/register`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should return false on registration error', async () => {
      spyOn(console, 'error');

      const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };

      service.register(userData).then(result => {
        expect(result).toBeFalse();
      });

      const req = httpMock.expectOne(`${apiUrl}/register`);
      expect(req.request.method).toBe('POST');
      req.flush('Registration failed', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if user is set', () => {
      service['user'] = { id: 1, name: 'John Doe' };
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if user is not set', () => {
      service['user'] = null;
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('getUser', () => {
    it('should return the user', () => {
      const user = { id: 1, name: 'John Doe' };
      service['user'] = user;
      expect(service.getUser()).toEqual(user);
    });

    it('should return undefined if user is not set', () => {
      service['user'] = null;
      expect(service.getUser()).toBeUndefined();
    });
  });
});
