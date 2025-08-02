document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    const grid = document.getElementById("image-grid");
    const noImages = document.getElementById("no-images");
    const downloadBtn = document.getElementById("download-btn");
  
    grid.innerHTML = "";
    noImages.style.display = "none";
  
    for (let i = 0; i < 21; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "skeleton skeleton-box";
      grid.appendChild(skeleton);
    }
  
    chrome.tabs.sendMessage(tab.id, { action: "getImages" }, async (imageUrls) => {
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        grid.innerHTML = "";
        noImages.style.display = "block";
        return;
      }
  
      const loadPromises = imageUrls.map(url => new Promise(resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ src: url, width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => resolve(null);
      }));
  
      const results = (await Promise.all(loadPromises)).filter(Boolean);
      const validImages = results.map(i => i.src);
  
      grid.innerHTML = "";
  
      if (validImages.length === 0) {
        noImages.style.display = "block";
        return;
      }
  
      renderImages(validImages, tab.id);
    });
  
    function renderImages(imageList, tabId) {
      const grid = document.getElementById("image-grid");
      grid.innerHTML = "";
  
      imageList.forEach((src, i) => {
        const container = document.createElement("div");
        container.className = "image-container";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `img-${i}`;
        checkbox.checked = true;
  
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
  
        img.addEventListener("click", () => {
          chrome.tabs.sendMessage(tabId, {
            action: "scrollToImage",
            src: src
          });
        });
  
        container.appendChild(checkbox);
        container.appendChild(img);
        grid.appendChild(container);
      });
  
      downloadBtn.addEventListener("click", async () => {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const zip = new JSZip();
        const selectedImages = [];
  
        checkboxes.forEach((cb, i) => {
          if (cb.checked) {
            selectedImages.push(imageList[i]);
          }
        });
  
        const fetchPromises = selectedImages.map(async (url) => {
          try {
            const res = await fetch(url, { mode: "cors" });
            const blob = await res.blob();
  
            let name = url.split("/").pop().split(/\#|\?/)[0];
            if (!name || name.length === 0 || !name.includes(".")) {
              name = `image_${Date.now()}.jpg`;
            }
  
            zip.file(name, blob);
          } catch (e) {
            console.warn("Failed to fetch image:", url, e);
          }
        });
  
        await Promise.all(fetchPromises);
  
        const content = await zip.generateAsync({ type: "blob" });
        const blobUrl = URL.createObjectURL(content);
  
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "images.zip";
        a.click();
        URL.revokeObjectURL(blobUrl);
      });
    }
  });
  