import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConcoursComponent } from './liste-concours.component';

describe('ListeConcoursComponent', () => {
  let component: ListeConcoursComponent;
  let fixture: ComponentFixture<ListeConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
