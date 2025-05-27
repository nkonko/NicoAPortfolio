import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GithubProject } from '@core/services/github.service'; // Corrected path
import { Observable } from 'rxjs';

@Component({
  selector: 'app-github-projects',
  templateUrl: './github-projects.component.html',
  styleUrls: ['./github-projects.component.scss'],
  standalone: true,
  imports: [CommonModule] // CommonModule for now, will add NgForOf etc. when template is built
})
export class GithubProjectsComponent implements OnInit {
  public projects: GithubProject[] = [];
  public projects$: Observable<GithubProject[]> | undefined;
  public currentIndex: number = 0;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.projects$ = this.githubService.getTop5Projects();
    this.githubService.getTop5Projects().subscribe(data => {
      this.projects = data;
      // For now, let's log to see if data is fetched
      console.log('Fetched projects:', this.projects);
    });
  }

  nextProject(): void {
    if (this.projects.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    }
  }

  previousProject(): void {
    if (this.projects.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    }
  }
}
