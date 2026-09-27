(function () {
  var STORAGE_KEY = "aiida-theme";
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    var theme =
      stored === "light" || stored === "dark" ? stored : "system";
    var resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch {}
})();
