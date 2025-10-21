'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function UserDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [newsletters, setNewsletters] = useState<any[]>([])
  const [questionnaires, setQuestionnaires] = useState<any[]>([])
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showInviteRecipient, setShowInviteRecipient] = useState(false)
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [userRes, newslettersRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/newsletters')
      ])

      if (!userRes.ok) {
        router.push('/login')
        return
      }

      const userData = await userRes.json()
      const newslettersData = await newslettersRes.json()

      setUser(userData.user)
      setNewsletters(newslettersData.newsletters || [])

      // Fetch questionnaires for the first newsletter
      if (newslettersData.newsletters && newslettersData.newsletters.length > 0) {
        const firstNewsletter = newslettersData.newsletters[0]
        const questionnairesRes = await fetch(`/api/questionnaires?newsletterId=${firstNewsletter.id}`)
        const questionnairesData = await questionnairesRes.json()
        setQuestionnaires(questionnairesData.questionnaires || [])

        // Fetch user's responses
        if (userData.user.role === 'USER1') {
          const responsesRes = await fetch('/api/responses')
          const responsesData = await responsesRes.json()
          setResponses(responsesData.responses || [])
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const handleSubmitResponse = (questionnaire: any) => {
    setSelectedQuestionnaire(questionnaire)
    setShowResponseForm(true)
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

  const isContributor = user?.role === 'USER1'
  const isRecipient = user?.role === 'USER2'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isContributor ? 'Contributor Dashboard' : 'Recipient Dashboard'}
              </h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isContributor && (
          <>
            {/* Contributor Actions */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <button
                onClick={() => setShowInviteRecipient(true)}
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
              >
                <span className="text-2xl mr-3">📧</span>
                Invite Recipients
              </button>
            </div>

            {/* Questionnaires to Answer */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Questionnaires</h2>
              {questionnaires.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No questionnaires available yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questionnaires.map((questionnaire) => {
                    const hasResponded = responses.some(r => r.questionnaireId === questionnaire.id)
                    return (
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
                          <button
                            onClick={() => handleSubmitResponse(questionnaire)}
                            className={`px-4 py-2 rounded-lg transition ${
                              hasResponded
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {hasResponded ? 'Update Response' : 'Submit Response'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* My Responses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">My Responses</h2>
              {responses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No responses yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.map((response) => (
                    <div
                      key={response.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {response.questionnaire?.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submitted on {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                      {response.media && response.media.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {response.media.length} media file(s) attached
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {isRecipient && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Newsletters</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                You're all set!
              </h3>
              <p className="text-gray-600 mb-4">
                You'll receive family newsletters via email based on the schedule set by the admin.
              </p>
              <p className="text-sm text-gray-500">
                Check your email inbox for the latest family updates!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Invite Recipient Modal */}
      {showInviteRecipient && (
        <InviteRecipientModal
          onClose={() => setShowInviteRecipient(false)}
          onSuccess={() => {
            setShowInviteRecipient(false)
            fetchData()
          }}
        />
      )}

      {/* Response Form Modal */}
      {showResponseForm && selectedQuestionnaire && (
        <ResponseFormModal
          questionnaire={selectedQuestionnaire}
          onClose={() => {
            setShowResponseForm(false)
            setSelectedQuestionnaire(null)
          }}
          onSuccess={() => {
            setShowResponseForm(false)
            setSelectedQuestionnaire(null)
            fetchData()
          }}
        />
      )}
    </div>
  )
}

function InviteRecipientModal({ onClose, onSuccess }: any) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/invitations/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: 'USER2'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation')
      }

      setSuccess(true)
      setEmail('')
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invite Recipient</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            Invitation sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="recipient@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              They will receive newsletters via email
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
              disabled={loading || success}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : success ? 'Sent!' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ResponseFormModal({ questionnaire, onClose, onSuccess }: any) {
  const [answers, setAnswers] = useState<any>({})
  const [specialAnswer, setSpecialAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionnaireId: questionnaire.id,
          answers,
          specialAnswer: specialAnswer || undefined
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit response')
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const questions = Array.isArray(questionnaire.questions) ? questionnaire.questions : []

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{questionnaire.title}</h2>
        {questionnaire.description && (
          <p className="text-gray-600 mb-6">{questionnaire.description}</p>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question: any, index: number) => (
            <div key={question.id || index}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {index + 1}. {question.text}
              </label>
              <textarea
                required
                value={answers[question.text] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.text]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Your answer..."
              />
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              💡 Tip: You can upload photos and videos after submitting your response
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
              {loading ? 'Submitting...' : 'Submit Response'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}