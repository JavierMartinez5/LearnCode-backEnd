export interface INavData {
  section: ISection
  chapters: IChapter[];
}

export interface ISection {
  tutorialId: string
  sectionId: string;
  position: number
  sectionTitle: string;
}

export interface ISectionOnCreate {
  tutorialId: string
  position: number
  sectionTitle: string;
}

export interface IChapter {
  sectionId: string;
  position: number
  chapterId: string;
  chapterTitle: string;
}

export interface IChapterOnCreate {
  sectionId: string
  position: number
  chapterTitle: string;
}
