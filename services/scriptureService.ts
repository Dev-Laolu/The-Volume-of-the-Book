
import { GoogleGenAI, Type } from "@google/genai";
import { Devotional } from "../types";
import { fetchChapter } from "./bibleService";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const RESTRICTED_BOOKS = [
  { name: 'Psalms', chapters: 150 },
  { name: 'Matthew', chapters: 28 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Song of Solomon', chapters: 8 },
  { name: 'Philippians', chapters: 4 },
  { name: 'Romans', chapters: 16 },
  { name: 'Mark', chapters: 16 },
  { name: 'Isaiah', chapters: 66 },
  { name: 'John', chapters: 21 }
];

export const getVerseInsights = async (verse: string, context: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `Provide a deep theological and historical insight for this verse: "${verse}". 
    The current context is: ${context}. Keep the tone reverent, scholarly yet accessible. 
    Focus on original language nuances if applicable.`,
  });
  return response.text;
};

export const searchBibleWithAI = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `The user is searching for something in the Bible: "${query}". 
    Interpret this query (keywords, themes, or partial references) and return a list of the 5 most relevant specific Bible references (e.g., "John 3:16", "Romans 8:28").
    Return ONLY a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
    },
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return [];
  }
};

export const getDailyBread = async (): Promise<Devotional> => {
  // Use date-based seed for consistent "daily" random selection
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Deterministic "random" book selection based on date
  const bookIndex = dateSeed % RESTRICTED_BOOKS.length;
  const selectedBook = RESTRICTED_BOOKS[bookIndex];
  
  // Deterministic "random" chapter selection based on seed
  const chapterSeed = (dateSeed * 13) % selectedBook.chapters;
  const selectedChapter = chapterSeed + 1;

  try {
    // 1. Fetch the chapter content locally
    const chapterData = await fetchChapter(selectedBook.name, selectedChapter);
    
    // 2. Select a random verse from this chapter based on seed
    const verseIndex = (dateSeed * 7) % chapterData.verses.length;
    const selectedVerse = chapterData.verses[verseIndex];
    
    // 3. Ask Gemini to generate reflections for the locally selected verse
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `Generate the "Daily Bread" for today based on this specific verse: "${selectedVerse.book_name} ${selectedVerse.chapter}:${selectedVerse.verse} - ${selectedVerse.text}". 
      1. Provide a title for this Daily Bread.
      2. Write a short reflective message (about 200 words).
      3. Conclude with a short prayer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            verse: { type: Type.STRING },
            content: { type: Type.STRING },
            prayer: { type: Type.STRING },
          },
          required: ["title", "verse", "content", "prayer"],
        },
      },
    });
    
    const devotional = JSON.parse(response.text);
    devotional.verse = `${selectedVerse.book_name} ${selectedVerse.chapter}:${selectedVerse.verse}`;
    return devotional;

  } catch (error) {
    console.error("Local random verse selection failed:", error);
    return {
      title: "The Lamp of the Word",
      verse: "Psalms 119:105",
      content: "Thy word is a lamp unto my feet, and a light unto my path. In the journey of life, we often find ourselves in dark and uncertain places.",
      prayer: "Lord, thank You for the guidance of Your Word. Amen."
    };
  }
};

export const startBibleStudyChat = (systemInstruction: string) => {
  // In @google/genai ^1.41.0, chats are likely created via sessions
  return ai.chats.create({
    model: 'gemini-1.5-flash',
    config: {
      systemInstruction: systemInstruction + " You are a wise and patient Bible scholar. Help the user understand the 'Volume of the Book'. Answer theological questions with scriptural references.",
    },
  });
};
