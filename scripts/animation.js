const animated = document.querySelector('.bell');
const notification = document.getElementById('notification');

animated.addEventListener('animationend', () => {
    notification.classList.add('notification-indicator');
    notification.classList.add('notification-indicator-primary');
});