export default function smoothScroll(element, offset = 200, duration = 1000) {
  if (!element) return;

  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - offset;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const t = Math.min(timeElapsed / duration, 1);
    const position = startPosition + distance * t;
    window.scrollTo(0, position);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}
