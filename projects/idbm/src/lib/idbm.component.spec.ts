import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdbmComponent } from './idbm.component';

describe('IdbmComponent', () => {
  let component: IdbmComponent;
  let fixture: ComponentFixture<IdbmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdbmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
