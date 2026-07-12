export interface HomeProject {
  slug: string;
  href: string;
  img: string;
  /** Optional silent autoplay clip shown in the fullscreen expand. Falls
   *  back to a slow Ken Burns pan on `img` when absent. */
  video?: string;
  title: string;
  tags: string[];
  desc?: string;
  outcome?: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface AweLetter {
  letter: string;
  label: string;
  href: string;
}

export interface TimelineEntry {
  year: string;
  label: string;
}
