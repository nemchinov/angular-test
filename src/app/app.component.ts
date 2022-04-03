import { Component, OnInit } from '@angular/core';
import { debounce } from 'lodash';
import { ReposService } from './app.services/reposService';
import { Repo } from './types';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  searchQuery = '';
  resultList: Repo[] = [];
  maxChangeSymbols = 2;
  maxResults = 20;
  loading = false;
  error = '';
  emptyResultMessage = 'No results, please try to change query';

  constructor(private reposService: ReposService, private route: ActivatedRoute, private router: Router) {
    // Note: know that it can be done via rxJs
    this.loadRepos = debounce(this.loadRepos, 400)
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.searchQuery = params['search'];
        this.loadRepos(this.searchQuery);
      }
    });
  }

  shouldShowResults() {
    return !!(
      this.searchQuery?.length > this.maxChangeSymbols &&
      this.resultList.length
      );
  };

  onChangeValue(value: { text: string }) {
    this.searchQuery = value.text;
    this.router.navigate(
      [], 
      {
        queryParams: { search: this.searchQuery },
        queryParamsHandling: 'merge'
      });

    this.loadRepos(this.searchQuery);
  }

  loadRepos(text: string) {
    if (text?.length <= this.maxChangeSymbols) { return; }

    // TODO: dirty hack
    const timeoutObj = setTimeout(() => {
      this.loading = true;
    }, 1000);

    const finish = () => {
      clearTimeout(timeoutObj);
      this.loading = false;
    };

    this.reposService.getRepos(text, this.maxResults)
      .subscribe({
        next: result => {
          // TODO: dirty hack
          if (typeof result === 'string') {
            this.error = result;
            this.resultList = [];
          } else {
            this.resultList = result as Repo[];
            this.error = '';
          }
        },
        complete: () => finish(),
        error: () => finish(),
      });
  }
}
