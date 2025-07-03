import express from 'express';

const router = express.Router();

// Mock lessons data
const lessons = [
  {
    id: 1,
    title: "Pair letters and sounds",
    section: 1,
    unit: 1,
    type: "basics",
    status: "completed",
    xp: 10,
    description: "Learn basic letter-sound relationships",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "Match the letter with its sound",
        options: ["A", "B", "C", "D"],
        correct: "A",
        audio: "/audio/letter-a.mp3"
      },
      {
        id: 2,
        type: "select",
        question: "Which letter makes the 'ah' sound?",
        options: ["B", "A", "C", "D"],
        correct: "A"
      }
    ]
  },
  {
    id: 2,
    title: "Basic greetings",
    section: 1,
    unit: 1,
    type: "vocabulary",
    status: "completed",
    xp: 15,
    description: "Learn common greeting phrases",
    exercises: [
      {
        id: 1,
        type: "translate",
        question: "Translate: Hello",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correct: "Hola"
      }
    ]
  },
  {
    id: 3,
    title: "Numbers 1-10",
    section: 1,
    unit: 1,
    type: "numbers",
    status: "completed",
    xp: 20,
    description: "Learn to count from 1 to 10",
    exercises: [
      {
        id: 1,
        type: "audio",
        question: "What number do you hear?",
        options: ["uno", "dos", "tres", "cuatro"],
        correct: "uno",
        audio: "/audio/number-1.mp3"
      }
    ]
  },
  {
    id: 4,
    title: "Family members",
    section: 1,
    unit: 2,
    type: "vocabulary",
    status: "available",
    xp: 25,
    description: "Learn family vocabulary",
    exercises: [
      {
        id: 1,
        type: "match",
        question: "Match the family member",
        options: ["madre", "padre", "hermano", "hermana"],
        correct: "madre"
      }
    ]
  },
  {
    id: 5,
    title: "Colors",
    section: 1,
    unit: 2,
    type: "vocabulary",
    status: "locked",
    xp: 20,
    description: "Learn basic colors",
    exercises: []
  }
];

// Get all lessons
router.get('/', (req, res) => {
  res.json({
    success: true,
    lessons: lessons.map(lesson => ({
      id: lesson.id,
      title: lesson.title,
      section: lesson.section,
      unit: lesson.unit,
      type: lesson.type,
      status: lesson.status,
      xp: lesson.xp,
      description: lesson.description
    }))
  });
});

// Get lesson by ID
router.get('/:id', (req, res) => {
  const lessonId = parseInt(req.params.id);
  const lesson = lessons.find(l => l.id === lessonId);
  
  if (!lesson) {
    return res.status(404).json({
      success: false,
      message: 'Lesson not found'
    });
  }

  res.json({
    success: true,
    lesson
  });
});

// Get learning path (structured lessons)
router.get('/path/structure', (req, res) => {
  const learningPath = {
    sections: [
      {
        section: 1,
        title: "Basics",
        units: [
          {
            unit: 1,
            title: "Getting Started",
            lessons: lessons.filter(l => l.section === 1 && l.unit === 1)
          },
          {
            unit: 2,
            title: "Vocabulary Building",
            lessons: lessons.filter(l => l.section === 1 && l.unit === 2)
          }
        ]
      }
    ]
  };

  res.json({
    success: true,
    learningPath
  });
});

export default router;
