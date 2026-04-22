import { useState } from 'react';
import { Settings, Briefcase, DollarSign, Award, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserPreferencesProps {
  onComplete: () => void;
}

export default function UserPreferences({ onComplete }: UserPreferencesProps) {
  const { updatePreferences } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    role_type: 'freelancer' as 'freelancer' | 'client' | 'both',
    skills: [] as string[],
    categories: [] as string[],
    experience_level: 'intermediate' as 'beginner' | 'intermediate' | 'expert',
    hourly_rate_min: '',
    hourly_rate_max: '',
    availability: 'full-time',
    bio: '',
    portfolio_url: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const categoryOptions = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Marketing',
    'Writing',
    'Business',
    'Music',
    'Photography',
    'Languages',
    'Data Science',
  ];

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const toggleCategory = (category: string) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((c) => c !== category),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.skills.length === 0) {
      setError('Please add at least one skill');
      return;
    }

    if (formData.categories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setLoading(true);

    const preferences = {
      role_type: formData.role_type,
      skills: formData.skills,
      categories: formData.categories,
      experience_level: formData.experience_level,
      hourly_rate_min: formData.hourly_rate_min ? parseFloat(formData.hourly_rate_min) : undefined,
      hourly_rate_max: formData.hourly_rate_max ? parseFloat(formData.hourly_rate_max) : undefined,
      availability: formData.availability,
      bio: formData.bio || undefined,
      portfolio_url: formData.portfolio_url || undefined,
    };

    const { error } = await updatePreferences(preferences);

    if (error) {
      setError(error.message || 'Failed to save preferences');
      setLoading(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Tell Us About Yourself</h2>
            <p className="text-gray-600 mt-2">
              Help us personalize your experience and match you with the right opportunities
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                I want to:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'freelancer', label: 'Find Work', icon: Briefcase },
                  { value: 'client', label: 'Hire Talent', icon: Award },
                  { value: 'both', label: 'Both', icon: Settings },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role_type: option.value as 'freelancer' | 'client' | 'both' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.role_type === option.value
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    <option.icon className="h-6 w-6 mx-auto mb-2 text-teal-600" />
                    <span className="font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Skills *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g., React, Python, Design"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-teal-900 hover:text-teal-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Interested Categories *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                      formData.categories.includes(category)
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-gray-300 text-gray-700 hover:border-teal-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'expert', label: 'Expert' },
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, experience_level: level.value as 'beginner' | 'intermediate' | 'expert' })}
                    className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                      formData.experience_level === level.value
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : 'border-gray-300 hover:border-teal-300'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="inline h-4 w-4" /> Min Hourly Rate (USD)
                </label>
                <input
                  type="number"
                  value={formData.hourly_rate_min}
                  onChange={(e) => setFormData({ ...formData, hourly_rate_min: e.target.value })}
                  placeholder="25"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="inline h-4 w-4" /> Max Hourly Rate (USD)
                </label>
                <input
                  type="number"
                  value={formData.hourly_rate_max}
                  onChange={(e) => setFormData({ ...formData, hourly_rate_max: e.target.value })}
                  placeholder="100"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about your experience and what you're looking for..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Portfolio URL
              </label>
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
            >
              {loading ? (
                <span>Saving...</span>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Complete Setup & Find Jobs
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
