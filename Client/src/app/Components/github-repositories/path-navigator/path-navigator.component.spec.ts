import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathNavigatorComponent } from './path-navigator.component';

describe('PathNavigatorComponent', () => {
  let component: PathNavigatorComponent;
  let fixture: ComponentFixture<PathNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PathNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
