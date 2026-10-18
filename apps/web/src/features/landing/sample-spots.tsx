/**
 * TEMPORARY sample data so the section has something to show.
 * Before launch, replace this with real showcase spots from the database
 * (spots where is_showcase = true) and delete this file.
 */
export interface ShowcaseSpot {
    id: string;
    name: string;
    area: string;
    tagline: string;
    rating: number;
    ratingCount: number;
  }
  
  export const SAMPLE_SPOTS: ShowcaseSpot[] = [
    { id: "1", name: "Sample spot one", area: "Near you", tagline: "Grilled, smoky and served hot.", rating: 4.6, ratingCount: 23 },
    { id: "2", name: "Sample spot two", area: "Near you", tagline: "A morning favourite with a loyal queue.", rating: 4.4, ratingCount: 15 },
    { id: "3", name: "Sample spot three", area: "Near you", tagline: "Open late, best after dark.", rating: 4.8, ratingCount: 31 },
  ];