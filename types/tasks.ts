export interface Itask {
    id: string;            //to uniquely identify the task
    text: string;
    isCompleted: boolean;    //completion status
    description?: string; // Optional description field
    lastUpdated?: string; // Optional last updated timestamp
  }
  
