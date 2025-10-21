// Newsletter name generator based on family last name

export interface NewsletterSuggestion {
  name: string
  description: string
  style: 'classic' | 'modern' | 'playful' | 'elegant'
}

export function generateNewsletterNames(lastName: string): NewsletterSuggestion[] {
  const capitalizedName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
  
  return [
    // Classic/Traditional
    {
      name: `The ${capitalizedName} Times`,
      description: 'Classic newspaper style - timeless and professional',
      style: 'classic'
    },
    {
      name: `${capitalizedName} Family Chronicles`,
      description: 'Traditional storytelling approach',
      style: 'classic'
    },
    {
      name: `The ${capitalizedName} Gazette`,
      description: 'Old-school newspaper feel',
      style: 'classic'
    },
    
    // Modern/Contemporary
    {
      name: `The ${capitalizedName} Flash`,
      description: 'Quick, modern updates',
      style: 'modern'
    },
    {
      name: `${capitalizedName} Connect`,
      description: 'Modern and tech-savvy',
      style: 'modern'
    },
    {
      name: `${capitalizedName} Pulse`,
      description: 'Contemporary and energetic',
      style: 'modern'
    },
    
    // Playful/Fun
    {
      name: `The ${capitalizedName} Scoop`,
      description: 'Fun and lighthearted',
      style: 'playful'
    },
    {
      name: `${capitalizedName} Buzz`,
      description: 'Exciting family news',
      style: 'playful'
    },
    {
      name: `The ${capitalizedName} Beat`,
      description: 'Rhythmic and lively',
      style: 'playful'
    },
    {
      name: `${capitalizedName} Happenings`,
      description: 'Casual and friendly',
      style: 'playful'
    },
    
    // Elegant/Sophisticated
    {
      name: `The ${capitalizedName} Journal`,
      description: 'Sophisticated and refined',
      style: 'elegant'
    },
    {
      name: `${capitalizedName} Reflections`,
      description: 'Thoughtful and elegant',
      style: 'elegant'
    },
    {
      name: `The ${capitalizedName} Collection`,
      description: 'Curated family moments',
      style: 'elegant'
    },
    
    // Creative/Unique
    {
      name: `${capitalizedName} Stories`,
      description: 'Personal and narrative-focused',
      style: 'modern'
    },
    {
      name: `The ${capitalizedName} Update`,
      description: 'Straightforward and clear',
      style: 'modern'
    },
    {
      name: `${capitalizedName} Moments`,
      description: 'Capturing special times',
      style: 'elegant'
    },
    {
      name: `The ${capitalizedName} Post`,
      description: 'Classic news format',
      style: 'classic'
    },
    {
      name: `${capitalizedName} News & Views`,
      description: 'Comprehensive family updates',
      style: 'classic'
    }
  ]
}

export interface ColorScheme {
  id: string
  name: string
  description: string
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  preview: {
    header: string
    body: string
    highlight: string
  }
}

export const colorSchemes: ColorScheme[] = [
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Calm and professional with blue tones',
    primary: '#0ea5e9',
    secondary: '#0284c7',
    accent: '#38bdf8',
    background: '#f0f9ff',
    text: '#0c4a6e',
    preview: {
      header: 'bg-gradient-to-r from-blue-500 to-blue-600',
      body: 'bg-blue-50',
      highlight: 'bg-blue-100'
    }
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural and refreshing green palette',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    background: '#f0fdf4',
    text: '#064e3b',
    preview: {
      header: 'bg-gradient-to-r from-green-500 to-green-600',
      body: 'bg-green-50',
      highlight: 'bg-green-100'
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Warm and energetic orange hues',
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#fb923c',
    background: '#fff7ed',
    text: '#7c2d12',
    preview: {
      header: 'bg-gradient-to-r from-orange-500 to-orange-600',
      body: 'bg-orange-50',
      highlight: 'bg-orange-100'
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Elegant and sophisticated purple tones',
    primary: '#a855f7',
    secondary: '#9333ea',
    accent: '#c084fc',
    background: '#faf5ff',
    text: '#581c87',
    preview: {
      header: 'bg-gradient-to-r from-purple-500 to-purple-600',
      body: 'bg-purple-50',
      highlight: 'bg-purple-100'
    }
  },
  {
    id: 'cherry-red',
    name: 'Cherry Red',
    description: 'Bold and passionate red palette',
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    background: '#fef2f2',
    text: '#7f1d1d',
    preview: {
      header: 'bg-gradient-to-r from-red-500 to-red-600',
      body: 'bg-red-50',
      highlight: 'bg-red-100'
    }
  },
  {
    id: 'slate-gray',
    name: 'Slate Gray',
    description: 'Modern and minimalist gray tones',
    primary: '#64748b',
    secondary: '#475569',
    accent: '#94a3b8',
    background: '#f8fafc',
    text: '#1e293b',
    preview: {
      header: 'bg-gradient-to-r from-slate-500 to-slate-600',
      body: 'bg-slate-50',
      highlight: 'bg-slate-100'
    }
  },
  {
    id: 'golden-yellow',
    name: 'Golden Yellow',
    description: 'Cheerful and bright yellow shades',
    primary: '#eab308',
    secondary: '#ca8a04',
    accent: '#facc15',
    background: '#fefce8',
    text: '#713f12',
    preview: {
      header: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      body: 'bg-yellow-50',
      highlight: 'bg-yellow-100'
    }
  },
  {
    id: 'rose-pink',
    name: 'Rose Pink',
    description: 'Soft and romantic pink palette',
    primary: '#ec4899',
    secondary: '#db2777',
    accent: '#f472b6',
    background: '#fdf2f8',
    text: '#831843',
    preview: {
      header: 'bg-gradient-to-r from-pink-500 to-pink-600',
      body: 'bg-pink-50',
      highlight: 'bg-pink-100'
    }
  },
  {
    id: 'teal-aqua',
    name: 'Teal Aqua',
    description: 'Fresh and vibrant teal colors',
    primary: '#14b8a6',
    secondary: '#0d9488',
    accent: '#2dd4bf',
    background: '#f0fdfa',
    text: '#134e4a',
    preview: {
      header: 'bg-gradient-to-r from-teal-500 to-teal-600',
      body: 'bg-teal-50',
      highlight: 'bg-teal-100'
    }
  },
  {
    id: 'classic-black',
    name: 'Classic Black & White',
    description: 'Timeless monochrome elegance',
    primary: '#1f2937',
    secondary: '#111827',
    accent: '#4b5563',
    background: '#ffffff',
    text: '#000000',
    preview: {
      header: 'bg-gradient-to-r from-gray-800 to-gray-900',
      body: 'bg-white',
      highlight: 'bg-gray-100'
    }
  }
]

export interface LayoutTemplate {
  id: string
  name: string
  description: string
  preview: string
  features: string[]
}

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'classic',
    name: 'Classic Newsletter',
    description: 'Traditional newspaper-style layout with clear sections',
    preview: '/previews/classic.png',
    features: [
      'Header with newsletter title',
      'Edition number and date',
      'Organized sections for each contributor',
      'Question and answer format',
      'Footer with family message'
    ]
  },
  {
    id: 'modern',
    name: 'Modern Cards',
    description: 'Contemporary card-based design with visual hierarchy',
    preview: '/previews/modern.png',
    features: [
      'Card-based layout',
      'Large header image area',
      'Colorful section dividers',
      'Photo grid support',
      'Modern typography'
    ]
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant with focus on content',
    preview: '/previews/minimal.png',
    features: [
      'Clean white space',
      'Simple typography',
      'Subtle borders',
      'Focus on readability',
      'Elegant simplicity'
    ]
  },
  {
    id: 'magazine',
    name: 'Magazine Style',
    description: 'Editorial magazine layout with featured content',
    preview: '/previews/magazine.png',
    features: [
      'Featured story section',
      'Multi-column layout',
      'Pull quotes',
      'Image captions',
      'Professional design'
    ]
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    description: 'Playful scrapbook-inspired design',
    preview: '/previews/scrapbook.png',
    features: [
      'Decorative borders',
      'Handwritten-style fonts',
      'Photo frames',
      'Colorful accents',
      'Personal touch'
    ]
  }
]