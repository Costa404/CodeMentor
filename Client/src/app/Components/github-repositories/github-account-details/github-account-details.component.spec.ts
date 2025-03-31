import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubAccountDetailsComponent } from './github-account-details.component';

describe('GithubAccountDetailsComponent', () => {
  let component: GithubAccountDetailsComponent;
  let fixture: ComponentFixture<GithubAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubAccountDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
