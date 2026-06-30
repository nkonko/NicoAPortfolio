import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { AppState } from 'app/core/store/models/app.state';
import { ProfileState } from 'app/core/store/models/profile.state';
import { AppSelector } from 'app/core/store/selectors/app.selector';
import { CollapseMessageComponent } from '../../../../shared/collapse-message/component/collapse-message.component';

const LOCAL_SUMMARY = `I'm a dedicated full-stack developer currently employed at a company based in the USA. With a strong passion for technology. I constantly looking for opportunities to expand my knowledge and contribute to innovative projects.

Team Player Mentality:
 I enjoy collaborating with others and I believe in teamwork. Working in teams allowed me to grow up and learn.

Emphasis on Quality:
 One of my core values is commitment to delivering high-quality work. I believe that clean and maintainable code is crucial for building scalable solutions.`;

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CollapseMessageComponent]
})
export class AboutComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private profileRes$: Observable<ProfileState> = this.store.select(AppSelector);
  protected presentation!: string;
  protected paragraphs: { title: string, paragraph: string; }[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.profileRes$.pipe(
      takeUntil(this.unsubscribe$),
      filter(res => res.profile != null),
      map(() => {
        const rawSummary = LOCAL_SUMMARY;

        let dotArray = rawSummary.split('.\n');

        this.presentation = dotArray[0];

        for (let element of dotArray) {
          if (element.includes(':') && element.startsWith('\n')) {
            let algo = element.split(/:\n/);

            this.paragraphs.push({ title: algo.at(0)!.replace(/\n/g, '').trim(), paragraph: algo.at(1)!.trim() });
          }
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
