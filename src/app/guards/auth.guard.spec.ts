import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceStub = {
      isAuthenticated: jasmine.createSpy('isAuthenticated')
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    it('should return true if user is authenticated', () => {
      (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);

      expect(guard.canActivate()).toBeTrue();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should return false and redirect to login if user is not authenticated', () => {
      (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);

      expect(guard.canActivate()).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
