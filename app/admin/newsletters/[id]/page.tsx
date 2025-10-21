'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewsletterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [newsletter, setNewsletter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCreateQuestionnaire, setShowCreateQuestionnaire] = useState(false)
  const [showCreateEdition, setShowCreateEdition] = useState(false)

  useEffect(() => {
    fetchNewsletter()
  }, [resolvedParams.id])

  const fetchNewsletter = async () => {
    try {
      const response = await fetch(`/api/newsletters/${resolvedParams.id}`)
      const data = await response.json()
      setNewsletter(data.newsletter)
    } catch (error) {
      console.error('Error fetching newsletter:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendEdition = async (editionId: string) => {
    if (!confirm('Are you sure you want to send this edition to all recipients?')) {
      return
    }

    try {
      const response = await fetch(`/api/editions/${editionId}/send`, {
        method: 'POST'
      })

      if (response.ok) {
        alert('Newsletter sent successfully!')
        fetchNewsletter()
      } else {
        alert('Failed to send newsletter')
      }
    } catch (error) {
      console.error('Error sending edition:', error)
      alert('Failed to send newsletter')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Newsletter not found</p>
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{newsletter.title}</h1>
              <p className="text-sm text-gray-600">
                {newsletter.frequency} • {newsletter.status}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowCreateQuestionnaire(true)}
            className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <span className="text-2xl mr-3">📝</span>
            Create Questionnaire
          </button>
          <button
            onClick={() => setShowCreateEdition(true)}
            className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <span className="text-2xl mr-3">📰</span>
            Create New Edition
          </button>
          <Link
            href={`/admin/newsletters/${resolvedParams.id}/preview`}
            className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <span className="text-2xl mr-3">👁️</span>
            Preview Newsletter
          </Link>
        </div>

        {/* Questionnaires */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Questionnaires</h2>
          {!newsletter.questionnaires || newsletter.questionnaires.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No questionnaires yet</p>
              <button
                onClick={() => setShowCreateQuestionnaire(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first questionnaire
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {newsletter.questionnaires.map((questionnaire: any) => (
                <div
                  key={questionnaire.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{questionnaire.title}</h3>
                      {questionnaire.description && (
                        <p className="text-sm text-gray-600 mt-1">{questionnaire.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {Array.isArray(questionnaire.questions) ? questionnaire.questions.length : 0} questions
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      questionnaire.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {questionnaire.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Editions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Newsletter Editions</h2>
          {!newsletter.editions || newsletter.editions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No editions yet</p>
              <button
                onClick={() => setShowCreateEdition(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first edition
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {newsletter.editions.map((edition: any) => (
                <div
                  key={edition.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Edition #{edition.editionNumber}
                      </h3>
                      {edition.specialQuestion && (
                        <p className="text-sm text-gray-600 mt-1">
                          Special Question: {edition.specialQuestion}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {edition.responses?.length || 0} responses
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        edition.status === 'SENT' 
                          ? 'bg-green-100 text-green-800' 
                          : edition.status === 'READY'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {edition.status}
                      </span>
                      {edition.status !== 'SENT' && (
                        <button
                          onClick={() => handleSendEdition(edition.id)}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                        >
                          Send Now
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Responses Preview */}
                  {edition.responses && edition.responses.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Responses:</h4>
                      <div className="space-y-2">
                        {edition.responses.map((response: any) => (
                          <div key={response.id} className="text-sm">
                            <span className="font-medium text-gray-900">
                              {response.user.name || response.user.email}
                            </span>
                            <span className="text-gray-600"> submitted their response</span>
                            {response.media && response.media.length > 0 && (
                              <span className="text-gray-500"> with {response.media.length} media file(s)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Questionnaire Modal */}
      {showCreateQuestionnaire && (
        <CreateQuestionnaireModal
          newsletterId={resolvedParams.id}
          onClose={() => setShowCreateQuestionnaire(false)}
          onSuccess={() => {
            setShowCreateQuestionnaire(false)
            fetchNewsletter()
          }}
        />
      )}

      {/* Create Edition Modal */}
      {showCreateEdition && (
        <CreateEditionModal
          newsletterId={resolvedParams.id}
          onClose={() => setShowCreateEdition(false)}
          onSuccess={() => {
            setShowCreateEdition(false)
            fetchNewsletter()
          }}
        />
      )}
    </div>
  )
}

function CreateQuestionnaireModal({ newsletterId, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [{ id: '1', text: '', type: 'text' }]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)

  const sampleTemplates = [
    {
      title: 'Monthly Family Update',
      description: 'Share your highlights, updates, and news from the past month',
      questions: [
        { id: '1', text: 'Family Trips &amp; Adventures', type: 'text' },
        { id: '2', text: 'Job &amp; Career Updates', type: 'text' },
        { id: '3', text: 'Sports &amp; Activities', type: 'text' },
        { id: '4', text: 'General Good News &amp; Celebrations', type: 'text' },
        { id: '5', text: 'Overall Recap', type: 'text' }
      ]
    },
    {
      title: 'Quarterly Family Highlights',
      description: 'Share your biggest moments and updates from the past quarter',
      questions: [
        { id: '1', text: 'Top 3 Highlights This Quarter', type: 'text' },
        { id: '2', text: 'Travel &amp; Adventures', type: 'text' },
        { id: '3', text: 'Family Milestones', type: 'text' },
        { id: '4', text: 'Looking Ahead', type: 'text' }
      ]
    },
    {
      title: 'Weekly Family Check-in',
      description: 'Quick weekly update to stay connected',
      questions: [
        { id: '1', text: 'Highlight of the Week', type: 'text' },
        { id: '2', text: 'This Week\'s Activities', type: 'text' },
        { id: '3', text: 'Next Week\'s Plans', type: 'text' }
      ]
    }
  ]

  const loadTemplate = (template: any) => {
    setFormData({
      title: template.title,
      description: template.description,
      questions: template.questions
    })
    setShowTemplates(false)
  }

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        { id: String(formData.questions.length + 1), text: '', type: 'text' }
      ]
    })
  }

  const updateQuestion = (index: number, text: string) => {
    const newQuestions = [...formData.questions]
    newQuestions[index].text = text
    setFormData({ ...formData, questions: newQuestions })
  }

  const removeQuestion = (index: number) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index)
    setFormData({ ...formData, questions: newQuestions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/questionnaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsletterId,
          title: formData.title,
          description: formData.description,
          questions: formData.questions
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create questionnaire')
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Questionnaire</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Template Selector */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-blue-900">📋 Use a Template</h3>
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showTemplates ? 'Hide' : 'Show'} Templates
            </button>
          </div>
          
          {showTemplates && (
            <div className="mt-3 space-y-2">
              {sampleTemplates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => loadTemplate(template)}
                  className="w-full text-left p-3 bg-white border border-blue-200 rounded hover:border-blue-400 transition"
                >
                  <div className="font-medium text-gray-900">{template.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                  <div className="text-xs text-blue-600 mt-1">{template.questions.length} questions</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Monthly Family Update"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Share your monthly highlights..."
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Questions
              </label>
              <button
                type="button"
                onClick={addQuestion}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Add Question
              </button>
            </div>
            <div className="space-y-3">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={question.text}
                    onChange={(e) => updateQuestion(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Question ${index + 1}`}
                  />
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Questionnaire'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CreateEditionModal({ newsletterId, onClose, onSuccess }: any) {
  const [specialQuestion, setSpecialQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/editions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newsletterId,
          specialQuestion: specialQuestion || undefined
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create edition')
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Edition</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Question (optional)
            </label>
            <textarea
              value={specialQuestion}
              onChange={(e) => setSpecialQuestion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="What was your favorite moment this month?"
            />
            <p className="text-xs text-gray-500 mt-1">
              This question will be asked in addition to the regular questionnaire
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Edition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}