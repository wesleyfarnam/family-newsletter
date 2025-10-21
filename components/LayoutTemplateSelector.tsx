'use client'

import { layoutTemplates, LayoutTemplate } from '@/lib/newsletter-suggestions'

interface LayoutTemplateSelectorProps {
  selectedLayout?: string
  onSelect: (layoutId: string) => void
}

export default function LayoutTemplateSelector({ selectedLayout, onSelect }: LayoutTemplateSelectorProps) {
  const layoutPreviews: Record<string, string> = {
    classic: `
      <div class="border-2 border-gray-300 rounded">
        <div class="bg-gray-800 text-white p-2 text-center text-xs font-bold">NEWSLETTER TITLE</div>
        <div class="p-2 space-y-1">
          <div class="h-1 bg-gray-300 rounded"></div>
          <div class="h-1 bg-gray-300 rounded w-3/4"></div>
          <div class="h-1 bg-gray-200 rounded w-1/2 mt-2"></div>
          <div class="h-1 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    `,
    modern: `
      <div class="border-2 border-gray-300 rounded overflow-hidden">
        <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-6"></div>
        <div class="p-2 space-y-2">
          <div class="bg-white border border-gray-200 rounded p-1.5 space-y-1">
            <div class="h-1 bg-gray-300 rounded w-1/2"></div>
            <div class="h-1 bg-gray-200 rounded"></div>
          </div>
          <div class="bg-white border border-gray-200 rounded p-1.5 space-y-1">
            <div class="h-1 bg-gray-300 rounded w-1/2"></div>
            <div class="h-1 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    `,
    minimal: `
      <div class="border border-gray-300 rounded bg-white">
        <div class="p-2 space-y-2">
          <div class="text-center">
            <div class="h-1 bg-gray-800 rounded w-1/2 mx-auto"></div>
          </div>
          <div class="space-y-1 pt-2">
            <div class="h-1 bg-gray-200 rounded"></div>
            <div class="h-1 bg-gray-200 rounded w-4/5"></div>
            <div class="h-1 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    `,
    magazine: `
      <div class="border-2 border-gray-300 rounded overflow-hidden">
        <div class="bg-gray-200 h-8"></div>
        <div class="p-2 grid grid-cols-2 gap-1">
          <div class="space-y-1">
            <div class="h-1 bg-gray-300 rounded"></div>
            <div class="h-1 bg-gray-200 rounded"></div>
          </div>
          <div class="space-y-1">
            <div class="h-1 bg-gray-300 rounded"></div>
            <div class="h-1 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    `,
    scrapbook: `
      <div class="border-4 border-dashed border-gray-400 rounded-lg bg-yellow-50">
        <div class="p-2 space-y-2">
          <div class="bg-white border-2 border-gray-300 rounded transform -rotate-1 p-1.5">
            <div class="h-1 bg-gray-300 rounded"></div>
          </div>
          <div class="bg-white border-2 border-gray-300 rounded transform rotate-1 p-1.5">
            <div class="h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    `
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose Newsletter Layout
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {layoutTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={`relative p-4 rounded-lg border-2 transition hover:shadow-lg text-left ${
              selectedLayout === template.id
                ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {/* Preview */}
            <div className="mb-3 bg-gray-100 rounded p-2 h-32 flex items-center justify-center">
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: layoutPreviews[template.id] }}
              />
            </div>

            {/* Template Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {template.name}
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                {template.description}
              </p>
              
              {/* Features */}
              <div className="space-y-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-start gap-1 text-xs text-gray-500">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Indicator */}
            {selectedLayout === template.id && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center">
                <span className="text-sm">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}