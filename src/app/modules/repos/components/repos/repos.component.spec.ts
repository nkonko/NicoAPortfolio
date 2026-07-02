import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideTransloco, TranslocoLoader } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { ReposComponent } from './repos.component';
import { BasicsSelector } from '../../../../core/store/selectors/app.selector';
import { ProjectsSelector } from '../../../../core/store/selectors/app.selector';
import { ReposConfig } from '../../models/repos-config.model';
import { translocoConfig } from '../../../../core/i18n/transloco.config';
import { of } from 'rxjs';

describe('ReposComponent', () => {
  let component: ReposComponent;
  let fixture: ComponentFixture<ReposComponent>;
  let store: MockStore;
  let httpMock: HttpTestingController;
  let projectsSelectorMock: any;
  let basicsSelectorMock: any;

  const mockProjects = [
    { name: 'AlphaRepo', githubUrl: 'https://github.com/user/alpha', primaryLanguage: 'TypeScript' },
    { name: 'BetaRepo', githubUrl: 'https://github.com/user/beta', primaryLanguage: 'C#' },
    { name: 'GammaRepo', githubUrl: 'https://github.com/user/gamma', primaryLanguage: 'Rust' }
  ];

  const mockBasics = {
    profiles: [
      { network: 'GitHub', url: 'https://github.com/nkonko' }
    ]
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReposComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState: { app: { profile: undefined } } }),
        provideTransloco({
          config: translocoConfig,
          loader: class MockLoader implements TranslocoLoader {
            getTranslation() { return of({ repos: { title: 'GitHub Repos', empty: 'No repositories configured.' } }); }
          },
        }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    httpMock = TestBed.inject(HttpTestingController);
    projectsSelectorMock = store.overrideSelector(ProjectsSelector, undefined);
    basicsSelectorMock = store.overrideSelector(BasicsSelector, mockBasics);

    fixture = TestBed.createComponent(ReposComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  function flushConfig(config: ReposConfig | null) {
    const req = httpMock.expectOne('assets/json/reposConfig.json');
    if (config === null) {
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    } else {
      req.flush(config);
    }
  }

  it('should render repo cards on happy path', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [
      { name: 'AlphaRepo', enabled: true },
      { name: 'BetaRepo', enabled: true },
      { name: 'GammaRepo', enabled: true }
    ]});
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(3);
    expect(cards[0].nativeElement.textContent).toContain('AlphaRepo');
    expect(cards[1].nativeElement.textContent).toContain('BetaRepo');
    expect(cards[2].nativeElement.textContent).toContain('GammaRepo');
  });

  it('should show all repos when config is missing (null)', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig(null);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(3);
  });

  it('should show empty state when all repos are disabled', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [
      { name: 'AlphaRepo', enabled: false },
      { name: 'BetaRepo', enabled: false },
      { name: 'GammaRepo', enabled: false }
    ]});
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(0);

    const emptyMsg = fixture.debugElement.query(By.css('.has-text-centered p'));
    expect(emptyMsg.nativeElement.textContent).toContain('No repositories configured');
  });

  it('should show loading when profile is not loaded', () => {
    projectsSelectorMock.setResult(undefined);
    store.refreshState();
    fixture.detectChanges();

    // Loading state takes precedence — spinner is visible
    const loadingSpinner = fixture.debugElement.query(By.css('.fa-spinner'));
    expect(loadingSpinner).toBeTruthy();

    // No cards should render (repos$ is not subscribed when loading)
    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(0);
  });

  it('should show only enabled repos when config has mixed settings', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [
      { name: 'AlphaRepo', enabled: true },
      { name: 'BetaRepo', enabled: false },
      { name: 'GammaRepo', enabled: true }
    ]});
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(2);
    expect(cards[0].nativeElement.textContent).toContain('AlphaRepo');
    expect(cards[1].nativeElement.textContent).toContain('GammaRepo');
  });

  it('should sort repos alphabetically', () => {
    const unsortedProjects = [
      { name: 'ZetaRepo', githubUrl: 'https://github.com/user/zeta' },
      { name: 'AlphaRepo', githubUrl: 'https://github.com/user/alpha' },
      { name: 'BetaRepo', githubUrl: 'https://github.com/user/beta' }
    ];
    projectsSelectorMock.setResult(unsortedProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [
      { name: 'AlphaRepo', enabled: true },
      { name: 'BetaRepo', enabled: true },
      { name: 'ZetaRepo', enabled: true }
    ]});
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(3);
    expect(cards[0].nativeElement.textContent).toContain('AlphaRepo');
    expect(cards[1].nativeElement.textContent).toContain('BetaRepo');
    expect(cards[2].nativeElement.textContent).toContain('ZetaRepo');
  });

  it('should cap at 8 repos when more are available', () => {
    const manyProjects = Array.from({ length: 12 }, (_, i) => ({
      name: `Repo-${String.fromCharCode(65 + i)}`,
      githubUrl: `https://github.com/user/repo-${i}`
    }));
    projectsSelectorMock.setResult(manyProjects);
    store.refreshState();
    fixture.detectChanges();

    const allEnabled = { repos: manyProjects.map(p => ({ name: p.name, enabled: true })) };
    flushConfig(allEnabled);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(8);
  });

  it('should filter out repos without githubUrl', () => {
    const mixed = [
      { name: 'HasUrl', githubUrl: 'https://github.com/user/has' },
      { name: 'NoUrl', githubUrl: '' },
      { name: 'NullUrl', githubUrl: null as any }
    ];
    projectsSelectorMock.setResult(mixed);
    store.refreshState();
    fixture.detectChanges();

    flushConfig(null);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(1);
    expect(cards[0].nativeElement.textContent).toContain('HasUrl');
  });

  it('should use repositoryUrl as fallback when githubUrl is empty', () => {
    const projects = [
      { name: 'Main', githubUrl: '', repositoryUrl: 'https://github.com/user/main' },
      { name: 'Both', githubUrl: 'https://github.com/user/both', repositoryUrl: 'https://old.com/both' }
    ];
    projectsSelectorMock.setResult(projects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig(null);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(2);
  });

  it('should show only repos listed and enabled in config when config has partial entries', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [{ name: 'AlphaRepo', enabled: true }] });
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(1);
    expect(cards[0].nativeElement.textContent).toContain('AlphaRepo');
  });

  it('should create fallback repo cards for enabled config entries missing from projects', () => {
    projectsSelectorMock.setResult(mockProjects);
    basicsSelectorMock.setResult(mockBasics);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [{ name: 'NicoAPortfolio', enabled: true }] });
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('.repo-card a'));
    expect(link.nativeElement.textContent).toContain('NicoAPortfolio');
    expect(link.nativeElement.getAttribute('href')).toBe('https://github.com/nkonko/NicoAPortfolio');
  });

  it('should preserve config order when config is present', () => {
    projectsSelectorMock.setResult(mockProjects);
    store.refreshState();
    fixture.detectChanges();

    flushConfig({ repos: [
      { name: 'GammaRepo', enabled: true },
      { name: 'AlphaRepo', enabled: true },
      { name: 'BetaRepo', enabled: true }
    ]});
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.repo-card'));
    expect(cards.length).toBe(3);
    expect(cards[0].nativeElement.textContent).toContain('GammaRepo');
    expect(cards[1].nativeElement.textContent).toContain('AlphaRepo');
    expect(cards[2].nativeElement.textContent).toContain('BetaRepo');
  });
});
