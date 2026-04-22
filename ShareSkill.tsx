import { Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ShareSkill() {
  const [formData, setFormData] = useState({
    skillTitle: '',
    category: '',
    level: '',
    description: '',
    hourlyRate: '',
    availability: '',
    portfolio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Skill submitted successfully! Your profile will be reviewed and published soon.');
    setFormData({
      skillTitle: '',
      category: '',
      level: '',
      description: '',
      hourlyRate: '',
      availability: '',
      portfolio: '',
    });
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Earn While You Share',
      description: 'Set your own rates and get paid for sharing your expertise.',
    },
    {
      icon: Users,
      title: 'Build Your Network',
      description: 'Connect with learners and collaborators from around the world.',
    },
    {
      icon: Award,
      title: 'Showcase Your Expertise',
      description: 'Build your reputation through reviews and completed projects.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Share Your Skill
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Turn your expertise into opportunity. Help others learn while earning income.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">List Your Skill</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Skill Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.skillTitle}
                  onChange={(e) => setFormData({ ...formData, skillTitle: e.target.value })}
                  placeholder="e.g., React Development, UI/UX Design"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a category</option>
                    <option value="web-dev">Web Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="writing">Writing</option>
                    <option value="business">Business</option>
                    <option value="music">Music</option>
                    <option value="photography">Photography</option>
                    <option value="languages">Languages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Expertise Level *
                  </label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Skill Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your skill, teaching approach, and what learners will gain..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Hourly Rate (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="50"
                    min="10"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Availability *
                  </label>
                  <select
                    required
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="weekends">Weekends Only</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Portfolio / Website URL
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Submit Skill for Review
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Become an Expert?</h2>
            <div className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Expert Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Proven expertise in your skill area</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Clear communication and teaching ability</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Commitment to quality and professionalism</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Portfolio or examples of previous work</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Reliable availability and responsiveness</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 font-semibold text-sm">
                    1
                  </span>
                  <span>Write a detailed and engaging skill description</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 font-semibold text-sm">
                    2
                  </span>
                  <span>Set competitive rates based on your experience</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 font-semibold text-sm">
                    3
                  </span>
                  <span>Respond quickly to inquiries and be professional</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5 font-semibold text-sm">
                    4
                  </span>
                  <span>Build your reputation through quality work and reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
