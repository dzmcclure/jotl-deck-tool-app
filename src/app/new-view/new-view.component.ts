import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-view',
  standalone: true,
  imports: [],
  templateUrl: './new-view.component.html',
  styleUrl: './new-view.component.css'
})
export class NewViewComponent implements OnInit {
  @Input({ required: true }) viewTitle!: string;
  @Input({ required: true }) viewDescription!: string;

  ngOnInit() {
    console.log(this.viewTitle, this.viewDescription);
  }
}
