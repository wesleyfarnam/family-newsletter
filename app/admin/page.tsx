'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NewsletterNameSuggestions from '@/components/NewsletterNameSuggestions'
import ColorSchemeSelector from '@/components/ColorSchemeSelector'
import LayoutTemplateSelector from '@/components/LayoutTemplateSelector'
import NewsletterPreview from '@/components/NewsletterPreview'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [newsletters, setNewsletters] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateNewsletter, setShowCreateNewsletter] = useState(false)
  const [showInviteUser, setShowInviteUser] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [userRes, newslettersRes, usersRes] = await Promise.all([
        fetch('/api/auth/me'),
        fetch('/api/newsletters'),
        fetch('/api/users')
      ])

      if (!userRes.ok) {
        router.push('/login')
        return
      }

      const userData = await userRes.json()
      const newslettersData = await newslettersRes.json()
      const usersData = await usersRes.json()

      if (userData.user.role !== 'ADMIN') {
        router.push('/dashboard')
        return
      }

      setUser(userData.user)
      setNewsletters(newslettersData.newsletters || [])
      setUsers(usersData.users || [])
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <span className="text-2xl">📰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Newsletters</p>
                <p className="text-2xl font-bold text-gray-900">{newsletters.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <span className="text-2xl">✍️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contributors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'USER1').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <span className="text-2xl">📬</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recipients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.role === 'USER2').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowCreateNewsletter(true)}
              className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <span className="text-2xl mr-3">➕</span>
              Create New Newsletter
            </button>
            <button
              onClick={() => setShowInviteUser(true)}
              className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <span className="text-2xl mr-3">📧</span>
              Invite Users
            </button>
          </div>
        </div>

        {/* Newsletters List */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Newsletters</h2>
          {newsletters.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No newsletters yet</p>
              <button
                onClick={() => setShowCreateNewsletter(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first newsletter
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {newsletters.map((newsletter) => (
                <Link
                  key={newsletter.id}
                  href={`/admin/newsletters/${newsletter.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{newsletter.title}</h3>
                      <p className="text-sm text-gray-600">
                        Frequency: {newsletter.frequency} • Status: {newsletter.status}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {newsletter.questionnaires?.length || 0} questionnaires • 
                        {newsletter.editions?.length || 0} editions
                      </p>
                    </div>
                    <span className="text-blue-600">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Users Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">User Management</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contributors ({users.filter(u => u.role === 'USER1').length})</h3>
              {users.filter(u => u.role === 'USER1').length === 0 ? (
                <p className="text-sm text-gray-600">No contributors yet</p>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.role === 'USER1').map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Recipients ({users.filter(u => u.role === 'USER2').length})</h3>
              {users.filter(u => u.role === 'USER2').length === 0 ? (
                <p className="text-sm text-gray-600">No recipients yet</p>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.role === 'USER2').map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Newsletter Modal */}
      {showCreateNewsletter && (
        <CreateNewsletterModal
          onClose={() => setShowCreateNewsletter(false)}
          onSuccess={() => {
            setShowCreateNewsletter(false)
            fetchData()
          }}
        />
      )}

      {/* Invite User Modal */}
      {showInviteUser && (
        <InviteUserModal
          onClose={() => setShowInviteUser(false)}
          onSuccess={() => {
            setShowInviteUser(false)
            fetchData()
          }}
        />
      )}
    </div>
  )
}

function CreateNewsletterModal({ onClose, onSuccess }: any) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    frequency: 'WEEKLY',
    emailTemplate: 'classic',
    colorScheme: 'ocean-blue'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create newsletter')
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
      <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Newsletter</h2>
            <p className="text-sm text-gray-600">Step {step} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Name & Frequency */}
          {step === 1 && (
            <div className="space-y-6">
              <NewsletterNameSuggestions
                onSelect={(name) => setFormData({ ...formData, title: name })}
                selectedName={formData.title}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter custom name or select from suggestions above"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'WEEKLY', label: 'Weekly', icon: '📆' },
                    { value: 'BIWEEKLY', label: 'Bi-weekly', icon: '🗓️' },
                    { value: 'MONTHLY', label: 'Monthly', icon: '📋' },
                    { value: 'QUARTERLY', label: 'Quarterly', icon: '📊' }
                  ].map((freq) => (
                    <button
                      key={freq.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, frequency: freq.value })}
                      className={`p-4 rounded-lg border-2 transition text-center ${
                        formData.frequency === freq.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{freq.icon}</div>
                      <div className="text-sm font-medium">{freq.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Layout Template */}
          {step === 2 && (
            <div>
              <LayoutTemplateSelector
                selectedLayout={formData.emailTemplate}
                onSelect={(layoutId) => setFormData({ ...formData, emailTemplate: layoutId })}
              />
            </div>
          )}

          {/* Step 3: Color Scheme */}
          {step === 3 && (
            <div>
              <ColorSchemeSelector
                selectedScheme={formData.colorScheme}
                onSelect={(schemeId) => setFormData({ ...formData, colorScheme: schemeId })}
              />
            </div>
          )}

          {/* Step 4: Preview */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Preview Your Newsletter
                </h3>
                <p className="text-sm text-gray-600">
                  Here's how your newsletter will look with your chosen settings
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Settings Summary */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Newsletter Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title:</span>
                        <span className="font-medium">{formData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">{formData.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Layout:</span>
                        <span className="font-medium capitalize">{formData.emailTemplate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color Scheme:</span>
                        <span className="font-medium capitalize">
                          {formData.colorScheme.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">Ready to create?</p>
                        <p className="text-blue-700">
                          You can always change these settings later from the newsletter management page.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div>
                  <NewsletterPreview
                    title={formData.title}
                    colorScheme={formData.colorScheme}
                    layout={formData.emailTemplate}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <div className="flex-1"></div>
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.title}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !formData.title}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : '✓ Create Newsletter'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

function InviteUserModal({ onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({
    email: '',
    role: 'USER1'
  })
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
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation')
      }

      setSuccess(true)
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invite User</h2>
        
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USER1">Contributor (can submit content)</option>
              <option value="USER2">Recipient (receives newsletters)</option>
            </select>
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