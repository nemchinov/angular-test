import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.sass']
})
export class SearchInputComponent {
  @Output() onChangeValue = new EventEmitter<{text: string}>();

  @Input()
  value = '';

  onKey(event: any) {
    this.value = event.target.value;
    this.onChangeValue.emit( { text: this.value } );
  }

  constructor() { }
}
