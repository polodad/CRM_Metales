import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({ className, children, isOpen, onClose, title, ...props }, ref) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div
                    ref={ref}
                    className={cn(
                        "relative w-full max-w-lg overflow-hidden rounded-2xl border border-secondary bg-background p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center justify-between mb-4">
                        {title && <h2 className="text-xl font-bold">{title}</h2>}
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-secondary text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    }
);
Modal.displayName = 'Modal';

export { Modal };
