import { Component, OnInit, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.sass'],
})
export class ResultItemComponent implements OnInit {
  @Input()
  name: string = '';

  @Input()
  stars: number = 0;

  toArray(length: number) {
    return Array.from({ length }, (_y, i) => i);
  }

  constructor() { }

  ngOnInit(): void {}
}
