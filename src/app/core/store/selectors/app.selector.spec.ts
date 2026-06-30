import { ProjectsSelector } from './app.selector';
import { AppState } from '../models/app.state';

describe('ProjectsSelector', () => {
  const defaultContactState = { form: undefined, event: undefined };

  it('should select projects from profile', () => {
    const mockProjects = [
      { name: 'RepoA', githubUrl: 'https://github.com/user/repo-a' },
      { name: 'RepoB', githubUrl: 'https://github.com/user/repo-b' }
    ];

    const state: AppState = {
      app: { profile: { projects: mockProjects } as any },
      contact: defaultContactState
    };

    const result = ProjectsSelector(state);
    expect(result).toBe(mockProjects);
    expect(result!.length).toBe(2);
  });

  it('should return undefined when profile is not loaded', () => {
    const state: AppState = {
      app: { profile: undefined },
      contact: defaultContactState
    };

    const result = ProjectsSelector(state);
    expect(result).toBeUndefined();
  });

  it('should return undefined when profile has no projects property', () => {
    const state: AppState = {
      app: { profile: {} as any },
      contact: defaultContactState
    };

    const result = ProjectsSelector(state);
    expect(result).toBeUndefined();
  });

  it('should return empty array when profile has empty projects', () => {
    const state: AppState = {
      app: { profile: { projects: [] } as any },
      contact: defaultContactState
    };

    const result = ProjectsSelector(state);
    expect(result).toEqual([]);
  });
});
