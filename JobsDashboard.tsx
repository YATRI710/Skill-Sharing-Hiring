import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Briefcase,
  DollarSign,
  Clock,
  MessageSquare,
  Star,
  TrendingUp,
  Award,
  Heart,
  Send,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Job } from '../lib/supabase';

export default function JobsDashboard() {
  const { user, profile, preferences, signOut } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    proposedRate: '',
    estimatedDuration: '',
  });

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferences]);

  const loadJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const scored = scoreAndSortJobs(data);
        setJobs(scored);
        setFilteredJobs(scored);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const scoreAndSortJobs = (jobsList: Job[]) => {
    if (!preferences) return jobsList;

    return jobsList.map((job) => {
      let score = 0;

      if (preferences.categories.includes(job.category)) {
        score += 10;
      }

      const matchingSkills = job.skills_required.filter((skill) =>
        preferences.skills.some((userSkill) =>
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      score += matchingSkills.length * 5;

      if (job.experience_level === preferences.experience_level) {
        score += 5;
      }

      if (preferences.hourly_rate_min && job.budget_min && job.budget_min >= preferences.hourly_rate_min) {
        score += 3;
      }

      return { ...job, matchScore: score };
    }).sort((a: Job & { matchScore?: number }, b: Job & { matchScore?: number }) => (b.matchScore || 0) - (a.matchScore || 0));
  };

  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.client_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedCategory, jobs]);

  const handleSubmitProposal = async () => {
    if (!selectedJob || !user) return;

    try {
      const { error } = await supabase.from('job_proposals').insert({
        job_id: selectedJob.id,
        freelancer_id: user.id,
        cover_letter: proposalData.coverLetter,
        proposed_rate: parseFloat(proposalData.proposedRate),
        estimated_duration: proposalData.estimatedDuration,
        status: 'pending',
      });

      if (error) throw error;

      alert('Proposal submitted successfully!');
      setProposalModalOpen(false);
      setProposalData({ coverLetter: '', proposedRate: '', estimatedDuration: '' });
    } catch (error: unknown) {
      alert((error as Error).message || 'Failed to submit proposal');
    }
  };

  const categories = Array.from(new Set(jobs.map((job) => job.category)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {profile?.full_name}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <Briefcase className="h-8 w-8 text-teal-600 mb-2" />
            <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
            <p className="text-sm text-gray-600">Available Jobs</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
            <p className="text-3xl font-bold text-gray-900">{filteredJobs.length}</p>
            <p className="text-sm text-gray-600">Matching Jobs</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Award className="h-8 w-8 text-teal-600 mb-2" />
            <p className="text-3xl font-bold text-gray-900">{preferences?.skills.length || 0}</p>
            <p className="text-sm text-gray-600">Your Skills</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <Heart className="h-8 w-8 text-orange-600 mb-2" />
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-600">Saved Jobs</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, description, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const matchScore = (job as Job & { matchScore?: number }).matchScore || 0;
            const isHighMatch = matchScore >= 15;
            const isMediumMatch = matchScore >= 10 && matchScore < 15;

            return (
              <div
                key={job.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden ${
                  isHighMatch ? 'border-2 border-teal-500' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {isHighMatch && (
                        <div className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-2">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          Best Match
                        </div>
                      )}
                      {isMediumMatch && !isHighMatch && (
                        <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-2">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Good Match
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-3">{job.client_name}</p>
                      <p className="text-gray-700 mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills_required.map((skill, idx) => {
                          const isUserSkill = preferences?.skills.some((userSkill) =>
                            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                            skill.toLowerCase().includes(userSkill.toLowerCase())
                          );
                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                isUserSkill
                                  ? 'bg-teal-100 text-teal-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {skill}
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>
                            {job.budget_type === 'fixed'
                              ? `$${job.budget_min?.toLocaleString()} - $${job.budget_max?.toLocaleString()}`
                              : `$${job.budget_min}/hr - $${job.budget_max}/hr`}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          <span className="capitalize">{job.experience_level}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{job.proposals_count} proposals</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setProposalModalOpen(true);
                      }}
                      className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Submit Proposal
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-teal-600 hover:text-teal-600 transition-colors">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to see more results
              </p>
            </div>
          )}
        </div>
      </div>

      {proposalModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Submit Proposal</h3>
              <button
                onClick={() => setProposalModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{selectedJob.title}</h4>
                <p className="text-gray-600">{selectedJob.client_name}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  value={proposalData.coverLetter}
                  onChange={(e) =>
                    setProposalData({ ...proposalData, coverLetter: e.target.value })
                  }
                  placeholder="Explain why you're the perfect fit for this job..."
                  rows={8}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Rate (${selectedJob.budget_type}) *
                  </label>
                  <input
                    type="number"
                    value={proposalData.proposedRate}
                    onChange={(e) =>
                      setProposalData({ ...proposalData, proposedRate: e.target.value })
                    }
                    placeholder={`$${selectedJob.budget_min}`}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={proposalData.estimatedDuration}
                    onChange={(e) =>
                      setProposalData({ ...proposalData, estimatedDuration: e.target.value })
                    }
                    placeholder="e.g., 2 weeks"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitProposal}
                  disabled={!proposalData.coverLetter || !proposalData.proposedRate}
                  className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Submit Proposal
                </button>
                <button
                  onClick={() => setProposalModalOpen(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors"
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
