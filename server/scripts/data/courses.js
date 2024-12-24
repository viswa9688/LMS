export const sampleCourses = [
  {
    title: 'Web Development Fundamentals',
    description: 'A comprehensive introduction to modern web development',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Programming',
    level: 'beginner',
    price: 0,
    modules: [
      {
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML5',
        order: 1,
        content: [
          {
            type: 'video',
            title: 'HTML Basics',
            description: 'Understanding HTML structure and elements',
            url: 'https://example.com/video1',
            duration: 600,
            order: 1,
          },
          {
            type: 'text',
            title: 'HTML Best Practices',
            content: 'Learn about semantic HTML and accessibility',
            order: 2,
          }
        ],
      },
      {
        title: 'CSS Fundamentals',
        description: 'Master the basics of CSS styling',
        order: 2,
        content: [
          {
            type: 'video',
            title: 'CSS Selectors',
            description: 'Understanding CSS selectors and specificity',
            url: 'https://example.com/video2',
            duration: 540,
            order: 1,
          }
        ],
      }
    ],
    status: 'published',
    tags: ['web development', 'html', 'css', 'beginner'],
  }
];