import { Skill } from '@core/models/gitConnectProfile/skill';

const keywordMap: Record<string, string[]> = {
  'C#': ['Language'],
  'TypeScript': ['Language'],
  'JavaScript': ['Language'],
  'HTML5': ['Language'],
  'Sass': ['Language'],
  'Css': ['Language'],
  'Angular': ['Framework'],
  'React': ['Framework'],
  '.NET': ['Framework'],
  'Bootstrap': ['Framework'],
  'Angular Material': ['Framework'],
  'Bulma': ['Framework'],
  'Node Js': ['Framework'],
  'Microservices': ['Arquitecture'],
  'Microsoft SQL Server': ['Database'],
  'MySQL': ['Database'],
  'Mongo Db': ['Database'],
  'Solr': ['Database'],
  'Git': ['Tool'],
  'JIRA': ['Tool'],
  'Azure Devops': ['Tool'],
  'RabbitMQ': ['Tool'],
  'Selenium': ['Tool'],
  'Aspose': ['Tool'],
  'Agile metodology': ['Metodology'],
  'Scrum': ['Metodology'],
  'RXJS': ['Library'],
  'NGRX': ['Library'],
  'flipt': ['Tool'],
};

export function assignSkillKeywords(skills: Skill[]): Skill[] {
  return skills.map(skill => {
    if (skill.keywords.length > 0) return skill;
    const mapped = keywordMap[skill.name];
    return { ...skill, keywords: mapped ?? ['Tool'] };
  });
}
