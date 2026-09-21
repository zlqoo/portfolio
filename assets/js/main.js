/* =========================================================
   YOUR NAME — 作品集交互脚本
   包含：加载动画 / 自定义光标 / 滚动进度 / 导航状态
        滚动揭示动画 / 标题乱码入场 / 卡片 3D 倾斜
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 加载动画 ---------- */
  const loader = document.getElementById("loader");
  const loaderBar = document.getElementById("loaderBar");
  let loadProgress = 0;

  const loadTimer = setInterval(() => {
    loadProgress = Math.min(100, loadProgress + Math.random() * 22);
    if (loaderBar) loaderBar.style.width = loadProgress + "%";
    if (loadProgress >= 100) {
      clearInterval(loadTimer);
      setTimeout(() => loader && loader.classList.add("is-done"), 250);
    }
  }, 120);

  /* ---------- 自定义光标 ---------- */
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursorDot");
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    if (cursorDot) cursorDot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  });

  (function loopCursor() {
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    if (cursor) cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loopCursor);
  })();

  document.querySelectorAll("[data-cursor='hover']").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor && cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor && cursor.classList.remove("is-hover"));
  });

  /* ---------- 滚动进度条 + 导航状态 ---------- */
  const progress = document.getElementById("scrollProgress");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");

  function onScroll() {
    const st = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("is-scrolled", st > 40);

    // 高亮当前区块对应的导航项
    let current = "hero";
    document.querySelectorAll("main section[id]").forEach((sec) => {
      if (st >= sec.offsetTop - window.innerHeight * 0.35) current = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinksBox = document.getElementById("navLinks");
  if (navToggle && navLinksBox) {
    navToggle.addEventListener("click", () => navLinksBox.classList.toggle("is-open"));
    navLinksBox.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinksBox.classList.remove("is-open"))
    );
  }

  /* ---------- 滚动揭示动画 ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll("[data-reveal], .reveal-line").forEach((el) => io.observe(el));

  /* ---------- 标题乱码入场（Scramble） ---------- */
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@*+";
  function scramble(el) {
    const finalText = el.dataset.final || "";
    let frame = 0;
    const total = Math.max(18, finalText.length * 1.6);
    const tick = () => {
      frame++;
      const done = frame / total;
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === " ") { out += " "; continue; }
        out += i / finalText.length < done
          ? finalText[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (done < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    };
    tick();
  }

  const scrambleIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scramble(entry.target);
          scrambleIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll("[data-scramble]").forEach((el) => {
    el.dataset.final = el.textContent;
    scrambleIO.observe(el);
  });

  /* ---------- 卡片 3D 倾斜 ---------- */
  const MAX_TILT = 7; // 最大倾斜角度
  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const isCard = el.classList.contains("card");
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const scale = isCard ? 1.015 : 1.02;
      el.style.transform =
        `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) ` +
        `rotateY(${(px * MAX_TILT).toFixed(2)}deg) scale(${scale})`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  /* ---------- 第二屏：经历手风琴 ---------- */
  const timelineItems = document.querySelectorAll(".timeline__item");
  timelineItems.forEach((item) => {
    const head = item.querySelector(".timeline__head");
    if (!head) return;
    head.addEventListener("click", () => {
      const wasOpen = item.classList.contains("is-open");
      timelineItems.forEach((o) => {
        o.classList.remove("is-open");
        const h = o.querySelector(".timeline__head");
        if (h) h.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 第三屏：扇形卡片（入场散开 + 鼠标视差） ---------- */
  const fan = document.getElementById("fan");
  if (fan) {
    // 滚动进入视口时，四张卡从中心叠放状态呈扇形展开
    const fanIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fan.classList.add("is-fanned");
            fanIO.unobserve(fan);
            // 入场动画结束后切换为灵敏过渡，让视差/悬停跟手
            setTimeout(() => fan.classList.add("is-settled"), 1600);
          }
        });
      },
      { threshold: 0.35 }
    );
    fanIO.observe(fan);

    // 鼠标视差：整个扇形随鼠标轻微游移（外层卡片幅度小、内层幅度大）
    if (window.matchMedia("(hover: hover)").matches) {
      fan.addEventListener("mousemove", (e) => {
        const r = fan.getBoundingClientRect();
        fan.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        fan.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      fan.addEventListener("mouseleave", () => {
        fan.style.setProperty("--px", 0);
        fan.style.setProperty("--py", 0);
      });
    }
  }

  /* ---------- 首屏：漂浮图片视差 ---------- */
  const heroStage = document.getElementById("heroStage");
  if (heroStage && window.matchMedia("(hover: hover)").matches) {
    let hx = 0, hy = 0, htx = 0, hty = 0;
    heroStage.addEventListener("mousemove", (e) => {
      htx = (e.clientX / window.innerWidth - 0.5) * 2;
      hty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    heroStage.addEventListener("mouseleave", () => { htx = 0; hty = 0; });
    (function loopHero() {
      hx += (htx - hx) * 0.055;
      hy += (hty - hy) * 0.055;
      heroStage.style.setProperty("--mx", hx.toFixed(4));
      heroStage.style.setProperty("--my", hy.toFixed(4));
      requestAnimationFrame(loopHero);
    })();
  }

  /* ---------- 年份 ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 首屏：向下滚动引导按钮 ---------- */
  const heroScroll = document.getElementById("heroScroll");
  if (heroScroll) {
    heroScroll.addEventListener("click", () => {
      const target = document.getElementById("experience") || document.querySelector(".experience");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- 首屏背景视频：自动播放一次（0.3× 慢速） ---------- */
  const heroVideo = document.getElementById("heroVideo");
  if (heroVideo) {
    heroVideo.playbackRate = 0.3; // 慢放至原速的 0.3 倍
    const tryPlay = () => {
      const p = heroVideo.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    // 仅当视频未播完且被浏览器暂停时才恢复，播完后不再重播
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && heroVideo.paused && !heroVideo.ended) tryPlay();
    });
  }

  /* ---------- 第二屏：左侧动态视频（循环自动播放兜底） ---------- */
  const expVideo = document.getElementById("expVideo");
  if (expVideo) {
    const tryPlayExp = () => {
      const p = expVideo.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlayExp();
    // 进入视口时确保正在播放；页面重新可见时也恢复
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) tryPlayExp(); });
      }).observe(expVideo);
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && expVideo.paused) tryPlayExp();
    });
  }
})();
