import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import _ from 'lodash';
import {CardChanges} from "../../models/perk";
import * as perkList from "../../constants/perks";
import { PerkNumbers } from '../../pipes/perk-pipe';

interface PerkChecklist extends CardChanges {
  perkId: string;
}

@Component({
  selector: 'app-perks-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PerkNumbers
  ],
  providers: [ PerkNumbers ],
  templateUrl: './perks-list.component.html',
  styleUrl: './perks-list.component.css'
})

export class PerksListComponent implements OnInit {
  @Input() perks: string[] = [];
  @Input({required: true}) owner!: string;
  @Output() selectedPerks = new EventEmitter<string[]>();
  availablePerks: PerkChecklist[] = [];
  form: FormGroup;

  get perkFormArray() {
    return this.form.controls['perks'] as FormArray;
  }

  public constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      perks: new FormArray([]),
    });
  }

  ngOnInit(): void {
    let characterPerks: Record<string, CardChanges> = {};

    switch (this.owner) {
      case 'demolitionist':
        characterPerks = _.cloneDeep(perkList.DemolitionistPerks);
        break;
      case 'hatchet':
        characterPerks = _.cloneDeep(perkList.HatchetPerks);
        break;
      case 'redGuard':
        characterPerks = _.cloneDeep(perkList.RedguardPerks);
        break;
      case 'voidwarden':
        characterPerks = _.cloneDeep(perkList.VoidwardenPerks);
        break;
    }

    Object.entries(characterPerks).map((perk) => {
      this.availablePerks.push({
        ...perk[1],
        perkId: perk[0],
      });
    });

    this.availablePerks.forEach((availablePerk) => {
      const perkSelected = _.includes(this.perks, availablePerk.perkId);
      const formData = {
        value: perkSelected,
        disabled: perkSelected,
      };
      this.perkFormArray.push(new FormControl(formData));
    });
  }

  submit() {
    this.form.controls['perks'].enable();
    const selectedPerkIds =
      this.form.value.perks
        .map((value: any, index: any) => value ? this.availablePerks[index].perkId : null)
        .filter((value: any) => value !== null);

    this.selectedPerks.emit(selectedPerkIds);
  }

  cancel() {
    this.selectedPerks.emit();
  }
}
