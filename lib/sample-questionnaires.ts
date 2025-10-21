// Sample questionnaire templates for family newsletters

export interface QuestionnaireTemplate {
  title: string
  description: string
  questions: Array<{
    id: string
    text: string
    type: 'text' | 'textarea'
    required: boolean
    placeholder?: string
    examples?: string[]
  }>
}

export const sampleQuestionnaires: QuestionnaireTemplate[] = [
  {
    title: 'Monthly Family Update',
    description: 'Share your highlights, updates, and news from the past month',
    questions: [
      {
        id: 'family-trips',
        text: 'Family Trips & Adventures',
        type: 'textarea',
        required: false,
        placeholder: 'Share any trips, vacations, or adventures you went on...',
        examples: [
          'We took a weekend trip to the mountains and went hiking!',
          'Visited grandma in Florida for a week - the kids loved the beach',
          'Road trip to Yellowstone - saw amazing wildlife and geysers',
          'Staycation at home but explored local parks and museums'
        ]
      },
      {
        id: 'job-updates',
        text: 'Job & Career Updates',
        type: 'textarea',
        required: false,
        placeholder: 'Any work-related news, promotions, new jobs, or achievements...',
        examples: [
          'Got promoted to Senior Manager! Starting my new role next month',
          'Started a new position at Tech Corp - loving the team so far',
          'Completed my certification in Project Management',
          'Celebrating 10 years at the company this month!',
          'Launched a new project that I\'ve been working on for months'
        ]
      },
      {
        id: 'sports-activities',
        text: 'Sports & Activities',
        type: 'textarea',
        required: false,
        placeholder: 'Share sports, hobbies, classes, or activities you or your kids are involved in...',
        examples: [
          'Emma joined the soccer team and scored her first goal!',
          'Started taking pottery classes - made my first bowl',
          'Training for a half marathon in the spring',
          'Kids started piano lessons and are loving it',
          'Joined a local book club - reading some great novels'
        ]
      },
      {
        id: 'good-news',
        text: 'General Good News & Celebrations',
        type: 'textarea',
        required: false,
        placeholder: 'Any exciting news, milestones, achievements, or things to celebrate...',
        examples: [
          'Our daughter got accepted to her dream college!',
          'We adopted a puppy - meet Max, our new golden retriever',
          'Celebrated our 15th wedding anniversary',
          'Finally finished renovating the kitchen',
          'Tommy lost his first tooth and the tooth fairy visited!',
          'Grandpa turned 80 - had a wonderful party with the whole family'
        ]
      },
      {
        id: 'period-recap',
        text: 'Overall Recap',
        type: 'textarea',
        required: false,
        placeholder: 'A brief summary of your month - anything else you want to share...',
        examples: [
          'It\'s been a busy but wonderful month. The kids are doing great in school and we\'re enjoying the fall weather.',
          'Quiet month for us - focused on home projects and quality family time.',
          'What a whirlwind! Between work, kids\' activities, and family events, we barely had time to breathe. But we wouldn\'t have it any other way!',
          'Grateful for good health and happy kids. Looking forward to the holidays ahead.'
        ]
      }
    ]
  },
  {
    title: 'Quarterly Family Highlights',
    description: 'Share your biggest moments and updates from the past quarter',
    questions: [
      {
        id: 'quarter-highlights',
        text: 'Top 3 Highlights This Quarter',
        type: 'textarea',
        required: false,
        placeholder: 'What were your top 3 memorable moments or achievements?',
        examples: [
          '1. Family vacation to Hawaii\n2. Sarah graduated from high school\n3. Bought our first home!',
          '1. Completed my MBA program\n2. Kids won their soccer tournament\n3. Celebrated 20th anniversary'
        ]
      },
      {
        id: 'travel-adventures',
        text: 'Travel & Adventures',
        type: 'textarea',
        required: false,
        placeholder: 'Any trips or adventures this quarter?',
        examples: [
          'Three-week European adventure - visited Paris, Rome, and Barcelona',
          'Multiple weekend getaways to explore our state'
        ]
      },
      {
        id: 'family-milestones',
        text: 'Family Milestones',
        type: 'textarea',
        required: false,
        placeholder: 'Birthdays, graduations, achievements, or other milestones...',
        examples: [
          'Jake turned 16 and got his driver\'s license!',
          'Emma graduated with honors and got into Stanford',
          'Celebrated our baby\'s first birthday'
        ]
      },
      {
        id: 'looking-ahead',
        text: 'Looking Ahead',
        type: 'textarea',
        required: false,
        placeholder: 'What are you looking forward to in the next quarter?',
        examples: [
          'Planning a big family reunion for the summer',
          'Kids starting new schools in the fall',
          'Excited about the holiday season and family traditions'
        ]
      }
    ]
  },
  {
    title: 'Weekly Family Check-in',
    description: 'Quick weekly update to stay connected',
    questions: [
      {
        id: 'week-highlight',
        text: 'Highlight of the Week',
        type: 'textarea',
        required: false,
        placeholder: 'What was the best part of your week?',
        examples: [
          'Had a great family game night on Friday',
          'Kids did amazing in their school play',
          'Finally finished that big project at work'
        ]
      },
      {
        id: 'activities',
        text: 'This Week\'s Activities',
        type: 'textarea',
        required: false,
        placeholder: 'What did you do this week?',
        examples: [
          'Soccer practice, piano lessons, and a birthday party',
          'Busy week with work deadlines and school events'
        ]
      },
      {
        id: 'next-week',
        text: 'Next Week\'s Plans',
        type: 'textarea',
        required: false,
        placeholder: 'What are you looking forward to next week?',
        examples: [
          'Family movie night and trying a new restaurant',
          'Kids have a field trip and we have date night planned'
        ]
      }
    ]
  }
]

// Sample responses from 5 contributors
export const sampleResponses = [
  {
    user: {
      name: 'John Smith',
      email: 'john@example.com'
    },
    answers: {
      'Family Trips & Adventures': 'We took an amazing road trip to Yellowstone National Park! The kids were in awe of Old Faithful and we saw bison, elk, and even a bear from a safe distance. We stayed in a cozy cabin and made s\'mores every night. It was the perfect family bonding experience.',
      'Job & Career Updates': 'Big news - I got promoted to Senior Director of Engineering! It\'s been a long journey and I\'m excited about the new challenges ahead. The team threw me a surprise celebration which was really touching.',
      'Sports & Activities': 'Tommy joined the little league baseball team and is absolutely loving it. He hit his first home run last week! I\'ve also started coaching his team which has been a great way to spend time together.',
      'General Good News & Celebrations': 'We celebrated our 15th wedding anniversary with a romantic dinner at our favorite restaurant. Also, we finally finished renovating the kitchen - it looks amazing and Sarah is already planning to host Thanksgiving!',
      'Overall Recap': 'What an incredible month! Between the promotion, Tommy\'s baseball, and the Yellowstone trip, we\'ve been busy but so grateful. The kids are thriving and we\'re making wonderful memories together.'
    }
  },
  {
    user: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com'
    },
    answers: {
      'Family Trips & Adventures': 'We spent a wonderful week at the beach in North Carolina. The kids learned to boogie board and we collected so many seashells. We rented a house right on the beach and watched the sunrise every morning with our coffee.',
      'Job & Career Updates': 'Started my new position as Marketing Director at GreenTech Solutions! The company culture is fantastic and I\'m working on some really exciting sustainable energy campaigns. It feels great to be doing work that aligns with my values.',
      'Sports & Activities': 'Emma started taking gymnastics classes and she\'s a natural! She\'s already working on her cartwheel and back handspring. I also joined a local running club and completed my first 10K race.',
      'General Good News & Celebrations': 'Our daughter Lily got accepted into the gifted and talented program at school! We\'re so proud of her hard work. Also, we adopted a rescue dog named Max - he\'s a golden retriever mix and the kids are obsessed.',
      'Overall Recap': 'Life is full and beautiful right now. New job, new puppy, and watching the kids grow and thrive. We\'re counting our blessings and looking forward to the fall season.'
    }
  },
  {
    user: {
      name: 'Michael Chen',
      email: 'michael@example.com'
    },
    answers: {
      'Family Trips & Adventures': 'We did a staycation this month but made it special by exploring our own city like tourists. We visited museums we\'d never been to, tried new restaurants, and discovered some beautiful hiking trails nearby. Sometimes the best adventures are in your own backyard!',
      'Job & Career Updates': 'Completed my MBA program after three years of night classes! It was challenging balancing work, school, and family, but I finally did it. My company is promoting me to VP of Operations as a result.',
      'Sports & Activities': 'Our son Jake made the varsity soccer team as a sophomore - we\'re so proud! I\'ve been attending all his games and they\'re having a great season. I also started taking guitar lessons, something I\'ve wanted to do for years.',
      'General Good News & Celebrations': 'We celebrated my parents\' 50th wedding anniversary with a big family party. All the cousins came into town and it was wonderful to have everyone together. Also, our daughter won first place in the science fair!',
      'Overall Recap': 'Feeling accomplished and grateful this month. The MBA completion was a huge milestone, and seeing the kids excel in their activities makes all the hard work worth it. Family is everything.'
    }
  },
  {
    user: {
      name: 'Emily Rodriguez',
      email: 'emily@example.com'
    },
    answers: {
      'Family Trips & Adventures': 'We took the kids to Disney World for the first time! It was magical seeing their faces light up meeting the characters. We stayed for 5 days and hit all four parks. Definitely exhausting but worth every minute.',
      'Job & Career Updates': 'I launched my own freelance graphic design business! After years of working for agencies, I finally took the leap. Already have three clients and loving the flexibility to work from home and be more present with the kids.',
      'Sports & Activities': 'Both kids started swimming lessons and are doing great. Sophia is working toward her lifeguard certification and Alex just moved up to the advanced class. We\'ve been spending lots of time at the community pool.',
      'General Good News & Celebrations': 'We bought our first house! After years of renting, we finally have a place to call our own. The kids each have their own rooms and we have a backyard for the first time. Moving was chaos but we\'re settling in nicely.',
      'Overall Recap': 'This has been a month of big changes and new beginnings. New business, new house, and making core memories with the kids. We\'re exhausted but happy and excited about this new chapter.'
    }
  },
  {
    user: {
      name: 'David Martinez',
      email: 'david@example.com'
    },
    answers: {
      'Family Trips & Adventures': 'We went camping in the Smoky Mountains for a long weekend. The kids loved sleeping in tents, roasting marshmallows, and going on nature hikes. We saw deer, wild turkeys, and even found a waterfall. Already planning our next camping trip!',
      'Job & Career Updates': 'Celebrating 20 years with my company this month! They threw me a nice party and I received a generous bonus. It\'s been a great journey and I\'m grateful to work with such amazing people.',
      'Sports & Activities': 'Our daughter Isabella started taking dance classes - ballet and jazz. She performed in her first recital and was absolutely beautiful on stage. My wife and I also joined a couples tennis league which has been fun.',
      'General Good News & Celebrations': 'My son graduated from college with honors! We\'re so proud of him. He already has a job lined up and will be moving to Seattle. Bittersweet to see him start this new chapter but excited for his future.',
      'Overall Recap': 'A month of celebrations and milestones. From my work anniversary to our son\'s graduation, we have so much to be thankful for. The camping trip was the perfect way to unwind and reconnect as a family.'
    }
  }
]