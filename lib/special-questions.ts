// Special Questions Library for Newsletter Editions

export interface SpecialQuestion {
  id: string
  category: string
  question: string
  season?: string
  icon: string
}

export const specialQuestions: SpecialQuestion[] = [
  // Reflection & Gratitude
  {
    id: 'gratitude-1',
    category: 'Reflection & Gratitude',
    question: 'What are you most grateful for this month?',
    icon: '🙏'
  },
  {
    id: 'gratitude-2',
    category: 'Reflection & Gratitude',
    question: 'What was your biggest accomplishment this quarter?',
    icon: '🏆'
  },
  {
    id: 'gratitude-3',
    category: 'Reflection & Gratitude',
    question: 'What made you smile this week?',
    icon: '😊'
  },
  {
    id: 'gratitude-4',
    category: 'Reflection & Gratitude',
    question: 'Who inspired you recently and why?',
    icon: '✨'
  },
  {
    id: 'gratitude-5',
    category: 'Reflection & Gratitude',
    question: 'What\'s one thing you\'re proud of?',
    icon: '🌟'
  },
  {
    id: 'gratitude-6',
    category: 'Reflection & Gratitude',
    question: 'What blessing are you counting today?',
    icon: '🙌'
  },

  // Future & Goals
  {
    id: 'future-1',
    category: 'Future & Goals',
    question: 'What are you looking forward to next month?',
    icon: '🎯'
  },
  {
    id: 'future-2',
    category: 'Future & Goals',
    question: 'What\'s your New Year\'s resolution?',
    season: 'winter',
    icon: '🎊'
  },
  {
    id: 'future-3',
    category: 'Future & Goals',
    question: 'What\'s one goal you want to achieve this quarter?',
    icon: '🎯'
  },
  {
    id: 'future-4',
    category: 'Future & Goals',
    question: 'What adventure do you want to plan?',
    icon: '🗺️'
  },
  {
    id: 'future-5',
    category: 'Future & Goals',
    question: 'What new skill do you want to learn?',
    icon: '📚'
  },
  {
    id: 'future-6',
    category: 'Future & Goals',
    question: 'What dream are you working towards?',
    icon: '💭'
  },

  // Family & Relationships
  {
    id: 'family-1',
    category: 'Family & Relationships',
    question: 'What\'s your favorite family memory from this month?',
    icon: '❤️'
  },
  {
    id: 'family-2',
    category: 'Family & Relationships',
    question: 'Who in the family made you laugh the most?',
    icon: '😂'
  },
  {
    id: 'family-3',
    category: 'Family & Relationships',
    question: 'What family tradition are you most excited about?',
    icon: '🎉'
  },
  {
    id: 'family-4',
    category: 'Family & Relationships',
    question: 'What\'s something you learned from a family member?',
    icon: '💡'
  },
  {
    id: 'family-5',
    category: 'Family & Relationships',
    question: 'How did you help someone in the family?',
    icon: '🤝'
  },
  {
    id: 'family-6',
    category: 'Family & Relationships',
    question: 'What makes your family special?',
    icon: '👨‍👩‍👧‍👦'
  },

  // Fun & Personal
  {
    id: 'fun-1',
    category: 'Fun & Personal',
    question: 'If you could travel anywhere next, where would it be?',
    icon: '✈️'
  },
  {
    id: 'fun-2',
    category: 'Fun & Personal',
    question: 'What\'s the best book/movie/show you enjoyed recently?',
    icon: '📺'
  },
  {
    id: 'fun-3',
    category: 'Fun & Personal',
    question: 'What\'s your favorite meal you had this month?',
    icon: '🍽️'
  },
  {
    id: 'fun-4',
    category: 'Fun & Personal',
    question: 'What hobby or activity brought you the most joy?',
    icon: '🎨'
  },
  {
    id: 'fun-5',
    category: 'Fun & Personal',
    question: 'What\'s something new you tried?',
    icon: '🆕'
  },
  {
    id: 'fun-6',
    category: 'Fun & Personal',
    question: 'What made you laugh out loud recently?',
    icon: '🤣'
  },

  // Seasonal - Spring
  {
    id: 'spring-1',
    category: 'Seasonal',
    question: 'What\'s your favorite thing about spring?',
    season: 'spring',
    icon: '🌸'
  },
  {
    id: 'spring-2',
    category: 'Seasonal',
    question: 'What are you planting or growing this spring?',
    season: 'spring',
    icon: '🌱'
  },
  {
    id: 'spring-3',
    category: 'Seasonal',
    question: 'What outdoor activity are you most excited about?',
    season: 'spring',
    icon: '🌳'
  },

  // Seasonal - Summer
  {
    id: 'summer-1',
    category: 'Seasonal',
    question: 'What summer activity are you most excited about?',
    season: 'summer',
    icon: '☀️'
  },
  {
    id: 'summer-2',
    category: 'Seasonal',
    question: 'What\'s your favorite summer memory so far?',
    season: 'summer',
    icon: '🏖️'
  },
  {
    id: 'summer-3',
    category: 'Seasonal',
    question: 'What\'s your go-to summer treat?',
    season: 'summer',
    icon: '🍦'
  },

  // Seasonal - Fall
  {
    id: 'fall-1',
    category: 'Seasonal',
    question: 'What\'s your favorite fall tradition?',
    season: 'fall',
    icon: '🍂'
  },
  {
    id: 'fall-2',
    category: 'Seasonal',
    question: 'What are you most thankful for this season?',
    season: 'fall',
    icon: '🦃'
  },
  {
    id: 'fall-3',
    category: 'Seasonal',
    question: 'What\'s your favorite autumn activity?',
    season: 'fall',
    icon: '🎃'
  },

  // Seasonal - Winter
  {
    id: 'winter-1',
    category: 'Seasonal',
    question: 'How are you staying active this winter?',
    season: 'winter',
    icon: '⛷️'
  },
  {
    id: 'winter-2',
    category: 'Seasonal',
    question: 'What\'s your favorite holiday tradition?',
    season: 'winter',
    icon: '🎄'
  },
  {
    id: 'winter-3',
    category: 'Seasonal',
    question: 'What\'s your favorite cozy winter activity?',
    season: 'winter',
    icon: '☕'
  },

  // Holidays
  {
    id: 'holiday-1',
    category: 'Holidays',
    question: 'How are you celebrating the holidays this year?',
    season: 'winter',
    icon: '🎁'
  },
  {
    id: 'holiday-2',
    category: 'Holidays',
    question: 'What\'s your favorite holiday memory?',
    icon: '🎊'
  },
  {
    id: 'holiday-3',
    category: 'Holidays',
    question: 'What holiday tradition means the most to you?',
    icon: '🕯️'
  },

  // Milestones & Celebrations
  {
    id: 'milestone-1',
    category: 'Milestones',
    question: 'What milestone are you celebrating?',
    icon: '🎈'
  },
  {
    id: 'milestone-2',
    category: 'Milestones',
    question: 'What achievement are you most proud of?',
    icon: '🏅'
  },
  {
    id: 'milestone-3',
    category: 'Milestones',
    question: 'What positive change have you made recently?',
    icon: '🌈'
  },

  // Wellness & Self-Care
  {
    id: 'wellness-1',
    category: 'Wellness',
    question: 'How are you taking care of yourself?',
    icon: '💆'
  },
  {
    id: 'wellness-2',
    category: 'Wellness',
    question: 'What brings you peace and calm?',
    icon: '🧘'
  },
  {
    id: 'wellness-3',
    category: 'Wellness',
    question: 'What healthy habit are you proud of?',
    icon: '💪'
  },

  // Creativity & Learning
  {
    id: 'creative-1',
    category: 'Creativity',
    question: 'What creative project are you working on?',
    icon: '🎨'
  },
  {
    id: 'creative-2',
    category: 'Creativity',
    question: 'What new thing did you learn recently?',
    icon: '📖'
  },
  {
    id: 'creative-3',
    category: 'Creativity',
    question: 'What inspires your creativity?',
    icon: '💡'
  }
]

// Helper function to get questions by category
export function getQuestionsByCategory(category: string): SpecialQuestion[] {
  return specialQuestions.filter(q => q.category === category)
}

// Helper function to get seasonal questions
export function getSeasonalQuestions(season: string): SpecialQuestion[] {
  return specialQuestions.filter(q => q.season === season)
}

// Helper function to get current season
export function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'fall'
  return 'winter'
}

// Helper function to get suggested questions for current time
export function getSuggestedQuestions(): SpecialQuestion[] {
  const currentSeason = getCurrentSeason()
  const seasonalQuestions = getSeasonalQuestions(currentSeason)
  
  // Mix seasonal with general questions
  const generalQuestions = specialQuestions
    .filter(q => !q.season)
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
  
  return [...seasonalQuestions, ...generalQuestions].slice(0, 10)
}

// Get all categories
export function getCategories(): string[] {
  return Array.from(new Set(specialQuestions.map(q => q.category)))
}

// Get random question
export function getRandomQuestion(): SpecialQuestion {
  return specialQuestions[Math.floor(Math.random() * specialQuestions.length)]
}