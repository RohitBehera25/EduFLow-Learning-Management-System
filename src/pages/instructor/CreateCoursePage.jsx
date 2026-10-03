import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../redux/slices/courseSlice';
import { addToast } from '../../redux/slices/uiSlice';
import Button from '../../components/common/Button';
import {
  PlusCircle,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Video,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'web-dev',
    level: 'Intermediate',
    language: 'English',
    price: 3999,
    originalPrice: 9999,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  });

  const [sections, setSections] = useState([
    {
      sectionId: 'sec_1',
      title: 'Module 1: Introduction & Architecture Fundamentals',
      lectures: [
        {
          lectureId: 'lec_init_1',
          title: 'Welcome to the Course & Project Setup',
          duration: '12:30',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isPreview: true,
        },
      ],
    },
  ]);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary media upload simulation
  const handleCloudinaryThumbnailUpload = () => {
    setUploadingImage(true);
    setTimeout(() => {
      const mockThumbnails = [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
      ];
      const randomThumb = mockThumbnails[Math.floor(Math.random() * mockThumbnails.length)];
      setFormData((prev) => ({ ...prev, thumbnail: randomThumb }));
      setUploadingImage(false);
      dispatch(
        addToast({
          type: 'success',
          message: 'Thumbnail uploaded and processed by Cloudinary CDN!',
        })
      );
    }, 1200);
  };

  // Section & Lecture management
  const addSection = () => {
    setSections([
      ...sections,
      {
        sectionId: `sec_${Date.now()}`,
        title: `Module ${sections.length + 1}: Advanced Concepts`,
        lectures: [
          {
            lectureId: `lec_${Date.now()}_1`,
            title: 'Lesson 1: Deep Dive',
            duration: '15:00',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isPreview: false,
          },
        ],
      },
    ]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, idx) => idx !== index));
  };

  const addLecture = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].lectures.push({
      lectureId: `lec_${Date.now()}`,
      title: `Lesson ${updated[sectionIndex].lectures.length + 1}: New Topic`,
      duration: '10:00',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      isPreview: false,
    });
    setSections(updated);
  };

  const updateLectureTitle = (secIdx, lecIdx, val) => {
    const updated = [...sections];
    updated[secIdx].lectures[lecIdx].title = val;
    setSections(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      dispatch(addToast({ type: 'error', message: 'Please provide a course title.' }));
      return;
    }

    const newCourseData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discountPercent: Math.round(
        ((formData.originalPrice - formData.price) / formData.originalPrice) * 100
      ),
      curriculum: sections,
      instructor: {
        _id: user?._id || 'usr_inst',
        name: user?.name || 'Instructor',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
        headline: user?.headline || 'Senior Fullstack Instructor',
      },
      features: [
        'Full HD on-demand lecture streaming',
        'Downloadable resources & production code',
        'Direct instructor Q&A access',
        'Certificate of achievement',
      ],
    };

    dispatch(addCourse(newCourseData));
    dispatch(
      addToast({
        type: 'success',
        message: 'Course created and published to the public catalog!',
      })
    );
    navigate('/instructor/courses');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Create New Course
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
          Assemble high-quality lessons, upload media assets via Cloudinary, and publish to students worldwide.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Information */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs flex items-center justify-center font-bold">1</span>
            Basic Course Information
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Master MERN Stack 2026: Microservices & Cloud Architecture"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Short Subtitle / Description *
            </label>
            <textarea
              rows={2}
              name="subtitle"
              required
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Provide a compelling 1-2 sentence overview of what students will achieve."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-brand-500"
              >
                <option value="web-dev">Web Development</option>
                <option value="backend">Backend & Cloud</option>
                <option value="data-science">AI & Machine Learning</option>
                <option value="mobile-dev">Mobile App Development</option>
                <option value="devops">DevOps & Containers</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Difficulty Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-brand-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Course Language
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:bg-white focus:border-brand-500"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Discounted Price (INR ₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Original Strikethrough Price (INR ₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:bg-white focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Media & Cloudinary Thumbnail */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs flex items-center justify-center font-bold">2</span>
            Media & Cloudinary Asset Upload
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-56 aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img
                src={formData.thumbnail}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Cover Thumbnail</h4>
              <p className="text-xs text-slate-500">
                Recommended 16:9 aspect ratio (1280x720). Images are compressed and delivered through Cloudinary CDN.
              </p>
              <Button
                variant="outline"
                size="sm"
                icon={UploadCloud}
                isLoading={uploadingImage}
                onClick={handleCloudinaryThumbnailUpload}
              >
                Upload to Cloudinary
              </Button>
            </div>
          </div>
        </div>

        {/* Step 3: Curriculum Builder */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-soft space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs flex items-center justify-center font-bold">3</span>
              Curriculum & Lecture Builder
            </h2>
            <Button
              variant="outline"
              size="sm"
              icon={PlusCircle}
              onClick={addSection}
            >
              Add Module Section
            </Button>
          </div>

          <div className="space-y-4">
            {sections.map((section, secIdx) => (
              <div
                key={section.sectionId}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Layers className="w-4 h-4 text-brand-600 shrink-0" />
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[secIdx].title = e.target.value;
                        setSections(updated);
                      }}
                      className="w-full bg-white font-bold text-slate-800 text-sm px-3 py-1.5 border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(secIdx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Lectures List inside section */}
                <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                  {section.lectures.map((lecture, lecIdx) => (
                    <div
                      key={lecture.lectureId}
                      className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Video className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          value={lecture.title}
                          onChange={(e) => updateLectureTitle(secIdx, lecIdx, e.target.value)}
                          className="w-full text-xs font-medium text-slate-800 outline-none"
                          placeholder="Lecture title"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {lecture.duration}
                      </span>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addLecture(secIdx)}
                    className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1 pt-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Add Lecture to this module
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            size="lg"
            icon={ArrowRight}
            className="shadow-xl shadow-brand-600/20"
          >
            Publish Course to Catalog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
