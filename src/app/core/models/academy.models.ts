export interface Course {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  examUrl: string;
  order: number;

  // progreso del usuario
  examPassed: boolean;
  score?: number;
  attempts?: number;
  approvedAt?: string;
}
