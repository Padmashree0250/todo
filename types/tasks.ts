export interface Itask {
    id: string;
    text: string;
    isCompleted: boolean;
    description?: string; // Optional description field
    lastUpdated?: string; // Optional last updated timestamp
  }
  