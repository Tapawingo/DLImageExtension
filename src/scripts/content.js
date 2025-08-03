chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "getImages") {
        const imageSet = new Set();
        
        function normalizeUrl(url) {
            try {
                const u = new URL(url, location.href);
                u.search = "";
                u.hash = "";
                return u.href;
            } catch {
                return null;
            }
        }
        
        function extractUrlsFromStyle(style) {
            const propertiesToCheck = [
                "backgroundImage",
                "maskImage",
                "borderImageSource",
                "listStyleImage",
                "content"
            ];
            
            propertiesToCheck.forEach(prop => {
                const val = style[prop];
                if (val && val.includes("url(")) {
                    const matches = [...val.matchAll(/url\(["']?(.*?)["']?\)/g)];
                    matches.forEach(match => {
                        const url = normalizeUrl(match[1]);
                        if (url && !url.startsWith("data:")) {
                            imageSet.add(url);
                        }
                    });
                }
            });
        }
        
        document.querySelectorAll("img").forEach(img => {
            const src = normalizeUrl(img.src);
            if (src && !src.startsWith("data:")) {
                imageSet.add(src);
            }
        });
        
        document.querySelectorAll("*").forEach(el => {
            extractUrlsFromStyle(getComputedStyle(el));
            extractUrlsFromStyle(getComputedStyle(el, "::before"));
            extractUrlsFromStyle(getComputedStyle(el, "::after"));
        });
        
        sendResponse([...imageSet]);
    }
    
    if (msg.action === "scrollToImage") {
        const allElements = Array.from(document.querySelectorAll("*"));
        
        const match = allElements.find(el => {
            if (el.tagName === "IMG" && el.src === msg.src) return true;
            
            const style = getComputedStyle(el);
            return (
                style.backgroundImage.includes(msg.src) ||
                style.maskImage.includes(msg.src) ||
                style.borderImageSource.includes(msg.src) ||
                style.listStyleImage.includes(msg.src)
            );
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