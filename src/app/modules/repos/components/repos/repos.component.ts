import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { AppState } from 'app/core/store/models/app.state';
import { BasicsSelector } from 'app/core/store/selectors/app.selector';
import { ProjectsSelector } from 'app/core/store/selectors/app.selector';
import { ReposConfigService } from '../../services/repos-config.service';
import { ReposConfig } from '../../models/repos-config.model';
import { Project } from 'app/core/models/gitConnectProfile/project';
import { Basics } from 'app/core/models/gitConnectProfile/base';

@Component({
    selector: 'app-repos',
    templateUrl: './repos.component.html',
    styleUrls: ['./repos.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class ReposComponent implements OnInit {
  repos$!: Observable<Project[]>;
  loading$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private reposConfigService: ReposConfigService
  ) {}

  ngOnInit(): void {
    const projects$ = this.store.select(ProjectsSelector);
    const basics$ = this.store.select(BasicsSelector);
    const config$ = this.reposConfigService.getReposConfig();

    this.loading$ = projects$.pipe(
      map(projects => projects === undefined || projects === null)
    );

    this.repos$ = combineLatest([projects$, config$, basics$]).pipe(
      map(([projects, config, basics]) => {
        if (!projects) return [];

        return this.filterRepos(projects, config, basics);
      })
    );
  }

  private filterRepos(projects: Project[], config: ReposConfig | null, basics: Basics | undefined): Project[] {
    const hasUrl = (p: Project): boolean => !!(p.githubUrl || p.repositoryUrl);

    if (!config?.repos?.length) {
      return projects
        .filter(hasUrl)
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 8);
    }

    const projectsByName = new Map(projects.map(project => [project.name, project]));
    const githubBaseUrl = this.getGithubBaseUrl(basics);

    return config.repos
      .filter(repo => repo.enabled)
      .map(repo => projectsByName.get(repo.name) ?? this.createFallbackRepo(repo.name, githubBaseUrl))
      .filter(hasUrl)
      .slice(0, 8);
  }

  private getGithubBaseUrl(basics: Basics | undefined): string {
    const githubProfileUrl = basics?.profiles
      ?.find(profile => profile.network?.toLowerCase() === 'github')
      ?.url;

    if (!githubProfileUrl) {
      return '';
    }

    try {
      const parsedUrl = new URL(githubProfileUrl);
      const username = parsedUrl.pathname.split('/').filter(Boolean)[0];
      return username ? `https://github.com/${username}` : '';
    } catch {
      return '';
    }
  }

  private createFallbackRepo(name: string, githubBaseUrl: string): Project {
    const repoUrl = githubBaseUrl ? `${githubBaseUrl}/${name}` : '';

    return {
      name,
      description: '',
      url: repoUrl,
      highlights: [],
      keywords: [],
      roles: [],
      startDate: '',
      endDate: '',
      entity: 'GitHub',
      type: 'Repository',
      displayName: name,
      website: '',
      summary: '',
      primaryLanguage: '',
      languages: [],
      libraries: [],
      githubUrl: repoUrl,
      repositoryUrl: repoUrl,
      start: { year: null, month: null, day: null },
      end: { year: null, month: null, day: null },
      images: [],
      videos: []
    };
  }
}
