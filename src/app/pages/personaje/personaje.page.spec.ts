import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajePage } from './personaje.page';

describe('PersonajePage', () => {
  let component: PersonajePage;
  let fixture: ComponentFixture<PersonajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
