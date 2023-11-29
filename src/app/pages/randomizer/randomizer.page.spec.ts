import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomizerPage } from './randomizer.page';

describe('RandomizerPage', () => {
  let component: RandomizerPage;
  let fixture: ComponentFixture<RandomizerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RandomizerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
