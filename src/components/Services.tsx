import React from 'react';
import { Brush, Hammer, Lightbulb, Volume2 } from 'lucide-react';

const Services: React.FC = () => {

  const services = [
    {
      icon: Brush,
      title: 'Custom Ceiling Design',
      description: 'Bespoke ceiling designs tailored to your unique vision and space requirements.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Hammer,
      title: 'Installation & Renovation',
      description: 'Professional installation and renovation services with attention to every detail.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Lighting Integration',
      description: 'Seamless integration of modern lighting systems into your ceiling design.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Volume2,
      title: 'Acoustic Solutions',
      description: 'Sound-optimized ceiling designs for enhanced acoustic performance.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive ceiling design solutions for every space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;