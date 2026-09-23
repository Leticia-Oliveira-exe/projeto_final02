import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crie } from './crie';

describe('Crie', () => {
  let component: Crie;
  let fixture: ComponentFixture<Crie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
