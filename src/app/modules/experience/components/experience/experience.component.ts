import { Component, ChangeDetectionStrategy, computed, signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Work } from '@core/models/gitConnectProfile/work';
import { ContentTranslationService } from '@core/i18n/content-translation.service';
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
  'Description', 'Descripción',
  'Backend-Tecnologies', 'Tecnologías backend',
  'Frontend-Tecnologies', 'Tecnologías frontend',
  'Devops', 'DevOps',
  'Databases', 'Bases de datos',
  'Extra',
  'Duties', 'Responsabilidades',
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
  private contentTranslation = inject(ContentTranslationService);
  private works = toSignal(this.store.select(WorkSelector), { initialValue: [] as Work[] });
  private activeLang = toSignal(this.contentTranslation.langChanges$, {
    initialValue: this.contentTranslation.activeLang,
  });

  protected selectedWorkIndex = signal(0);

  protected worksList = computed(() => {
    this.activeLang();

    return (this.works() ?? []).map((work, index) => ({
      ...work,
      position: this.contentTranslation.get(`experience.work.${index}.position`, work.position),
      summary: this.contentTranslation.get(`experience.work.${index}.summary`, work.summary ?? ''),
    }));
  });

  protected selectedWork = computed<Work | null>(() => this.worksList()[this.selectedWorkIndex()] ?? null);

  protected selectedWorkSections = computed<SummarySection[]>(() => {
    const raw = this.selectedWork()?.summary ?? '';
    return this.parseSummary(raw);
  });

  constructor() {
    effect(() => {
      const list = this.worksList();
      if (list.length === 0) {
        return;
      }

      if (this.selectedWorkIndex() >= list.length) {
        this.selectedWorkIndex.set(0);
      }
    });
  }

  selectWork(index: number): void {
    if (this.worksList()[index]) {
      this.selectedWorkIndex.set(index);
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
