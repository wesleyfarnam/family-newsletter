'use client'

import { useState } from 'react'
import { generateNewsletterNames, NewsletterSuggestion } from '@/lib/newsletter-suggestions'

interface NewsletterNameSuggestionsProps {
  onSelect: (name: string) => void
  selectedName?: string
}

export default function NewsletterNameSuggestions({ onSelect, selectedName }: NewsletterNameSuggestionsProps) {
  const [lastName, setLastName] = useState('')
  const [suggestions, setSuggestions] = useState<NewsletterSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleGenerateSuggestions = () => {
    if (lastName.trim()) {
      const names = generateNewsletterNames(lastName.trim())
      setSuggestions(names)
      setShowSuggestions(true)
    }
  }

  const handleSelectSuggestion = (name: string) => {
    onSelect(name)
    setShowSuggestions(false)
  }

  const styleColors = {
    classic: 'bg-blue-50 border-blue-200 text-blue-700',
    modern: 'bg-purple-50 border-purple-200 text-purple-700',
    playful: 'bg-orange-50 border-orange-200 text-orange-700',
    elegant: 'bg-gray-50 border-gray-200 text-gray-700'
  }

  const styleIcons = {
    classic: '📰',
    modern: '⚡',
    playful: '🎉',
    elegant: '✨'
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Get Creative Name Suggestions
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerateSuggestions()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your family last name"
          />
          <button
            type="button"
            onClick={handleGenerateSuggestions}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Generate Ideas
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          💡 We'll create creative newsletter names based on your family name
        </p>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-gray-900">
              ✨ {suggestions.length} Creative Suggestions
            </h4>
            <button
              type="button"
              onClick={() => setShowSuggestions(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion.name)}
                className={`text-left p-3 rounded-lg border-2 transition hover:shadow-md ${
                  selectedName === suggestion.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{styleIcons[suggestion.style]}</span>
                      <span className="font-semibold text-gray-900">
                        {suggestion.name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${styleColors[suggestion.style]}`}>
                    {suggestion.style}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}