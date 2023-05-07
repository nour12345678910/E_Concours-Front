import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCandidatsReussisComponent } from './liste-candidats-reussis.component';

describe('ListeCandidatsReussisComponent', () => {
  let component: ListeCandidatsReussisComponent;
  let fixture: ComponentFixture<ListeCandidatsReussisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCandidatsReussisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCandidatsReussisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
