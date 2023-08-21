import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  protected hoverState: { [key: string]: boolean; } = {};
  protected selectedWork!: Work;
  protected works!: Work[];
  protected work$: Observable<Work[] | undefined> = this.store.select(WorkSelector);

  constructor(
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit(): void {
    this.work$.pipe(
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
              .replace('Devops:', '<br><br><b>Devops:</b><br>')
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
    ).subscribe(works => {
      if (works) {
        this.works = works;
        this.selectedWork = this.works[0]
      }
    });
  }

  goToSummary(): void {
    const element = document.getElementById('summary');
    element!.scrollIntoView({ behavior: 'smooth' });
  }


  hoverTimelineMarker(isHovered: boolean, id: string): void {
    this.hoverState[id] = isHovered;
  }

  selectWork(id: string) {
    this.selectedWork = this.works.filter(w => w.id === id)[0];
    this.goToSummary();
  }

}
