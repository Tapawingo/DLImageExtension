chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getImages") {
    const imageSet = new Set();

    document.querySelectorAll('img').forEach(img => {
      if (img.src) imageSet.add(img.src);
    });

    document.querySelectorAll('*').forEach(el => {
      const style = getComputedStyle(el);
      const bgImage = style.backgroundImage;

      const urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        imageSet.add(urlMatch[1]);
      }
    });

    sendResponse([...imageSet]);
  }

  if (msg.action === "scrollToImage") {
    const allElements = Array.from(document.querySelectorAll("*"));

    const match = allElements.find(el => {
      if (el.tagName === "IMG" && el.src === msg.src) return true;

      const style = getComputedStyle(el);
      const bgImage = style.backgroundImage;
      return bgImage.includes(msg.src);
    });

    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      match.style.outline = "4px solid #ff9800";
      match.style.outlineOffset = "2px";

      setTimeout(() => {
        match.style.outline = "";
        match.style.outlineOffset = "";
      }, 2000);
    }
  }
});