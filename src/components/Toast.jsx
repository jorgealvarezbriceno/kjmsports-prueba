import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', show, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, duration]);

    if (!show) return null;

    const bgColor = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info'
    }[type] || 'bg-success';

    const icon = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    }[type] || 'fa-check-circle';

    return (
        <div
            className="position-fixed top-0 start-50 translate-middle-x p-3"
            style={{ zIndex: 9999, marginTop: '20px' }}
        >
            <div className={`toast show ${bgColor} text-white`} role="alert">
                <div className="toast-body d-flex align-items-center justify-content-between">
                    <div>
                        <i className={`fas ${icon} me-2`}></i>
                        {message}
                    </div>
                    <button
                        type="button"
                        className="btn-close btn-close-white ms-3"
                        onClick={onClose}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Toast;
