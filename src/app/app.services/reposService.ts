import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map, toArray } from 'rxjs/operators';
import { Repo, RawRepo } from '../types';

@Injectable()
export class ReposService {
     constructor () {}
     private repoUrl = 'https://api.github.com/search/repositories?';

     // TODO: add debounce here
     getRepos(query: string, count: number): Observable<Repo[]> {
        const url = `${this.repoUrl}q=${query}&sort=stars&order=desc&page=1&per_page=${count}`

        return fromFetch(url).pipe(
            switchMap((response) => {
                // TODO: check response code and process json only for 200, 403, etc
                // if (response.ok) {
                //     return response.json();
                // } else {
                //     throw new Error(`Error ${response.status}`);
                // }
                return response.json();
            }),
            switchMap((response) => {
                if(response.items) {
                    return response.items as RawRepo[];
                }
                throw new Error(response.message);
            }),
            map((v: RawRepo) => ({ name: v.name, stars: v.stargazers_count, message: v.message })),
            toArray(),
            catchError((err, obj) => {
                // TODO: dirty hack
                return [err.message];
            })
        );
     }
}