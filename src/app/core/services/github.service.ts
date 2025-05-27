import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Optional: Define an interface for the project structure for better type safety
export interface GithubProject {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string; // Optional property
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor() { }

  getTop5Projects(): Observable<GithubProject[]> {
    const mockProjects: GithubProject[] = [
      {
        name: 'Portfolio V1',
        description: 'My personal portfolio website showcasing my skills and projects. Built with Angular and Bulma.',
        html_url: 'https://github.com/nkonko/portfolio-v1',
        stargazers_count: 150,
        forks_count: 30,
        language: 'TypeScript'
      },
      {
        name: 'Ngx-State-Manager',
        description: 'A simple and efficient state management library for Angular applications, inspired by Redux.',
        html_url: 'https://github.com/nkonko/ngx-state-manager',
        stargazers_count: 75,
        forks_count: 15,
        language: 'TypeScript'
      },
      {
        name: 'Dotnet-Core-Web-Api-Boilerplate',
        description: 'A comprehensive boilerplate for building RESTful APIs with .NET Core, including JWT authentication and Swagger.',
        html_url: 'https://github.com/nkonko/dotnet-core-web-api-boilerplate',
        stargazers_count: 200,
        forks_count: 55,
        language: 'C#'
      },
      {
        name: 'Realtime-Chat-App-SignalR',
        description: 'A real-time chat application built with ASP.NET Core SignalR and Angular.',
        html_url: 'https://github.com/nkonko/realtime-chat-app-signalr',
        stargazers_count: 120,
        forks_count: 40,
        language: 'C# & TypeScript'
      },
      {
        name: 'AlgoMaster',
        description: 'A collection of data structures and algorithms implemented in Python, for learning and practice.',
        html_url: 'https://github.com/nkonko/algomaster',
        stargazers_count: 90,
        forks_count: 25,
        language: 'Python'
      }
    ];
    return of(mockProjects);
  }
}
