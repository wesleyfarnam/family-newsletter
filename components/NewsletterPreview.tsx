'use client'

import { colorSchemes } from '@/lib/newsletter-suggestions'

interface NewsletterPreviewProps {
  title: string
  colorScheme: string
  layout: string
}

export default function NewsletterPreview({ title, colorScheme, layout }: NewsletterPreviewProps) {
  const scheme = colorSchemes.find(s => s.id === colorScheme) || colorSchemes[0]
  
  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-600 ml-2">Newsletter Preview</div>
      </div>
      
      <div className="p-6" style={{ backgroundColor: scheme.background }}>
        {/* Header */}
        <div 
          className="rounded-t-lg p-8 text-center text-white mb-6"
          style={{ 
            background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.secondary} 100%)` 
          }}
        >
          <h1 className="text-2xl font-bold mb-2">📰 {title || 'Your Newsletter Title'}</h1>
          <p className="text-sm opacity-90">Edition #1 • {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content Preview */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {layout === 'classic' && (
            <div className="space-y-4">
              <div className="border-l-4 pl-4" style={{ borderColor: scheme.primary }}>
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  John Smith
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Q:</strong> What was your favorite moment this month?</p>
                  <p className="ml-4">A: We had a wonderful family picnic...</p>
                </div>
              </div>
              
              <div className="border-l-4 pl-4" style={{ borderColor: scheme.primary }}>
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  Jane Smith
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Q:</strong> What was your favorite moment this month?</p>
                  <p className="ml-4">A: Started a new hobby - painting!</p>
                </div>
              </div>
            </div>
          )}

          {layout === 'modern' && (
            <div className="grid gap-4">
              <div 
                className="rounded-lg p-4 shadow-sm"
                style={{ backgroundColor: scheme.background }}
              >
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  John Smith
                </h3>
                <p className="text-sm text-gray-600">
                  We had a wonderful family picnic at the park this weekend...
                </p>
              </div>
              
              <div 
                className="rounded-lg p-4 shadow-sm"
                style={{ backgroundColor: scheme.background }}
              >
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-600">
                  Started a new hobby - painting! Here's my first artwork...
                </p>
              </div>
            </div>
          )}

          {layout === 'minimal' && (
            <div className="space-y-6">
              <div className="text-center border-b pb-4">
                <h3 className="font-bold mb-2" style={{ color: scheme.text }}>
                  John Smith
                </h3>
                <p className="text-sm text-gray-600">
                  We had a wonderful family picnic at the park...
                </p>
              </div>
              
              <div className="text-center border-b pb-4">
                <h3 className="font-bold mb-2" style={{ color: scheme.text }}>
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-600">
                  Started a new hobby - painting!
                </p>
              </div>
            </div>
          )}

          {layout === 'magazine' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-24 bg-gray-200 rounded"></div>
                <h3 className="font-bold text-sm" style={{ color: scheme.primary }}>
                  John Smith
                </h3>
                <p className="text-xs text-gray-600">Family picnic highlights...</p>
              </div>
              
              <div className="space-y-2">
                <div className="h-24 bg-gray-200 rounded"></div>
                <h3 className="font-bold text-sm" style={{ color: scheme.primary }}>
                  Jane Smith
                </h3>
                <p className="text-xs text-gray-600">New painting hobby...</p>
              </div>
            </div>
          )}

          {layout === 'scrapbook' && (
            <div className="space-y-4">
              <div 
                className="border-4 border-dashed p-4 transform -rotate-1"
                style={{ borderColor: scheme.accent }}
              >
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  John Smith
                </h3>
                <p className="text-sm text-gray-600">Family picnic memories! 🎉</p>
              </div>
              
              <div 
                className="border-4 border-dashed p-4 transform rotate-1"
                style={{ borderColor: scheme.accent }}
              >
                <h3 className="font-bold mb-2" style={{ color: scheme.primary }}>
                  Jane Smith
                </h3>
                <p className="text-sm text-gray-600">My painting journey begins! 🎨</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Sent with ❤️ from {title || 'Family Newsletter'}</p>
        </div>
      </div>
    </div>
  )
}