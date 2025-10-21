'use client'

import { use } from 'react'
import Link from 'next/link'
import { sampleResponses } from '@/lib/sample-questionnaires'
import { colorSchemes } from '@/lib/newsletter-suggestions'

export default function NewsletterPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  
  // For demo, using ocean-blue color scheme
  const colorScheme = colorSchemes.find(s => s.id === 'ocean-blue') || colorSchemes[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href={`/admin/newsletters/${resolvedParams.id}`} className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
                ← Back to Newsletter
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Preview</h1>
              <p className="text-sm text-gray-600">Sample newsletter with 5 contributors</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Preview Container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Email Preview */}
          <div style={{ backgroundColor: colorScheme.background }}>
            {/* Header */}
            <div 
              className="p-12 text-center text-white"
              style={{ 
                background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)` 
              }}
            >
              <h1 className="text-4xl font-bold mb-3">📰 Smith Family Newsletter</h1>
              <p className="text-lg opacity-90">Monthly Edition #12 • December 2024</p>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Special Question Section */}
              <div 
                className="rounded-lg p-6 mb-8 border-2"
                style={{ 
                  backgroundColor: colorScheme.background,
                  borderColor: colorScheme.primary 
                }}
              >
                <h2 className="text-2xl font-bold mb-3" style={{ color: colorScheme.primary }}>
                  ✨ Special Question This Month
                </h2>
                <p className="text-lg text-gray-700">
                  What are you most grateful for this year?
                </p>
              </div>

              {/* Responses */}
              <div className="space-y-8">
                {sampleResponses.map((response, index) => (
                  <div 
                    key={index}
                    className="rounded-lg p-6 border-l-4"
                    style={{ 
                      backgroundColor: 'white',
                      borderLeftColor: colorScheme.primary,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Contributor Name */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        {response.user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: colorScheme.primary }}>
                          {response.user.name}
                        </h3>
                        <p className="text-sm text-gray-500">{response.user.email}</p>
                      </div>
                    </div>

                    {/* Answers */}
                    <div className="space-y-4">
                      {Object.entries(response.answers).map(([question, answer], qIndex) => (
                        <div key={qIndex}>
                          <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                            <span style={{ color: colorScheme.primary }}>Q:</span>
                            <span>{question}</span>
                          </h4>
                          <div className="ml-6 text-gray-700 leading-relaxed">
                            <span className="font-semibold" style={{ color: colorScheme.secondary }}>A:</span> {answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2">
                  Sent with ❤️ from Smith Family Newsletter
                </p>
                <p className="text-sm text-gray-500">
                  Stay connected with your family • {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">💡</span>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">About This Preview</h3>
              <p className="text-blue-800 text-sm mb-3">
                This is a sample newsletter showing how your family updates will look when sent to recipients. 
                The preview includes responses from 5 contributors with real-world examples.
              </p>
              <div className="space-y-2 text-sm text-blue-700">
                <p><strong>✓</strong> Each contributor's section is clearly separated</p>
                <p><strong>✓</strong> Questions and answers are formatted for easy reading</p>
                <p><strong>✓</strong> Color scheme creates visual consistency</p>
                <p><strong>✓</strong> Special questions are highlighted at the top</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}