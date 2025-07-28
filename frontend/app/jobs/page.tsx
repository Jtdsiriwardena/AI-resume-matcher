'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Users, 
  Calendar, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Loader, 
  Star,
  User,
  Mail,
  Phone,
  Target
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface Match {
  score: number;
  resume: {
    fullName: string;
    email: string;
    phone: string;
  };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<Record<string, Match[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    try {
      const res = await fetch(`${apiUrl}/jobs`);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Title and Description are required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Failed to create job');
      setTitle('');
      setDescription('');
      setShowCreateForm(false);
      await fetchJobs();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteJob(id: string) {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${apiUrl}/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete job');
      await fetchJobs();

      setMatches((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function fetchMatches(jobId: string) {
    setLoadingMatches(jobId);
    try {
      const res = await fetch(`${apiUrl}/jobs/${jobId}/matches`);
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches((prev) => ({ ...prev, [jobId]: data }));
      setExpandedJob(expandedJob === jobId ? null : jobId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingMatches(null);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Management</h1>
            <p className="text-gray-600">Create and manage job postings</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Job</span>
          </button>
        </div>

        {/* Create Job Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Create New Job Position
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  required
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={createJob}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Create Job</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No jobs found</p>
              <p className="text-gray-400 mb-4">Create your first job posting to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Job</span>
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>Created {new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => fetchMatches(job._id)}
                          disabled={loadingMatches === job._id}
                          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors flex items-center space-x-2"
                        >
                          {loadingMatches === job._id ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              <span>Loading...</span>
                            </>
                          ) : (
                            <>
                              <Users className="w-4 h-4" />
                              <span>Find Candidates</span>
                              {matches[job._id] && (
                                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                                  {matches[job._id].length}
                                </span>
                              )}
                            </>
                          )}
                        </button>
                        
                        {expandedJob === job._id ? (
                          <button
                            onClick={() => setExpandedJob(null)}
                            className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1"
                          >
                            <EyeOff className="w-4 h-4" />
                            <span>Hide Matches</span>
                          </button>
                        ) : (
                          matches[job._id] && (
                            <button
                              onClick={() => setExpandedJob(job._id)}
                              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center space-x-1"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Show Matches</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Matched Candidates */}
                {expandedJob === job._id && matches[job._id] && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Matched Candidates ({matches[job._id].length})
                    </h4>
                    
                    {matches[job._id].length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No matched candidates found</p>
                        <p className="text-gray-400 text-sm">Try uploading more resumes or adjust job requirements</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {matches[job._id].map((match, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-slate-900" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{match.resume.fullName}</h5>
                                  <p className="text-sm text-gray-500">{getScoreLabel(match.score)}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(match.score)}`}>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span>{(match.score * 100).toFixed(0)}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{match.resume.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{match.resume.phone}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}