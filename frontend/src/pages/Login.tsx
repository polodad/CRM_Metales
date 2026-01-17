import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

// Simple Input component inline if not available yet, or use basic HTML for now to ensure speed
// But wait, I recall seeing Input in conversation history. I'll check after list_dir returns.
// For this exact `write_to_file`, I'll assume standard HTML input with Tailwind classes to match Button.

export default function Login() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:3000/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error('Failed to send code');

            setStep(2);
        } catch (err: any) {
            setError(err.message || 'Error sending code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:3000/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: otp }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Invalid code');
            }

            const data = await res.json(); // { access_token, user }
            login(data.access_token, data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error verifying code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-100">
            <div className="w-full max-w-md p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-2xl backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                        Metal CRM
                    </h1>
                    <p className="text-zinc-400 mt-2">Sign in or create an account</p>
                    <p className="text-xs text-zinc-500 mt-1">(New accounts are created automatically)</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full justify-center"
                            disabled={loading}
                        >
                            {loading ? 'Sending Code...' : 'Send Login Code'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="text-sm text-zinc-400">Code sent to </span>
                            <span className="font-medium text-zinc-200">{email}</span>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="ml-2 text-xs text-orange-500 hover:text-orange-400 underline"
                            >
                                Change
                            </button>
                        </div>
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-zinc-400 mb-1">
                                Enter Code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-center tracking-widest text-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full justify-center"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Sign In'}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
