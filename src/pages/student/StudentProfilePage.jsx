import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';
import { addToast } from '../../redux/slices/uiSlice';
import Button from '../../components/common/Button';
import { User, Mail, Shield, UploadCloud, Save, Check } from 'lucide-react';

const StudentProfilePage = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    bio: user?.bio || 'Full stack developer passionate about scalable web architectures and MERN technologies.',
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary media upload simulation
  const handleSimulateCloudinaryUpload = () => {
    setUploading(true);
    setTimeout(() => {
      const sampleAvatars = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
      ];
      const randomAvatar = sampleAvatars[Math.floor(Math.random() * sampleAvatars.length)];
      setFormData((prev) => ({ ...prev, avatar: randomAvatar }));
      setUploading(false);
      dispatch(addToast({ type: 'success', message: 'Profile photo uploaded to Cloudinary CDN successfully!' }));
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    dispatch(addToast({ type: 'success', message: 'Profile updated successfully!' }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Account Profile & Settings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Manage your personal details, credentials, and Cloudinary media assets.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-8">
        {/* Profile Avatar & Cloudinary Upload */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={formData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`}
              alt={formData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-md"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="font-bold text-slate-900 text-base">{formData.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{formData.email}</p>
            <Button
              variant="outline"
              size="sm"
              icon={UploadCloud}
              isLoading={uploading}
              onClick={handleSimulateCloudinaryUpload}
            >
              Upload via Cloudinary
            </Button>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  disabled
                  value={formData.email}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none cursor-not-allowed text-slate-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Personal Bio / Headline
            </label>
            <textarea
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:bg-white focus:border-brand-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfilePage;
