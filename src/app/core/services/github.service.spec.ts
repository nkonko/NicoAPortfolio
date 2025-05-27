import { TestBed } from '@angular/core/testing';
import { GithubService, GithubProject } from './github.service';
import { Observable, of } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTop5Projects', () => {
    it('should return an Observable<GithubProject[]>', () => {
      const result = service.getTop5Projects();
      expect(result instanceof Observable).toBe(true);
    });

    it('should return an array of 5 project objects', (done: DoneFn) => {
      service.getTop5Projects().subscribe(projects => {
        expect(projects.length).toBe(5);
        done();
      });
    });

    it('each project object should have the expected properties', (done: DoneFn) => {
      service.getTop5Projects().subscribe(projects => {
        projects.forEach(project => {
          expect(project.name).toBeDefined();
          expect(project.description).toBeDefined();
          expect(project.html_url).toBeDefined();
          expect(project.stargazers_count).toBeDefined();
          expect(project.forks_count).toBeDefined();
          // language is optional, so not strictly checked for existence on all
        });
        done();
      });
    });

    it('should return the mock project data with correct values for the first project', (done: DoneFn) => {
      service.getTop5Projects().subscribe(projects => {
        const firstProject = projects[0];
        expect(firstProject.name).toEqual('Portfolio V1');
        expect(firstProject.description).toEqual('My personal portfolio website showcasing my skills and projects. Built with Angular and Bulma.');
        expect(firstProject.html_url).toEqual('https://github.com/nkonko/portfolio-v1');
        expect(firstProject.stargazers_count).toBe(150);
        expect(firstProject.forks_count).toBe(30);
        expect(firstProject.language).toEqual('TypeScript');
        done();
      });
    });
  });
});
