export interface Lesson {
    id: number;
    title: string;
    videoUrl: string;
    completed: boolean;
}

export interface Course {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    modules: Module[];
}

export interface Module {
    id: number;
    title: string;
    lessons: Lesson[];
}