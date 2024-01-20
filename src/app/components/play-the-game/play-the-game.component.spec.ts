import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTheGameComponent } from './play-the-game.component';

describe('PlayTheGameComponent', () => {
  let component: PlayTheGameComponent;
  let fixture: ComponentFixture<PlayTheGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayTheGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTheGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
