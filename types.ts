
export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  reference: string;
  verses: Verse[];
  text: string;
}

export interface Book {
  id: string;
  name: string;
  testament: 'Old' | 'New';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Devotional {
  title: string;
  verse: string;
  content: string;
  prayer: string;
}
