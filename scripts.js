const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? "\u25B6" : "\u23F8";
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  if (mouseDown) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

ranges.forEach((slider) => {
  slider.addEventListener("change", handleRangeUpdate);
});

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousedown", () => (mouseDown = true));
video.addEventListener("mouseout", () => (mouseDown = false));
progress.addEventListener("mouseup", () => (mouseDown = false));
