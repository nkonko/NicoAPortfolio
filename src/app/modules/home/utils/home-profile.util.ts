import { Work } from '@core/models/gitConnectProfile/work';

const LABEL_EXPERTISE_SEPARATOR = ' with expertise in ';

export function normalizeJobLabel(label: string): string {
  const trimmedLabel = label.trim().replace(/\.$/, '');
  const expertiseIndex = trimmedLabel.toLowerCase().indexOf(LABEL_EXPERTISE_SEPARATOR);

  if (expertiseIndex === -1) {
    return trimmedLabel;
  }

  return trimmedLabel.slice(0, expertiseIndex).trim();
}

function toMonthIndex(year: number, month: number): number {
  return year * 12 + (month - 1);
}

function getRangeFromWork(work: Work): { start: number; end: number } | null {
  const startYear = work.start?.year;
  const startMonth = work.start?.month;

  if (!startYear || !startMonth) {
    return null;
  }

  const now = new Date();
  const endYear = work.isCurrentRole ? now.getFullYear() : work.end?.year;
  const endMonth = work.isCurrentRole ? now.getMonth() + 1 : work.end?.month;

  if (!endYear || !endMonth) {
    return null;
  }

  const start = toMonthIndex(startYear, startMonth);
  const end = toMonthIndex(endYear, endMonth);

  if (end < start) {
    return null;
  }

  return { start, end };
}

function resolveYearsFromWorkHistory(workItems: Work[] | null | undefined): number {
  if (!workItems?.length) {
    return 0;
  }

  const coveredMonths = new Set<number>();

  for (const work of workItems) {
    const range = getRangeFromWork(work);
    if (!range) {
      continue;
    }

    for (let month = range.start; month <= range.end; month += 1) {
      coveredMonths.add(month);
    }
  }

  return coveredMonths.size > 0 ? Math.max(1, Math.floor(coveredMonths.size / 12)) : 0;
}

export function resolveYearsOfExperience(
  yearsOfExperience: number | null | undefined,
  workItems?: Work[] | null
): number {
  if (typeof yearsOfExperience === 'number' && yearsOfExperience > 0) {
    return yearsOfExperience;
  }

  return resolveYearsFromWorkHistory(workItems);
}