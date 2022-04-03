import { Component, OnInit, Input } from '@angular/core';

type ResultListProps = {
  name: string;
  stars: number;
}[];

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.sass'],
})
export class ResultListComponent implements OnInit {
  @Input()
  results: ResultListProps = [];

  constructor() {}

  ngOnInit(): void {}
}
