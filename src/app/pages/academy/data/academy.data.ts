import { Course } from '../../../core/models/academy.models';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Inducción ProScience',
    description: 'Curso de bienvenida y lineamientos generales',
    completed: false,
    modules: [
      {
        id: 1,
        title: 'Introducción',
        lessons: [
          {
            id: 1,
            title: 'Bienvenida',
            videoUrl: 'https://prosciencelab-my.sharepoint.com/personal/coordinador_ti_proscience_com_co/_layouts/15/embed.aspx?UniqueId=dc4f8ae1-13da-43bd-ad13-60fe2c337380&embed=%7B%22ust%22%3Afalse%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
            completed: false
          },
          {
            id: 2,
            title: 'Normas generales',
            videoUrl: 'https://prosciencelab-my.sharepoint.com/personal/coordinador_ti_proscience_com_co/_layouts/15/embed.aspx?UniqueId=ea9a08d3-cd51-4fad-bfc8-abd4dfcf6f6a&embed=%7B%22ust%22%3Afalse%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create',
            completed: false
          }
        ]
      }
    ]
  }
];
