import { BibleChapter } from "../types";
import { searchBibleWithAI } from "./scriptureService";

export const fetchChapter = async (book: string, chapter: number): Promise<BibleChapter> => {
  const response = await fetch(`https://bible-api.com/${book}+${chapter}?translation=kjv`);
  if (!response.ok) throw new Error("Failed to fetch chapter");
  const data = await response.json();
  return data;
};

export const searchBible = async (query: string): Promise<any> => {
  const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
  if (!response.ok) throw new Error("Search failed");
  const data = await response.json();
  return data;
};

export const searchSmart = async (query: string): Promise<any> => {
  // 1. Try direct reference or simple keyword search via API
  try {
    const directResult = await searchBible(query);
    if (directResult.verses && directResult.verses.length > 0) {
      return directResult;
    }
  } catch (e) {
    console.log("Direct search failed, trying AI...");
  }

  // 2. Fallback to AI-powered keyword discovery
  const aiReferences = await searchBibleWithAI(query);
  if (aiReferences && aiReferences.length > 0) {
    const allVerses: any[] = [];
    for (const ref of aiReferences) {
      try {
        const refResult = await searchBible(ref);
        if (refResult.verses) {
          allVerses.push(...refResult.verses);
        } else if (refResult.text) {
          allVerses.push(refResult);
        }
      } catch (e) {}
    }
    return { verses: allVerses, isAiGenerated: true };
  }

  throw new Error("No results found");
};
