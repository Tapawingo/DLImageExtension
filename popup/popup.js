document.addEventListener("DOMContentLoaded", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.tabs.sendMessage(tab.id, { action: "getImages" }, images => {
        const grid = document.getElementById("image-grid");
    
        images.forEach((src, i) => {
            const container = document.createElement("div");
            container.className = "image-container";
    
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `img-${i}`;
            checkbox.checked = true;
    
            const img = document.createElement("img");
            img.src = src;
            img.alt = "";
    
            container.appendChild(checkbox);
            container.appendChild(img);
            grid.appendChild(container);

            img.addEventListener("click", () => {
                chrome.tabs.sendMessage(tab.id, {
                    action: "scrollToImage",
                    src: src
                });
            });
        });
    
        document.getElementById("download-btn").addEventListener("click", async () => {
            const checkboxes = document.querySelectorAll("input[type='checkbox']");
            const zip = new JSZip();
            const selectedImages = [];
          
            checkboxes.forEach((cb, i) => {
                if (cb.checked) {
                    selectedImages.push(images[i]);
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
    });
});
  