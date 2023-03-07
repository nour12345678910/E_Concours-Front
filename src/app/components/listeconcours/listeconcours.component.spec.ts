import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeconcoursComponent } from './listeconcours.component';

describe('ListeconcoursComponent', () => {
  let component: ListeconcoursComponent;
  let fixture: ComponentFixture<ListeconcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeconcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeconcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
