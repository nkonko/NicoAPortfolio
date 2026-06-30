import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReposConfigService } from './repos-config.service';
import { ReposConfig } from '../models/repos-config.model';

describe('ReposConfigService', () => {
  let service: ReposConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ReposConfigService
      ]
    });
    service = TestBed.inject(ReposConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return config object from valid JSON', () => {
    const mockData: ReposConfig = {
      repos: [
        { name: 'NicoAPortfolio', enabled: true },
        { name: 'other-repo', enabled: false }
      ]
    };

    service.getReposConfig().subscribe(config => {
      expect(config).not.toBeNull();
      expect(config!.repos.length).toBe(2);
      expect(config!.repos[0].name).toBe('NicoAPortfolio');
      expect(config!.repos[0].enabled).toBe(true);
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle only enabled names via helper', () => {
    const mockData: ReposConfig = {
      repos: [
        { name: 'repo-a', enabled: true },
        { name: 'repo-b', enabled: false },
        { name: 'repo-c', enabled: true }
      ]
    };

    service.getReposConfig().subscribe(config => {
      const enabled = service.getEnabledNames(config);
      expect(enabled.size).toBe(2);
      expect(enabled.has('repo-a')).toBe(true);
      expect(enabled.has('repo-b')).toBe(false);
      expect(enabled.has('repo-c')).toBe(true);
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    req.flush(mockData);
  });

  it('should return null when file is missing (404)', () => {
    service.getReposConfig().subscribe(config => {
      expect(config).toBeNull();
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  it('should return null when JSON is malformed', () => {
    service.getReposConfig().subscribe(config => {
      expect(config).toBeNull();
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    req.flush('Invalid content', { status: 422, statusText: 'Unprocessable Entity' });
  });

  it('should return null on network error', () => {
    service.getReposConfig().subscribe(config => {
      expect(config).toBeNull();
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    req.error(new ProgressEvent('Network error'));
  });

  it('should return config when repos array is empty', () => {
    const mockData: ReposConfig = { repos: [] };

    service.getReposConfig().subscribe(config => {
      expect(config).not.toBeNull();
      expect(config!.repos).toEqual([]);
    });

    const req = httpMock.expectOne('assets/json/reposConfig.json');
    req.flush(mockData);
  });
});
