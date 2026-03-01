export function getExtensionData() {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 10;

    function request() {
      window.postMessage({ type: "GET_AG_STATS" }, "*");
    }

    function handler(event) {
      if (event.source !== window) return;
      if (event.data?.type !== "AG_STATS_RESPONSE") return;

      window.removeEventListener("message", handler);
      resolve(event.data.data || {});
    }

    window.addEventListener("message", handler);

    const interval = setInterval(() => {
      attempts++;
      request();

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        window.removeEventListener("message", handler);
        resolve({});
      }
    }, 300);
  });
}