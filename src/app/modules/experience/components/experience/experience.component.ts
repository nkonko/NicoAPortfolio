import { Component, OnDestroy, OnInit } from '@angular/core';
import { Work } from '@core/models/gitConnectProfile/work';
import { AppState } from '@core/store/models/app.state';
import { WorkSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<void>();
  protected works!: Work[];
  protected work$: Observable<Work[] | undefined> = this.store.select(WorkSelector).pipe(
    takeUntil(this.unsubscribe),
    map(works => {
      if (works) {
        return works.map(work => {
          let newWorks: Work;
          const rawSummary = work!.summary;
          const newSummary = rawSummary
            .replace('Description:', '<b>Description:</b>')
            .replace('Backend-Tecnologies:', '<br><br><b>Backend-Tecnologies:</b><br>')
            .replace('Frontend-Tecnologies:', '<br><br><b>Frontend-Tecnologies:</b><br>')
            .replace('Databases:', '<br><br><b>Databases:</b><br>')
            .replace('Extra:', '<br><br><b>Extra:</b><br>')
            .replace('Duties:', '<br><br><b>Duties:</b><br>')
            .replace('\n', '<br>');

          newWorks = { ...work, summary: newSummary, id: uuidv4() };

          return newWorks;
        });
      }
      return works;
    })
  );

  constructor(
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.work$.subscribe(works => {
      if (works) {
        this.works = works;
      }
    });
  }

  goToSection(section: string): void {
    const element = document.getElementById(section);
    element!.scrollIntoView({ behavior: 'smooth' });
  }

}
