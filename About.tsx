import { Target, Heart, TrendingUp, Shield, Users, Award } from 'lucide-react';

export default function About() {
  const benefits = [
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with skilled professionals and eager learners from around the world.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Accelerate your professional development by learning from industry experts.',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Trust and transparency through verified profiles and secure transactions.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Peer-reviewed experts ensure high-quality learning and collaboration.',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            About SkillBridge
          </h1>
          <p className="text-2xl text-gray-700 text-center max-w-3xl mx-auto">
            Building bridges between knowledge seekers and knowledge sharers
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At SkillBridge, we believe that everyone has valuable skills to share and endless potential to learn.
                Our mission is to democratize education and professional collaboration by creating a seamless platform
                where expertise meets opportunity.
              </p>
              <p className="text-lg text-gray-700">
                We're breaking down barriers to learning and making it easier than ever to find the right expert
                for your project or to share your knowledge with those who need it most.
              </p>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-orange-100 rounded-2xl p-12 shadow-lg">
              <div className="text-center">
                <Heart className="h-20 w-20 text-teal-600 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Built on Community</h3>
                <p className="text-lg text-gray-700">
                  Every connection made, every skill shared, and every project completed strengthens our
                  vibrant learning ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose SkillBridge?</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            We're more than just a platform – we're a community dedicated to growth, learning, and collaboration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about empowering individuals to reach their full potential through skill sharing and collaboration.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">
                Building a trustworthy community through transparency, secure transactions, and verified expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-gray-600">
                Committed to continuous improvement for both our platform and the growth of every community member.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-white mb-8">
            Be part of a movement that's transforming how people learn, share, and collaborate globally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-5xl font-bold text-white mb-2">10K+</p>
              <p className="text-white text-lg">Active Users</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-5xl font-bold text-white mb-2">500+</p>
              <p className="text-white text-lg">Skill Categories</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <p className="text-5xl font-bold text-white mb-2">25K+</p>
              <p className="text-white text-lg">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
