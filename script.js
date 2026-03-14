// script.js - Hamburger Menu + Vision Comfort Shared Logic

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu (existing)
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("toggle");
    });
  }

  // Initialize vision comfort settings on every page load
  initVisionComfort();
});

// Global function to initialize vision comfort - call from inline scripts
function initVisionComfort() {
  const visionMode = localStorage.getItem("visionMode") || "normal";
  const textSize = localStorage.getItem("textSize") || "normal";

  const body = document.body;

  // Apply mode class
  if (visionMode === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("sepia-mode", "light-mode");
  } else if (visionMode === "sepia") {
    body.classList.add("sepia-mode");
    body.classList.remove("dark-mode", "light-mode");
  } else {
    body.classList.add("light-mode"); // Default light if normal, but match original dark default? Wait, css root is dark.
    body.classList.remove("dark-mode", "sepia-mode");
  }

  // Apply text size
  if (textSize === "large") {
    body.classList.add("large-text");
  } else {
    body.classList.remove("large-text");
  }
}

// Global function to show vision modal - call from button onclick
function showVisionModal() {
  const modal = document.getElementById("vision-modal");
  if (!modal) return; // Modal must exist in HTML

  const optionsContainer = document.getElementById("options-container");
  const promptTitle = document.getElementById("prompt-title");
  const promptDesc = document.getElementById("prompt-desc");

  let currentStep = 0;

  const steps = [
    {
      title: "Light Sensitivity",
      desc: "Do bright backgrounds cause eye strain?",
      options: [
        {
          label: "Yes, use Dark Mode",
          action: () => {
            localStorage.setItem("visionMode", "dark");
            document.body.classList.add("dark-mode");
            document.body.classList.remove("sepia-mode", "light-mode");
          },
        },
        {
          label: "Use Soft Sepia",
          action: () => {
            localStorage.setItem("visionMode", "sepia");
            document.body.classList.add("sepia-mode");
            document.body.classList.remove("dark-mode", "light-mode");
          },
        },
        {
          label: "Keep as is",
          action: () => {
            localStorage.setItem("visionMode", "normal");
            document.body.classList.remove("dark-mode", "sepia-mode");
          },
        },
      ],
    },
    {
      title: "Visual Clarity",
      desc: "Would you like to enhance text focus?",
      options: [
        {
          label: "Increase Size & Spacing",
          action: () => {
            localStorage.setItem("textSize", "large");
            document.body.classList.add("large-text");
          },
        },
        {
          label: "Standard View",
          action: () => {
            localStorage.setItem("textSize", "normal");
            document.body.classList.remove("large-text");
          },
        },
      ],
    },
  ];

  function renderStep() {
    optionsContainer.innerHTML = "";
    if (currentStep >= steps.length) {
      modal.style.display = "none";
      initVisionComfort(); // Re-apply full settings
      return;
    }

    const step = steps[currentStep];
    promptTitle.innerText = step.title;
    promptDesc.innerText = step.desc;

    step.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "vision-option-btn";
      btn.innerText = opt.label;
      btn.onclick = () => {
        opt.action();
        currentStep++;
        renderStep();
      };
      optionsContainer.appendChild(btn);
    });
  }

  modal.style.display = "block";
  currentStep = 0;
  renderStep();
}

// Close modal on background click (add to each page's inline script or here if modal exists)
window.addEventListener("click", function (event) {
  const modal = document.getElementById("vision-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
