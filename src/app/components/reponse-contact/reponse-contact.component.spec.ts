import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseContactComponent } from './reponse-contact.component';

describe('ReponseContactComponent', () => {
  let component: ReponseContactComponent;
  let fixture: ComponentFixture<ReponseContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
