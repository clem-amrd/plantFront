import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() searchTerm: string = '';
  @Output() action = new EventEmitter<string>();

  constructor() { }

  search() {
    this.action.emit(this.searchTerm);
  }
}

