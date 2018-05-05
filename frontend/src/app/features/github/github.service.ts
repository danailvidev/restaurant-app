import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GithubApi, Issue } from './interfaces';

@Injectable()
export class GithubService {
    baseUrl: string = environment.github.baseUrl;
    repoName: string = environment.github.repoName;
    issueUrl: string = environment.github.issueUrl;

    public constructor(protected http: HttpClient) {
    }

    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
        const requestUrl =
            `${this.baseUrl}?q=repo:${this.repoName}&sort=${sort}&order=${order}&page=${page + 1}`;
        return this.http.get<GithubApi>(requestUrl);
    }

    createIssue(issue: Issue) {
        return this.http.post(this.issueUrl, issue);
    }
}
