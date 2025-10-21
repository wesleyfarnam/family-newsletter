# CMS Integration Guide

## Overview

The Family Newsletter application includes a flexible CMS (Content Management System) integration that allows you to manage dynamic content like blog posts, FAQs, features, and testimonials.

---

## Current Implementation

### Built-in CMS

The application includes a simple JSON-based CMS (`lib/cms.ts`) that can be used immediately:

**Features:**
- ✅ Content types: pages, blog, FAQ, features, testimonials
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Search functionality
- ✅ Featured content support
- ✅ Metadata and tagging
- ✅ API endpoints ready

**Usage:**
```typescript
import { getContentByType, createContent } from '@/lib/cms';

// Get all FAQs
const faqs = await getContentByType('faq');

// Create new content
const content = await createContent({
  type: 'blog',
  title: 'My Blog Post',
  slug: 'my-blog-post',
  content: 'Content here...',
});
```

---

## External CMS Integration Options

### Option 1: Contentful (Recommended)

**Why Contentful?**
- Easy to use interface
- Powerful content modeling
- Great free tier
- Excellent documentation

**Setup Steps:**

1. **Create Contentful Account**
   - Go to https://www.contentful.com/
   - Sign up for free account

2. **Install Contentful SDK**
   ```bash
   npm install contentful
   ```

3. **Add Environment Variables**
   ```bash
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```

4. **Update CMS Library**
   ```typescript
   // lib/cms-contentful.ts
   import { createClient } from 'contentful';

   const client = createClient({
     space: process.env.CONTENTFUL_SPACE_ID!,
     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
   });

   export async function getContentfulEntries(contentType: string) {
     const entries = await client.getEntries({
       content_type: contentType,
     });
     return entries.items;
   }
   ```

5. **Create Content Models in Contentful**
   - Blog Post
   - FAQ
   - Feature
   - Testimonial

**Estimated Time:** 2-3 hours

---

### Option 2: Strapi (Self-hosted)

**Why Strapi?**
- Open source
- Self-hosted (full control)
- Customizable
- Free forever

**Setup Steps:**

1. **Install Strapi**
   ```bash
   npx create-strapi-app@latest my-cms --quickstart
   ```

2. **Configure Strapi**
   - Create content types
   - Set up API permissions
   - Configure CORS

3. **Add Environment Variables**
   ```bash
   STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_api_token
   ```

4. **Update CMS Library**
   ```typescript
   // lib/cms-strapi.ts
   export async function getStrapiContent(endpoint: string) {
     const response = await fetch(
       `${process.env.STRAPI_URL}/api/${endpoint}`,
       {
         headers: {
           Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
         },
       }
     );
     return await response.json();
   }
   ```

**Estimated Time:** 4-6 hours

---

### Option 3: Sanity (Structured Content)

**Why Sanity?**
- Real-time collaboration
- Powerful query language (GROQ)
- Great developer experience
- Generous free tier

**Setup Steps:**

1. **Install Sanity**
   ```bash
   npm install @sanity/client
   ```

2. **Create Sanity Project**
   - Go to https://www.sanity.io/
   - Create new project

3. **Add Environment Variables**
   ```bash
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_API_TOKEN=your_token
   ```

4. **Update CMS Library**
   ```typescript
   // lib/cms-sanity.ts
   import { createClient } from '@sanity/client';

   const client = createClient({
     projectId: process.env.SANITY_PROJECT_ID!,
     dataset: process.env.SANITY_DATASET!,
     useCdn: true,
     apiVersion: '2024-01-01',
   });

   export async function getSanityContent(query: string) {
     return await client.fetch(query);
   }
   ```

**Estimated Time:** 3-4 hours

---

## Database-backed CMS (Recommended for Production)

For production use, store CMS content in your database:

### Migration

```sql
-- Add CMS content table
CREATE TABLE cms_content (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  metadata JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Prisma Schema

```prisma
model CMSContent {
  id        String   @id @default(uuid())
  type      String
  title     String
  slug      String   @unique
  content   String
  metadata  Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Estimated Time:** 1-2 hours

---

## API Endpoints

### Get Content

```bash
GET /api/cms/content
GET /api/cms/content?type=blog
GET /api/cms/content?type=faq
```

### Create Content (Super Admin Only)

```bash
POST /api/cms/content
Content-Type: application/json

{
  "type": "blog",
  "title": "My Post",
  "slug": "my-post",
  "content": "Content here...",
  "metadata": {
    "author": "John Doe",
    "tags": ["family", "updates"]
  }
}
```

---

## Content Types

### Blog Post
```typescript
{
  type: 'blog',
  title: 'How to Create Great Newsletters',
  slug: 'create-great-newsletters',
  content: 'Full blog post content...',
  metadata: {
    author: 'Admin',
    publishedAt: '2025-01-15',
    tags: ['tips', 'guide'],
    featured: true
  }
}
```

### FAQ
```typescript
{
  type: 'faq',
  title: 'How do I invite family members?',
  slug: 'invite-family-members',
  content: 'Go to the Manage Users page and click Invite User...',
  metadata: {
    category: 'getting-started',
    order: 1
  }
}
```

### Feature
```typescript
{
  type: 'feature',
  title: 'Beautiful Templates',
  slug: 'beautiful-templates',
  content: 'Choose from 10 stunning color schemes...',
  metadata: {
    icon: '🎨',
    featured: true
  }
}
```

### Testimonial
```typescript
{
  type: 'testimonial',
  title: 'Sarah Johnson',
  slug: 'sarah-johnson',
  content: 'This has completely transformed how our family stays connected...',
  metadata: {
    role: 'Mom of 3',
    rating: 5,
    avatar: '👩'
  }
}
```

---

## Using CMS Content in Pages

### Example: Dynamic FAQ Page

```typescript
// app/faq/page.tsx
import { getContentByType } from '@/lib/cms';

export default async function FAQPage() {
  const faqs = await getContentByType('faq');

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      {faqs.map(faq => (
        <div key={faq.id}>
          <h2>{faq.title}</h2>
          <p>{faq.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Dynamic Blog

```typescript
// app/blog/page.tsx
import { getContentByType } from '@/lib/cms';

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.metadata?.author}</p>
          <p>{post.content.substring(0, 200)}...</p>
          <a href={`/blog/${post.slug}`}>Read more</a>
        </article>
      ))}
    </div>
  );
}
```

---

## Caching Strategy

For better performance, implement caching:

```typescript
// lib/cms-cached.ts
import { unstable_cache } from 'next/cache';
import { getContentByType } from './cms';

export const getCachedContent = unstable_cache(
  async (type: string) => {
    return await getContentByType(type as any);
  },
  ['cms-content'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['cms'],
  }
);
```

---

## Super Admin CMS Management

Add CMS management to the Super Admin dashboard:

1. **Content List** - View all content
2. **Create Content** - Add new content
3. **Edit Content** - Update existing content
4. **Delete Content** - Remove content
5. **Preview** - See how content looks

---

## Best Practices

1. **Use Slugs** - Always use URL-friendly slugs
2. **Add Metadata** - Include author, tags, dates
3. **Cache Content** - Implement caching for performance
4. **Version Control** - Track content changes
5. **Backup Regularly** - Export content periodically
6. **SEO Optimization** - Add meta descriptions
7. **Image Optimization** - Compress images
8. **Content Review** - Review before publishing

---

## Migration Path

### Current → Database-backed
1. Export current content to JSON
2. Add Prisma schema
3. Run migration
4. Import content to database
5. Update API endpoints

**Time:** 2-3 hours

### Database-backed → External CMS
1. Export content from database
2. Set up external CMS
3. Import content
4. Update API integration
5. Test thoroughly

**Time:** 4-8 hours

---

## Comparison Table

| Feature | Built-in | Contentful | Strapi | Sanity |
|---------|----------|------------|--------|--------|
| Cost | Free | Free tier | Free | Free tier |
| Hosting | Included | Cloud | Self-host | Cloud |
| Setup Time | 0 min | 2-3 hrs | 4-6 hrs | 3-4 hrs |
| UI | None | Excellent | Good | Excellent |
| Flexibility | Low | High | Very High | High |
| Learning Curve | Easy | Easy | Medium | Medium |

---

## Recommendation

**For Quick Start:** Use built-in CMS (already implemented)

**For Production:** 
- Small teams: Contentful
- Full control: Strapi
- Developer-focused: Sanity
- Simple needs: Database-backed

---

## Support

For CMS integration help:
- Contentful: https://www.contentful.com/developers/docs/
- Strapi: https://docs.strapi.io/
- Sanity: https://www.sanity.io/docs

---

**Last Updated:** 2025-10-21