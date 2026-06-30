import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CollapseMessageComponent } from '@shared/collapse-message/component/collapse-message.component';

interface AboutSection {
  title: string;
  paragraph: string;
}

const LOCAL_SUMMARY = `I'm a dedicated full-stack developer currently employed at a company based in the USA. With a strong passion for technology. I constantly looking for opportunities to expand my knowledge and contribute to innovative projects.

Team Player Mentality:
 I enjoy collaborating with others and I believe in teamwork. Working in teams allowed me to grow up and learn.

Emphasis on Quality:
 One of my core values is commitment to delivering high-quality work. I believe that clean and maintainable code is crucial for building scalable solutions.`;

function parseSummary(raw: string): { presentation: string; paragraphs: AboutSection[] } {
  const dotArray = raw.split('.\n');
  const paragraphs: AboutSection[] = [];

  for (const element of dotArray) {
    if (element.includes(':') && element.startsWith('\n')) {
      const parts = element.split(/:\n/);
      const title = parts.at(0)?.replace(/\n/g, '').trim() ?? '';
      const paragraph = parts.at(1)?.trim() ?? '';
      paragraphs.push({ title, paragraph });
    }
  }

  return { presentation: dotArray[0] ?? '', paragraphs };
}

const { presentation, paragraphs } = parseSummary(LOCAL_SUMMARY);

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CollapseMessageComponent]
})
export class AboutComponent {
  protected presentation = presentation;
  protected paragraphs = paragraphs;
}
