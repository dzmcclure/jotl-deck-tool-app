import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerksListComponent } from './perks-list.component';

describe('PerksListComponent', () => {
  let component: PerksListComponent;
  let fixture: ComponentFixture<PerksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerksListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
