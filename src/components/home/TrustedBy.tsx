import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const companies = [
  { name: 'FANUC Robotics', logo: '/robohub_images/trustedbylogo/fanuc-logo-png_seeklogo-556912.png' },
  { name: 'Standard Bots', logo: '/robohub_images/trustedbylogo/Standard-bots-logo.png' },
  { name: 'Comau', logo: '/robohub_images/trustedbylogo/image 3.png' },
  { name: 'Rapyuta Robotics', logo: '/robohub_images/trustedbylogo/Group 1.png' },
  { name: 'Miko', logo: '/robohub_images/trustedbylogo/image 4.png' },
  { name: 'ABB', logo: '/robohub_images/trustedbylogo/images.png' },
  { name: 'KUKA', logo: '/robohub_images/trustedbylogo/image 2.png' },
  { name: 'Kawasaki Robotics', logo: '/robohub_images/trustedbylogo/image-removebg-preview (1) 1.png' },
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Leading Robotics Companies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform for their robotics needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-center p-4 h-24"
            >
              <div className="relative h-full w-full">
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain object-center opacity-70 hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
