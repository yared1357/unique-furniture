import React from 'react';
import { Award, Users, Star, CheckCircle } from 'lucide-react';

const About: React.FC = () => {

  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '500+', label: 'Projects Completed', icon: CheckCircle },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '4.9', label: 'Average Rating', icon: Star }
  ];

  return (
    <section id="about" className="py-24 bg-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              About Unique Furniture
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
             With over 15 years of experience in the furniture industry, Unique Furniture has become the trusted choice for transforming spaces in both residential and commercial settings.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
             Our team of skilled artisans combines timeless craftsmanship with contemporary design to create exceptional furniture pieces that enhance your home.
            </p>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
             We pride ourselves on our commitment to quality, style, and customer satisfaction, ensuring that every item we offer reflects your unique taste and lifestyle.
            </p>


            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-800 mb-1">{stat.number}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                alt="Luxury ceiling design"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Award className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;