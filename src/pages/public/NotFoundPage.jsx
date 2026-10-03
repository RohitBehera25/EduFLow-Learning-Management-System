import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="text-8xl font-black text-brand-600/20 select-none">404</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button icon={Home}>Back to Home</Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" icon={ArrowLeft}>Browse Courses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
