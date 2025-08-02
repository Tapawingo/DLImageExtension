chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getImages") {
        const images = Array.from(document.images)
            .map(img => img.src)
            .filter(src => src);
        sendResponse(images);
    }
  
    if (msg.action === "scrollToImage") {
      const targetImg = Array.from(document.images).find(
            img => img.src === msg.src
      );
  
      if (targetImg) {
        targetImg.scrollIntoView({ behavior: "smooth", block: "center" });
  
        targetImg.style.outline = "4px solid #ff9800";
        targetImg.style.outlineOffset = "2px";
        targetImg.style.borderRadius = "3px";
  
        setTimeout(() => {
            targetImg.style.outline = "";
            targetImg.style.outlineOffset = "";
            targetImg.style.borderRadius = "";
        }, 2000);
      }
    }
  });