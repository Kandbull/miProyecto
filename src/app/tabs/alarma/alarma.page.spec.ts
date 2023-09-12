import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmaPage } from './alarma.page';

describe('AlarmaPage', () => {
  let component: AlarmaPage;
  let fixture: ComponentFixture<AlarmaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
