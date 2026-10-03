import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Access Restricted (403)
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            You do not have the required permissions or role clearance to access this portal. Use the Role Switcher in the top navigation to switch your account type.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button icon={Home}>Home</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" icon={ArrowLeft}>Sign In As Different Role</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
