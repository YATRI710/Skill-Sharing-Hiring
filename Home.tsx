import {
  BookOpen,
  Users,
  Star,
  Shield,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import { useState } from 'react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: 'Skill Sharing & Learning',
      description: 'Access a vast library of skills taught by passionate experts. Learn at your own pace.',
    },
    {
      icon: Users,
      title: 'Hire Experts Instantly',
      description: 'Find and hire skilled professionals for your projects. Connect with the right talent.',
    },
    {
      icon: Star,
      title: 'Peer Reviews & Ratings',
      description: 'Build trust through transparent reviews and ratings from the community.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing for all your transactions.',
    },
    {
      icon: Search,
      title: 'Smart Skill Search',
      description: 'Advanced search and filtering to find exactly what you need, when you need it.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a vibrant community of learners and experts supporting each other.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'UX Designer',
      content: 'SkillBridge transformed my career. I learned web design from amazing experts and now I freelance full-time!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      content: 'The quality of experts on this platform is outstanding. I found the perfect collaborator for my startup project.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Consultant',
      content: 'I love sharing my skills and earning while helping others grow. The community here is incredibly supportive.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'How do I get started on SkillBridge?',
      answer: 'Simply sign up for a free account, complete your profile, and start exploring skills or sharing your own expertise.',
    },
    {
      question: 'Is SkillBridge free to use?',
      answer: 'Creating an account and browsing skills is completely free. Payments are only required when hiring experts or accessing premium learning content.',
    },
    {
      question: 'How are payments processed?',
      answer: 'We use secure payment gateways to ensure all transactions are safe. Payments are held in escrow until project completion.',
    },
    {
      question: 'Can I be both a learner and an expert?',
      answer: 'Absolutely! You can switch between roles anytime. Share skills you excel at while learning new ones from others.',
    },
    {
      question: 'What if I\'m not satisfied with a service?',
      answer: 'We have a review and dispute resolution system. Contact our support team, and we\'ll work to resolve any issues.',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            SkillBridge – Online Skill Sharing & Hiring Platform
          </h1>
          <p className="text-2xl text-gray-700 mb-8">Learn. Share. Grow Together.</p>
          <button
            onClick={() => onNavigate('explore')}
            className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">About SkillBridge</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            A platform where people share their skills, learn from others, and hire skilled individuals for projects or personal growth.
            Join our community and unlock your potential.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Share Skill</h3>
              <p className="text-gray-600">List your expertise and set your availability</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Learn or Hire</h3>
              <p className="text-gray-600">Connect with experts or eager learners</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Grow Together</h3>
              <p className="text-gray-600">Build relationships and expand your network</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-500 to-teal-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Join SkillBridge Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => onNavigate('explore')}
              className="bg-white text-teal-600 px-8 py-6 rounded-xl text-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              For Learners
            </button>
            <button
              onClick={() => onNavigate('share')}
              className="bg-orange-500 text-white px-8 py-6 rounded-xl text-xl font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              For Experts
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
          <div className="relative bg-gray-50 p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[currentTestimonial].content}"
              </p>
              <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
              <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-teal-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-teal-600" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Skills?</h2>
          <p className="text-xl text-white mb-8">
            Join thousands of learners and experts already growing on SkillBridge
          </p>
          <button
            onClick={() => onNavigate('explore')}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg inline-flex items-center"
          >
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
