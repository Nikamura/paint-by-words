export function throttle(callback: Function, delay: number) {
  let previousCall = new Date().getTime();
  return function() {
    const time = new Date().getTime();

    if (time - previousCall >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
}
