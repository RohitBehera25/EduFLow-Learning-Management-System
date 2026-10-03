import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Globe, Mail, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Edu<span className="text-brand-400">Flow</span> LMS
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Empowering global developers with industry-standard MERN, cloud architecture, and modern full-stack engineering skills.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* GitHub */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/courses" className="hover:text-white transition">All Courses</Link></li>
              <li><Link to="/courses" className="hover:text-white transition">Web Development</Link></li>
              <li><Link to="/courses" className="hover:text-white transition">Backend & DevOps</Link></li>
              <li><Link to="/courses" className="hover:text-white transition">AI & Machine Learning</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Instructors</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/register?role=instructor" className="hover:text-white transition">Teach on EduFlow</Link></li>
              <li><Link to="/instructor/dashboard" className="hover:text-white transition">Instructor Dashboard</Link></li>
              <li><Link to="/instructor/create-course" className="hover:text-white transition">Publish Course</Link></li>
              <li><Link to="#" className="hover:text-white transition">Teaching Guidelines</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get free weekly fullstack cheatsheets and discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="developer@work.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-2 rounded-lg text-xs transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EduFlow LMS. Built for MERN Stack Developers.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>using React, Redux Toolkit & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
