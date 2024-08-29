import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(true)),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to /protected', async () => {
    component.name = 'testuser';
    component.password = 'testpassword';

    await component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/protected']);
  });

  it('should handle login failure', async () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('Login failed')));

    spyOn(console, 'error');
    component.name = 'testuser';
    component.password = 'testpassword';

    await component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(console.error).toHaveBeenCalledWith('Login failed:', jasmine.any(Error));
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
