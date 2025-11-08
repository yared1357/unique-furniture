import React from 'react';
import { Sofa, Palette, Package, Truck } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Palette,
      title: 'Custom Furniture Design',
      description: 'Tailored designs that reflect your style, space, and lifestyle needs.',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Package,
      title: 'Precision Craftsmanship',
      description: 'Expert assembly and finishing using premium materials for timeless quality.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Sofa,
      title: 'Space Planning & Layout',
      description: 'Optimized furniture arrangements for comfort, flow, and functionality.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Truck,
      title: 'Delivery & White-Glove Setup',
      description: 'Careful transport and professional installation in your home.',
      color: 'from-rose-500 to-rose-600'
    }
  ];

  return (
    <section id="services" className="py-24 bg-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Services
          </h2>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
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