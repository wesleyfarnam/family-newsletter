'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stats {
  totalUsers: number;
  totalNewsletters: number;
  totalEditions: number;
  totalResponses: number;
  activeNewsletters: number;
  recentUsers: number;
  roleDistribution: Array<{ role: string; _count: number }>;
}

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  adminNewsletters: Array<{ id: string; title: string; status: string }>;
  memberNewsletters: Array<{ newsletter: { id: string; title: string } }>;
  _count: {
    responses: number;
    uploadedMedia: number;
  };
}

interface Newsletter {
  id: string;
  title: string;
  status: string;
  frequency: string;
  admin: {
    id: string;
    email: string;
    name: string | null;
  };
  _count: {
    editions: number;
    questionnaires: number;
    members: number;
  };
  createdAt: string;
}

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'newsletters'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, newslettersRes] = await Promise.all([
        fetch('/api/super-admin/stats'),
        fetch('/api/super-admin/users'),
        fetch('/api/super-admin/newsletters'),
      ]);

      if (!statsRes.ok || !usersRes.ok || !newslettersRes.ok) {
        if (statsRes.status === 403 || usersRes.status === 403 || newslettersRes.status === 403) {
          router.push('/login');
          return;
        }
        throw new Error('Failed to fetch data');
      }

      const [statsData, usersData, newslettersData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        newslettersRes.json(),
      ]);

      setStats(statsData);
      setUsers(usersData);
      setNewsletters(newslettersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImpersonate = async (userId: string) => {
    if (!confirm('Are you sure you want to login as this user?')) return;

    try {
      const response = await fetch(`/api/super-admin/users/${userId}/impersonate`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect based on user role
        if (data.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        alert('Failed to impersonate user');
      }
    } catch (error) {
      console.error('Impersonate error:', error);
      alert('Failed to impersonate user');
    }
  };

  const handleResetPassword = async () => {
    if (!selectedUser || !newPassword) return;

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch(`/api/super-admin/users/${selectedUser.id}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        alert('Password reset successfully');
        setShowUserModal(false);
        setNewPassword('');
        setSelectedUser(null);
      } else {
        alert('Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      alert('Failed to reset password');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!confirm(`Change user role to ${newRole}?`)) return;

    try {
      const response = await fetch(`/api/super-admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        alert('Role updated successfully');
        fetchData();
      } else {
        alert('Failed to update role');
      }
    } catch (error) {
      console.error('Update role error:', error);
      alert('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      const response = await fetch(`/api/super-admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('User deleted successfully');
        fetchData();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Failed to delete user');
    }
  };

  const handleToggleNewsletterStatus = async (newsletterId: string) => {
    try {
      const response = await fetch(`/api/super-admin/newsletters/${newsletterId}/toggle-status`, {
        method: 'POST',
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to toggle newsletter status');
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      alert('Failed to toggle newsletter status');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Super Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">👑 Super Admin Dashboard</h1>
              <p className="text-purple-100 mt-1">System-wide management and control</p>
            </div>
            <button
              onClick={() => router.push('/api/auth/logout')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'users'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              👥 Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('newsletters')}
              className={`py-4 px-2 border-b-2 font-medium transition ${
                activeTab === 'newsletters'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📰 Newsletters ({newsletters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    <p className="text-green-600 text-sm mt-1">+{stats.recentUsers} this month</p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Newsletters</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalNewsletters}</p>
                    <p className="text-blue-600 text-sm mt-1">{stats.activeNewsletters} active</p>
                  </div>
                  <div className="text-4xl">📰</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Editions Sent</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalEditions}</p>
                  </div>
                  <div className="text-4xl">📬</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Responses</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalResponses}</p>
                  </div>
                  <div className="text-4xl">✍️</div>
                </div>
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">User Role Distribution</h2>
              <div className="space-y-3">
                {stats.roleDistribution.map((item) => (
                  <div key={item.role} className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">{item.role}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-48 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${(item._count / stats.totalUsers) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-600 font-medium w-12 text-right">
                        {item._count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name || 'No name'}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                          disabled={user.role === 'SUPER_ADMIN'}
                          className="text-sm border border-gray-300 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER1">USER1</option>
                          <option value="USER2">USER2</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{user._count.responses} responses</div>
                        <div>{user._count.uploadedMedia} media</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleImpersonate(user.id)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Login as user"
                        >
                          🔐
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Reset password"
                        >
                          🔑
                        </button>
                        {user.role !== 'SUPER_ADMIN' && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete user"
                          >
                            🗑️
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'newsletters' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Newsletters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNewsletters.map((newsletter) => (
                <div key={newsletter.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{newsletter.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        newsletter.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : newsletter.status === 'PAUSED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {newsletter.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <strong>Admin:</strong> {newsletter.admin.name || newsletter.admin.email}
                    </div>
                    <div>
                      <strong>Frequency:</strong> {newsletter.frequency}
                    </div>
                    <div>
                      <strong>Members:</strong> {newsletter._count.members}
                    </div>
                    <div>
                      <strong>Editions:</strong> {newsletter._count.editions}
                    </div>
                    <div>
                      <strong>Created:</strong> {new Date(newsletter.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleNewsletterStatus(newsletter.id)}
                    className={`w-full py-2 rounded-lg font-medium transition ${
                      newsletter.status === 'ACTIVE'
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {newsletter.status === 'ACTIVE' ? 'Pause Newsletter' : 'Activate Newsletter'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reset Password Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Reset Password for {selectedUser.email}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleResetPassword}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    setNewPassword('');
                    setSelectedUser(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}