import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSexComponent } from './stat-sex.component';

describe('StatSexComponent', () => {
  let component: StatSexComponent;
  let fixture: ComponentFixture<StatSexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatSexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
