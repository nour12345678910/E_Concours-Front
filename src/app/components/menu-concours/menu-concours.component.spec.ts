import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConcoursComponent } from './menu-concours.component';

describe('MenuConcoursComponent', () => {
  let component: MenuConcoursComponent;
  let fixture: ComponentFixture<MenuConcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
