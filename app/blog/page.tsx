"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Rss } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
const categories = ["All", "Engineering", "Design", "Company", "Product"];

const posts = [
  {
    id: 1,
    title: 'Introducing our new AI-powered design system',
    excerpt: 'Learn how we are leveraging generative AI to streamline component creation and empower developers to build faster.',
    category: 'Product',
    date: 'Apr 12, 2026',
    readTime: '5 min read',
    author: 'Sarah Jenkins',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'The future of remote work culture',
    excerpt: 'As a fully distributed team, we share our top strategies for maintaining connection, productivity, and wellbeing.',
    category: 'Company',
    date: 'Apr 05, 2026',
    readTime: '8 min read',
    author: 'Michael Chen',
    gradient: 'from-emerald-400 to-teal-600'
  },
  {
    id: 3,
    title: 'Behind the scenes: Migrating to Next.js 16',
    excerpt: 'A deep dive into our technical journey, challenges faced, and performance improvements gained after upgrading.',
    category: 'Engineering',
    date: 'Mar 28, 2026',
    readTime: '12 min read',
    author: 'Alex Rivera',
    gradient: 'from-orange-400 to-rose-500'
  },
  {
    id: 4,
    title: 'Why aesthetics matter in B2B software',
    excerpt: 'Consumer expectations have changed. We explore why enterprise tools can no longer get away with boring UI.',
    category: 'Design',
    date: 'Mar 15, 2026',
    readTime: '6 min read',
    author: 'Emma Wilson',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 5,
    title: 'Optimizing database queries for scale',
    excerpt: 'Practical examples of how we reduced our p99 latencies by redefining our database indexing strategies.',
    category: 'Engineering',
    date: 'Mar 02, 2026',
    readTime: '10 min read',
    author: 'David Kim',
    gradient: 'from-cyan-400 to-blue-600'
  },
  {
    id: 6,
    title: 'Our Q1 2026 Town Hall Recap',
    excerpt: 'Reflecting on a record-breaking quarter and our vision for the rest of the year ahead.',
    category: 'Company',
    date: 'Feb 20, 2026',
    readTime: '4 min read',
    author: 'Sarah Jenkins',
    gradient: 'from-yellow-400 to-orange-500'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-indigo-500/10 to-transparent blur-[100px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Insights, news, and engineering.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed">
              Dive into our latest thoughts on product design, software engineering, and building a modern internet company.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button 
                  key={cat}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    idx === 0 
                      ? 'bg-white text-neutral-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href={`/blog/${posts[0].id}`} className="group block relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 transition-colors hover:border-indigo-500/50">
              <div className="flex flex-col lg:flex-row min-h-[400px]">
                <div className={`lg:w-1/2 relative bg-gradient-to-br ${posts[0].gradient} p-8 flex items-end justify-start min-h-[250px]`}>
                   <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                   <div className="relative z-10 w-full h-full flex items-center justify-center">
                     <span className="text-white/40 font-bold text-4xl lg:text-7xl tracking-tighter mix-blend-overlay rotate-[-5deg]">FEATURED</span>
                   </div>
                </div>
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-indigo-400 font-medium mb-4">
                    <span>{posts[0].category}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span className="text-neutral-400">{posts[0].readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-indigo-300 transition-colors">{posts[0].title}</h2>
                  <p className="text-neutral-400 text-lg mb-8 line-clamp-3">{posts[0].excerpt}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold border border-white/10">
                        {posts[0].author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{posts[0].author}</span>
                        <span className="text-xs text-neutral-500">{posts[0].date}</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="group flex flex-col h-full bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className={`h-48 relative bg-gradient-to-br ${post.gradient}`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-medium mb-4">
                      <span className="text-indigo-400 capitalize bg-indigo-500/10 px-2 py-1 rounded-md">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-neutral-400 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-neutral-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      </div>
                      <span className="text-xs text-neutral-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button className="px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-medium inline-flex items-center gap-2">
               Load More Posts
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
