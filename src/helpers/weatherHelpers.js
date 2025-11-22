export const formatTime = (date = new Date()) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

export const formatDate = (date = new Date()) =>
    date.toLocaleDateString('en-US', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
