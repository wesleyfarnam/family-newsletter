'use client'

import { colorSchemes, ColorScheme } from '@/lib/newsletter-suggestions'

interface ColorSchemeSelectorProps {
  selectedScheme?: string
  onSelect: (schemeId: string) => void
}

export default function ColorSchemeSelector({ selectedScheme, onSelect }: ColorSchemeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Choose Color Scheme
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            type="button"
            onClick={() => onSelect(scheme.id)}
            className={`relative p-3 rounded-lg border-2 transition hover:shadow-md ${
              selectedScheme === scheme.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {/* Color Preview */}
            <div className="mb-2 rounded overflow-hidden">
              <div 
                className="h-8 flex"
                style={{ backgroundColor: scheme.primary }}
              >
                <div className="flex-1" style={{ backgroundColor: scheme.primary }}></div>
                <div className="flex-1" style={{ backgroundColor: scheme.secondary }}></div>
                <div className="flex-1" style={{ backgroundColor: scheme.accent }}></div>
              </div>
            </div>

            {/* Scheme Info */}
            <div className="text-left">
              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                {scheme.name}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2">
                {scheme.description}
              </p>
            </div>

            {/* Selected Indicator */}
            {selectedScheme === scheme.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}