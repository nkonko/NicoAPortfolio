import { Component, ChangeDetectionStrategy, computed, signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Work } from '@core/models/gitConnectProfile/work';
import { AppState } from '@core/store/models/app.state';
import { WorkSelector } from '@core/store/selectors/app.selector';
import { Store } from '@ngrx/store';
import { NgClass, DatePipe } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

interface SummarySection {
  title: string;
  content: string;
}

const SUMMARY_LABELS = [
  'Description', 'Backend-Tecnologies', 'Frontend-Tecnologies',
  'Devops', 'Databases', 'Extra', 'Duties',
] as const;

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, DatePipe, TranslocoModule]
})
export class ExperienceComponent {
  private store = inject(Store<AppState>);
  private works = toSignal(this.store.select(WorkSelector));

  protected worksList = computed(() => this.works() ?? []);

  protected selectedWork = signal<Work | null>(null);

  protected selectedWorkSections = computed<SummarySection[]>(() => {
    const raw = this.selectedWork()?.summary ?? '';
    return this.parseSummary(raw);
  });

  constructor() {
    effect(() => {
      const list = this.worksList();
      if (list.length > 0 && !this.selectedWork()) {
        this.selectedWork.set(list[0]);
      }
    });
  }

  selectWork(index: number): void {
    const work = this.worksList()[index];
    if (work) {
      this.selectedWork.set(work);
      this.goToSummary();
    }
  }

  private goToSummary(): void {
    const element = document.getElementById('summary');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  private parseSummary(raw: string): SummarySection[] {
    const sections: SummarySection[] = [];
    const lines = raw.split('\n');
    let current: SummarySection | null = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const labelMatch = trimmed.match(
        new RegExp(`^(${SUMMARY_LABELS.join('|')}):\\s*(.*)`, 'i')
      );

      if (labelMatch) {
        current = { title: labelMatch[1], content: labelMatch[2] };
        sections.push(current);
      } else if (current) {
        current.content += (current.content ? '\n' : '') + trimmed;
      } else {
        current = { title: '', content: trimmed };
        sections.push(current);
      }
    }

    return sections;
  }
}
