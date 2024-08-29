import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProtectedComponent } from './protected.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProtectedComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the authenticated user on initialization', () => {
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    authServiceSpy.getUser.and.returnValue(mockUser);

    fixture.detectChanges();  // Trigger ngOnInit()

    expect(component.user).toEqual(mockUser);
    expect(authServiceSpy.getUser).toHaveBeenCalled();
  });

  it('should log the authenticated user to the console', () => {
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    authServiceSpy.getUser.and.returnValue(mockUser);
    const consoleSpy = spyOn(console, 'log');

    fixture.detectChanges();  // Trigger ngOnInit()

    expect(consoleSpy).toHaveBeenCalledWith('Authenticated user:', mockUser);
  });
});
