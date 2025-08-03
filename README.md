<p align="center">
    <img src="https://raw.githubusercontent.com/Tapawingo/DLImageExtension/refs/heads/main/extras/assets/logo/DLImageExtension_logo.png" width="480">
</p>

<p align="center">
    <a href="https://github.com/Tapawingo/DLImageExtension/releases">
        <img src="https://img.shields.io/github/v/release/Tapawingo/DLImageExtension?style=flat-square" alt="Releases">
    </a>
    <a>
    <img src="https://img.shields.io/github/repo-size/Tapawingo/DLImageExtension?style=flat-square" alt="repo Size">
    </a>
    <a href="https://github.com/Tapawingo/DLImageExtension/issues" alt="Issue Tracker">
        <img src="https://img.shields.io/github/issues-raw/Tapawingo/DLImageExtension?style=flat-square">
    </a>
    <a href="https://github.com/Tapawingo/DLImageExtension/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/Tapawingo/DLImageExtension?style=flat-square" alt="License">
    </a>
</p>

A minimal and efficient **Chromium extension** that allows users to **bulk download all images** from the current webpage with ease. Designed with usability and performance in mind, this extension provides a clean UI, dark mode support, and intelligent image selection—all in a small, self-contained package.

## Features
- 🔍 **Scans all images** on the active tab, including lazy-loaded and off-screen assets
- ✅ **Checkbox selection** for full control over which images to download
- 🌓 **Dark and light mode** support (follows system theme)
- 📥 **One-click bulk download** of selected images
- 🔧 **Optional filter modal** for image size or URL keyword filters

## How It Works
1. Navigate to any website with images.
2. Click the **extension icon** in your browser toolbar.
3. The popup opens with a **visual grid** of all detected images.
4. Click an image to see it's location in the page.
5. Select or deselect images using the checkboxes.
6. Click the **Download** button to download all selected images in bulk.

## Installation
### From Source (Developer Mode)
1. Clone or download this repository.
2. Open your chromium browser and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the src folder.
5. The extension icon will appear in your toolbar.

## Permissions
The extension requires:
- `activeTab` – to analyze the currently open webpage
- `downloads` – to save selected images to your device

No user data is collected or stored. Everything runs locally in your browser.

## Contributing
You can help out with the ongoing development by looking for potential bugs and vulnerabilities, or by contributing new features. We are always welcoming new pull requests containing bug fixes, refactors and new features.

### Contribution guidelines
To contribute something to **DLImageExtension**, simply fork this repository and submit your pull requests for review by other collaborators.

### Submitting issues and requesting features
Please use our [Issue Tracker](https://github.com/Tapawingo/DLImageExtension/issues) to report a bug, propose a feature, or suggest changes to the existing ones.

## License
This project is released under the [**MIT License**](https://github.com/Tapawingo/DLImageExtension/blob/main/LICENSE). Use it, modify it, and share it freely.