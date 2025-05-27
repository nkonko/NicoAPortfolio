import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubProjectsComponent } from './github-projects.component';
import { GithubService, GithubProject } from '@core/services/github.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule as it's in component's imports

// Mock data for GithubProject
const mockProjects: GithubProject[] = [
  { name: 'Project 1', description: 'Desc 1', html_url: 'url1', stargazers_count: 10, forks_count: 1, language: 'TS' },
  { name: 'Project 2', description: 'Desc 2', html_url: 'url2', stargazers_count: 20, forks_count: 2, language: 'JS' },
  { name: 'Project 3', description: 'Desc 3', html_url: 'url3', stargazers_count: 30, forks_count: 3, language: 'PY' },
];

// Mock GithubService
class MockGithubService {
  getTop5Projects(): Observable<GithubProject[]> {
    return of(mockProjects);
  }
}

describe('GithubProjectsComponent', () => {
  let component: GithubProjectsComponent;
  let fixture: ComponentFixture<GithubProjectsComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, // Needed because GithubProjectsComponent imports it
        GithubProjectsComponent // Import the standalone component itself
      ],
      providers: [
        { provide: GithubService, useClass: MockGithubService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubProjectsComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService); // Get the injected service (mocked instance)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getTop5Projects from GithubService', () => {
      spyOn(githubService, 'getTop5Projects').and.callThrough(); // Spy on the mock
      component.ngOnInit();
      expect(githubService.getTop5Projects).toHaveBeenCalled();
    });

    it('should populate projects array from GithubService', () => {
      component.ngOnInit();
      expect(component.projects.length).toBe(mockProjects.length);
      expect(component.projects).toEqual(mockProjects);
    });

    it('should populate projects$ observable from GithubService', (done: DoneFn) => {
      component.ngOnInit();
      component.projects$?.subscribe(projects => {
        expect(projects.length).toBe(mockProjects.length);
        expect(projects).toEqual(mockProjects);
        done();
      });
    });
  });

  it('currentIndex should be initialized to 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  describe('nextProject', () => {
    beforeEach(() => {
      component.projects = mockProjects; // Ensure projects are populated for these tests
    });

    it('should increment currentIndex', () => {
      component.currentIndex = 0;
      component.nextProject();
      expect(component.currentIndex).toBe(1);
    });

    it('should loop to the beginning if at the end of projects array', () => {
      component.currentIndex = mockProjects.length - 1;
      component.nextProject();
      expect(component.currentIndex).toBe(0);
    });

    it('should not change currentIndex if projects array is empty', () => {
      component.projects = [];
      component.currentIndex = 0;
      component.nextProject();
      expect(component.currentIndex).toBe(0);
    });
  });

  describe('previousProject', () => {
    beforeEach(() => {
      component.projects = mockProjects; // Ensure projects are populated
    });

    it('should decrement currentIndex', () => {
      component.currentIndex = 1;
      component.previousProject();
      expect(component.currentIndex).toBe(0);
    });

    it('should loop to the end if at the beginning of projects array', () => {
      component.currentIndex = 0;
      component.previousProject();
      expect(component.currentIndex).toBe(mockProjects.length - 1);
    });

    it('should not change currentIndex if projects array is empty', () => {
      component.projects = [];
      component.currentIndex = 0;
      component.previousProject();
      expect(component.currentIndex).toBe(0);
    });
  });

  // Optional: Basic DOM test example (can be expanded)
  describe('DOM rendering', () => {
    it('should display project name after ngOnInit', () => {
      fixture.detectChanges(); // Trigger ngOnInit and initial data binding
      const compiled = fixture.nativeElement as HTMLElement;
      // Assuming the first project's name is rendered in an element with class 'project-name'
      // This test is simple and might need adjustment based on actual HTML structure
      const projectNameElement = compiled.querySelector('.project-name');
      expect(projectNameElement?.textContent).toContain(mockProjects[0].name);
    });
  });
});
