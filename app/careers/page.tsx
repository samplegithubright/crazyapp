"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Zap, Heart, Coffee, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
const jobs = [
  { id: 1, title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
  { id: 2, title: 'Product Designer', department: 'Design', location: 'New York, NY', type: 'Full-time' },
  { id: 3, title: 'Marketing Manager', department: 'Marketing', location: 'London, UK', type: 'Contract' },
  { id: 4, title: 'Backend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
];

const values = [
  { icon: <Zap className="w-6 h-6 text-indigo-400" />, title: 'Move Fast', desc: 'We believe in rapid iteration and shipping fast.' },
  { icon: <Users className="w-6 h-6 text-pink-400" />, title: 'Collaborate', desc: 'The best work happens when we work together.' },
  { icon: <Heart className="w-6 h-6 text-rose-400" />, title: 'Care Deeply', desc: 'We care about our product, our users, and each other.' },
  { icon: <Coffee className="w-6 h-6 text-amber-400" />, title: 'Stay Curious', desc: 'We are always learning and exploring new ideas.' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-neutral-950 -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-400">
              Build the future with us
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              We're on a mission to create tools that empower creators and businesses. Join our diverse team of passionate builders.
            </p>
            <motion.a
              href="#open-roles"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors shadow-[0_0_40px_rgba(79,70,229,0.3)]"
            >
              View Open Roles <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Values Section */}
      <section className="py-24 bg-neutral-900/50 border-y border-white/5 relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-neutral-400">What drives us every single day.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="open-roles" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Open Positions</h2>
              <p className="text-neutral-400 text-lg">Find your next opportunity.</p>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20">All Departments</span>
            </div>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative"
              >
                <Link href={`/careers/${job.id}`} className="block p-6 md:p-8 rounded-3xl bg-neutral-900 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-neutral-800/50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold max-w-lg mb-3 group-hover:text-indigo-300 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-neutral-300 ml-2">{job.type}</span>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-6">Don't see a role that fits? Let's chat anyway.</p>
            <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white font-medium">Get in touch</button>
          </div>
        </div>
      </section>
    </div>
  );
}
