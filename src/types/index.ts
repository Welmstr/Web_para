export interface NavItem {
  label: string;
  path: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  level: 'gold' | 'silver' | 'bronze' | 'special';
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TeamStat {
  label: string;
  value: string;
  unit?: string;
}

export interface Award {
  competition: string;
  awards: string[];
  years: string;
}
