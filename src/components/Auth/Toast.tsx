import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export interface ToastProps {
    message: string;
    duration?: number;
    onClose?: () => void;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    showProgress?: boolean;
    className?: string;
    isVisible?: boolean; // external control
}

export const Toast: React.FC<ToastProps> = ({
    message,
    duration = 5000,
    onClose,
    position = 'top-right',
    showProgress = true,
    className = '',
    isVisible: controlledVisible = true,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(controlledVisible);
    const [progress, setProgress] = useState<number>(100);

    useEffect(() => {
        if (!controlledVisible) {
            setIsVisible(false);
            return;
        }

        setIsVisible(true);
        setProgress(100);

        if (duration > 0) {
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    const decrement = 100 / (duration / 100);
                    const newProgress = prev - decrement;

                    if (newProgress <= 0) {
                        clearInterval(progressInterval);
                        handleClose();
                        return 0;
                    }
                    return newProgress;
                });
            }, 100);

            return () => clearInterval(progressInterval);
        }
    }, [duration, controlledVisible]);

    const handleClose = (): void => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const getPositionClasses = (): string => {
        const positions: Record<string, string> = {
            'top-left': 'top-4 left-4',
            'top-center': 'top-4 left-1/2 -translate-x-1/2',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
            'bottom-right': 'bottom-4 right-4'
        };
        return positions[position] || positions['top-right'];
    };

    const getAnimationClasses = (): string => {
        if (isVisible) {
            return 'translate-y-0 opacity-100 scale-100';
        }

        return position.includes('top')
            ? '-translate-y-full opacity-0 scale-95'
            : 'translate-y-full opacity-0 scale-95';
    };

    return (
        <div
            className={`
                fixed z-50 ${getPositionClasses()}
                transform transition-all duration-300 ease-out
                ${getAnimationClasses()}
                ${className}
            `}
            role="alert"
            aria-live="polite"
        >
            <div className="
                bg-emerald-50 border border-emerald-200 text-emerald-800
                rounded-lg shadow-lg backdrop-blur-sm
                p-4 pr-12 min-w-80 max-w-md
                relative overflow-hidden
            ">
                <div className="flex items-start gap-3">
                    <div className="text-emerald-600 flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-5">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="
                            text-emerald-600 hover:opacity-70 
                            transition-opacity duration-200
                            absolute top-3 right-3
                            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 rounded
                        "
                        aria-label="Close notification"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {showProgress && duration > 0 && (
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-black/10"
                        aria-hidden="true"
                    >
                        <div
                            className="h-full bg-emerald-500 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Toast;
