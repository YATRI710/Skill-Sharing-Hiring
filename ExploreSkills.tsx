import { Search, Filter, Star, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface ExploreSkillsProps {
  onNavigate: (page: string) => void;
}

export default function ExploreSkills({ onNavigate }: ExploreSkillsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    'All Categories',
    'Web Development',
    'Design',
    'Marketing',
    'Writing',
    'Business',
    'Music',
    'Photography',
    'Languages',
  ];

  const skills = [
    {
      id: 1,
      title: 'React & TypeScript Development',
      expert: 'John Smith',
      category: 'Web Development',
      level: 'Expert',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      location: 'New York, USA',
      avatar: 'JS',
      available: true,
    },
    {
      id: 2,
      title: 'UI/UX Design & Figma',
      expert: 'Sarah Johnson',
      category: 'Design',
      level: 'Expert',
      rating: 5.0,
      reviews: 98,
      hourlyRate: 75,
      location: 'London, UK',
      avatar: 'SJ',
      available: true,
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      expert: 'Michael Chen',
      category: 'Marketing',
      level: 'Expert',
      rating: 4.8,
      reviews: 156,
      hourlyRate: 90,
      location: 'Singapore',
      avatar: 'MC',
      available: true,
    },
    {
      id: 4,
      title: 'Content Writing & SEO',
      expert: 'Emily Rodriguez',
      category: 'Writing',
      level: 'Intermediate',
      rating: 4.7,
      reviews: 82,
      hourlyRate: 50,
      location: 'Barcelona, Spain',
      avatar: 'ER',
      available: true,
    },
    {
      id: 5,
      title: 'Photography & Editing',
      expert: 'David Kim',
      category: 'Photography',
      level: 'Expert',
      rating: 4.9,
      reviews: 203,
      hourlyRate: 65,
      location: 'Seoul, Korea',
      avatar: 'DK',
      available: false,
    },
    {
      id: 6,
      title: 'Business Strategy Consulting',
      expert: 'Lisa Anderson',
      category: 'Business',
      level: 'Expert',
      rating: 5.0,
      reviews: 145,
      hourlyRate: 120,
      location: 'Toronto, Canada',
      avatar: 'LA',
      available: true,
    },
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.expert.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            Explore Skills
          </h1>
          <p className="text-xl text-gray-700 text-center mb-8">
            Discover talented experts and learn new skills
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills or experts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Filters:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{skill.avatar}</span>
                    </div>
                    {skill.available && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        Available
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 mb-4">{skill.expert}</p>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900">{skill.rating}</span>
                    </div>
                    <span className="text-gray-600 text-sm">({skill.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {skill.location}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center text-lg font-semibold text-gray-900">
                      <DollarSign className="h-5 w-5" />
                      {skill.hourlyRate}/hr
                    </div>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full">
                      {skill.level}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-4">
                  <button
                    onClick={() => onNavigate('hire')}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No skills found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="mt-4 text-teal-600 font-semibold hover:text-teal-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
