import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLectureComplete } from '../../redux/slices/enrollmentSlice';
import { addToast } from '../../redux/slices/uiSlice';
import Button from '../../components/common/Button';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  PlayCircle,
  FileText,
  MessageSquare,
  Download,
  Share2,
  Award,
  ChevronDown,
  ChevronUp,
  Volume2
} from 'lucide-react';

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { courses } = useSelector((state) => state.courses);
  const { enrolledCourses } = useSelector((state) => state.enrollments);

  // Find course and user's enrollment
  const course = courses.find((c) => c._id === courseId || c.slug === courseId) || courses[0];
  const enrollment = enrolledCourses.find((e) => e.courseId === course?._id);

  // Flatten all lectures to easily calculate total and next lecture
  const allLectures = course?.curriculum?.flatMap((sec) => sec.lectures) || [];
  const initialLecture = allLectures[0] || null;

  const [currentLecture, setCurrentLecture] = useState(initialLecture);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'resources' | 'discussion'
  const [notesText, setNotesText] = useState('');

  // Fallback default sample video if none provided
  const videoSource =
    currentLecture?.videoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const isCompleted = enrollment?.completedLectures?.includes(currentLecture?.lectureId);
  const progressPercent = enrollment?.progressPercent || 0;

  const handleToggleComplete = () => {
    if (!currentLecture) return;
    dispatch(
      toggleLectureComplete({
        courseId: course._id,
        lectureId: currentLecture.lectureId,
        totalLectures: allLectures.length,
      })
    );

    const wasCompleted = enrollment?.completedLectures?.includes(currentLecture.lectureId);
    dispatch(
      addToast({
        type: 'success',
        message: wasCompleted
          ? 'Lecture marked as uncompleted'
          : 'Lecture completed! Progress updated.',
      })
    );

    // Auto advance to next lecture if not last
    if (!wasCompleted) {
      const currentIndex = allLectures.findIndex((l) => l.lectureId === currentLecture.lectureId);
      if (currentIndex < allLectures.length - 1) {
        setCurrentLecture(allLectures[currentIndex + 1]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/student/my-courses"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Back to my courses"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="truncate max-w-xs sm:max-w-md">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate">
              {course.title}
            </h1>
            <span className="text-[11px] text-slate-400 truncate block">
              {currentLecture?.title}
            </span>
          </div>
        </div>

        {/* Progress pill & Action */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Progress:</span>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-emerald-400">{progressPercent}%</span>
          </div>

          <Button
            size="sm"
            variant={isCompleted ? 'success' : 'primary'}
            onClick={handleToggleComplete}
            icon={CheckCircle2}
            className="text-xs"
          >
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>
      </header>

      {/* Main Learning Space: Video Player + Playlist */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Player & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-900">
          {/* HTML5 Video Player */}
          <div className="w-full bg-black aspect-video max-h-[70vh] flex items-center justify-center relative shadow-2xl">
            <video
              key={videoSource}
              src={videoSource}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Lecture Info and Actions Bar */}
          <div className="p-4 sm:p-6 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                Now Playing
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {currentLecture?.title}
              </h2>
              <span className="text-xs text-slate-400">Duration: {currentLecture?.duration}</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isCompleted ? 'outline' : 'primary'}
                size="sm"
                onClick={handleToggleComplete}
                icon={CheckCircle2}
                className={isCompleted ? 'border-emerald-500/40 text-emerald-400' : ''}
              >
                {isCompleted ? 'Mark as Incomplete' : 'Complete & Next Lecture'}
              </Button>
            </div>
          </div>

          {/* Under-Video Tabs (Notes, Resources, Q&A) */}
          <div className="flex-1 p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-4 border-b border-slate-800 text-sm">
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-brand-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Personal Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'resources'
                    ? 'border-brand-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Resources & Code
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`pb-3 font-semibold transition border-b-2 ${
                  activeTab === 'discussion'
                    ? 'border-brand-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Discussion & Questions
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Write timestamped notes while watching this lesson. They are automatically saved.
                </p>
                <textarea
                  rows={4}
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Key take-aways from this lecture..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500"
                />
                <Button size="sm" onClick={() => dispatch(addToast({ type: 'success', message: 'Notes saved!' }))}>
                  Save Notes
                </Button>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-brand-400" />
                    <span className="font-medium text-slate-200">Full Source Code (GitHub Repo)</span>
                  </div>
                  <Button variant="ghost" size="sm" icon={Download}>
                    Download .zip
                  </Button>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-brand-400" />
                    <span className="font-medium text-slate-200">Lecture Presentation Slides & Cheatsheet (PDF)</span>
                  </div>
                  <Button variant="ghost" size="sm" icon={Download}>
                    Download PDF
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-bold text-slate-200">Rahul K.</span>
                    <span className="text-slate-500 text-[10px]">2 days ago</span>
                  </div>
                  <p className="text-slate-300">
                    "Question on Redux Toolkit createAsyncThunk: should we always handle the rejected state explicitly or use unwrap()?"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Collapsible Curriculum Drawer / Playlist */}
        <div className="w-full lg:w-96 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Course Content</h3>
            <span className="text-xs text-slate-400">
              {enrollment?.completedLectures?.length || 0} / {allLectures.length} completed
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
            {course.curriculum?.map((section, secIdx) => (
              <div key={section.sectionId || secIdx}>
                <div className="p-3 bg-slate-900/60 text-xs font-bold text-slate-300">
                  {section.title}
                </div>
                <div>
                  {section.lectures?.map((lecture) => {
                    const isCurrent = currentLecture?.lectureId === lecture.lectureId;
                    const isLectureDone = enrollment?.completedLectures?.includes(lecture.lectureId);

                    return (
                      <button
                        key={lecture.lectureId}
                        onClick={() => setCurrentLecture(lecture)}
                        className={`w-full text-left p-3.5 flex items-start gap-3 transition ${
                          isCurrent
                            ? 'bg-brand-900/40 border-l-4 border-brand-500 text-white'
                            : 'hover:bg-slate-900 text-slate-300'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isLectureDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : isCurrent ? (
                            <Play className="w-4 h-4 text-brand-400 fill-brand-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium leading-snug line-clamp-2">
                            {lecture.title}
                          </p>
                          <span className="text-[11px] text-slate-500 mt-1 block">
                            {lecture.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;
