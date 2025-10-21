// Simple CMS integration for managing content
// This can be extended to integrate with headless CMS like Strapi, Contentful, or Sanity

export interface CMSContent {
  id: string;
  type: 'page' | 'blog' | 'faq' | 'feature' | 'testimonial';
  title: string;
  slug: string;
  content: string;
  metadata?: {
    author?: string;
    publishedAt?: string;
    tags?: string[];
    featured?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// In-memory content store (replace with database or external CMS)
const contentStore: CMSContent[] = [
  {
    id: '1',
    type: 'feature',
    title: 'Beautiful Templates',
    slug: 'beautiful-templates',
    content: 'Choose from 10 stunning color schemes and 5 professional layouts to make your newsletter uniquely yours.',
    metadata: {
      featured: true,
      tags: ['design', 'templates'],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'faq',
    title: 'How does the free plan work?',
    slug: 'free-plan',
    content: 'The free plan includes 100 emails per month, perfect for small families. You can upgrade anytime if you need more.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get all content by type
export async function getContentByType(type: CMSContent['type']): Promise<CMSContent[]> {
  // In production, this would fetch from database or external CMS
  return contentStore.filter(item => item.type === type);
}

// Get content by slug
export async function getContentBySlug(slug: string): Promise<CMSContent | null> {
  return contentStore.find(item => item.slug === slug) || null;
}

// Get all content
export async function getAllContent(): Promise<CMSContent[]> {
  return contentStore;
}

// Create content
export async function createContent(data: Omit<CMSContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CMSContent> {
  const newContent: CMSContent = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  contentStore.push(newContent);
  return newContent;
}

// Update content
export async function updateContent(id: string, data: Partial<CMSContent>): Promise<CMSContent | null> {
  const index = contentStore.findIndex(item => item.id === id);
  
  if (index === -1) {
    return null;
  }
  
  contentStore[index] = {
    ...contentStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  return contentStore[index];
}

// Delete content
export async function deleteContent(id: string): Promise<boolean> {
  const index = contentStore.findIndex(item => item.id === id);
  
  if (index === -1) {
    return false;
  }
  
  contentStore.splice(index, 1);
  return true;
}

// Search content
export async function searchContent(query: string): Promise<CMSContent[]> {
  const lowerQuery = query.toLowerCase();
  return contentStore.filter(
    item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery) ||
      item.metadata?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get featured content
export async function getFeaturedContent(): Promise<CMSContent[]> {
  return contentStore.filter(item => item.metadata?.featured === true);
}

// External CMS Integration Examples:

// Contentful Integration
export async function fetchFromContentful(contentType: string) {
  // Example Contentful integration
  // const client = require('contentful').createClient({
  //   space: process.env.CONTENTFUL_SPACE_ID,
  //   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  // });
  // return await client.getEntries({ content_type: contentType });
}

// Strapi Integration
export async function fetchFromStrapi(endpoint: string) {
  // Example Strapi integration
  // const response = await fetch(`${process.env.STRAPI_URL}/api/${endpoint}`);
  // return await response.json();
}

// Sanity Integration
export async function fetchFromSanity(query: string) {
  // Example Sanity integration
  // const client = require('@sanity/client')({
  //   projectId: process.env.SANITY_PROJECT_ID,
  //   dataset: process.env.SANITY_DATASET,
  //   useCdn: true,
  // });
  // return await client.fetch(query);
}