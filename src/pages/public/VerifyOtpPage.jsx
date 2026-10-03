import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, clearAuthError } from '../../redux/slices/authSlice';
import { addToast } from '../../redux/slices/uiSlice';
import Button from '../../components/common/Button';
import { MailCheck, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

const VerifyOtpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email') || 'user@example.com';
  const role = searchParams.get('role') || 'student';
  const name = searchParams.get('name') || 'Student';

  const { loading, error } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      verifyOtp({
        email,
        otp,
        role,
        name
      })
    );

    if (verifyOtp.fulfilled.match(resultAction)) {
      dispatch(
        addToast({
          type: 'success',
          message: 'Account successfully activated! Welcome to EduFlow.',
        })
      );
      navigate(`/${role}/dashboard`, { replace: true });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 text-center">
        <div className="inline-flex w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 items-center justify-center shadow-sm mx-auto">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Account Activation
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            We have dispatched an automated activation code via <strong>Nodemailer</strong> to:
          </p>
          <div className="font-semibold text-xs text-slate-800 bg-slate-100 py-1.5 px-3 rounded-lg inline-block">
            {email}
          </div>
        </div>

        {/* Demo Code Box */}
        <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl text-left text-xs space-y-1">
          <p className="font-bold text-amber-800 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" /> Demo Activation Code:
          </p>
          <p className="text-amber-900 font-mono font-bold text-sm tracking-widest">
            123456
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium p-3 rounded-xl flex items-center gap-2 text-left">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Enter 6-Digit OTP Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                if (error) dispatch(clearAuthError());
                setOtp(e.target.value);
              }}
              placeholder="123456"
              className="w-full text-center text-2xl font-bold tracking-[0.5em] py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-500 outline-none"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full py-3 shadow-lg font-bold"
            icon={ArrowRight}
          >
            Activate & Go to Dashboard
          </Button>
        </form>

        <p className="text-xs text-slate-400">
          Did not receive the code?{' '}
          <button
            onClick={() => dispatch(addToast({ type: 'info', message: 'New code sent: 123456' }))}
            className="text-brand-600 font-semibold hover:underline"
          >
            Resend Email
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
