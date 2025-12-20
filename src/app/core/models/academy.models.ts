export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  examUrl: string
  videoCompleted: boolean
  examPassed: boolean
}
