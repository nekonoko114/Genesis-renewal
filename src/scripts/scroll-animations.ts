import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.1,
  });

  const sections = gsap.utils.toArray<HTMLElement>('main > section:not(#concept-movie)');
  sections.forEach((section) => {
    gsap.from(section, {
      autoAlpha: 0,
      y: 72,
      filter: 'blur(12px)',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        end: 'top 42%',
        scrub: 0.8,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('#hero .collage-card').forEach((card, index) => {
    gsap.to(card, {
      yPercent: index % 2 === 0 ? -18 : 16,
      rotate: index % 2 === 0 ? -4 : 4,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('.reveal-text').forEach((text) => {
    gsap.fromTo(
      text,
      { '--progress': '0%' },
      {
        '--progress': '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'top 88%',
          end: 'top 48%',
          scrub: true,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLImageElement>('.parallax-img').forEach((image) => {
    gsap.fromTo(
      image,
      { yPercent: -8, scale: 1.16 },
      {
        yPercent: 8,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('.parallax-img-container') ?? image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('.impact-card').forEach((card, index) => {
    gsap.from(card, {
      y: 90,
      rotateX: 10,
      autoAlpha: 0,
      delay: index * 0.08,
      scrollTrigger: {
        trigger: card,
        start: 'top 86%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('.service-item').forEach((item, index) => {
    const image = item.querySelector('.service-image-shell');
    const copy = item.querySelector('.w-full.lg\\:w-2\\/5');

    gsap.from(image, {
      xPercent: index % 2 === 0 ? -18 : 18,
      autoAlpha: 0,
      rotate: index % 2 === 0 ? -2 : 2,
      scrollTrigger: {
        trigger: item,
        start: 'top 78%',
        end: 'top 38%',
        scrub: 0.9,
      },
    });

    gsap.from(copy, {
      xPercent: index % 2 === 0 ? 18 : -18,
      autoAlpha: 0,
      scrollTrigger: {
        trigger: item,
        start: 'top 74%',
        end: 'top 34%',
        scrub: 0.9,
      },
    });
  });

  gsap.from('#concept-movie iframe', {
    clipPath: 'inset(16% 18% round 28px)',
    scale: 1.08,
    scrollTrigger: {
      trigger: '#concept-movie',
      start: 'top 82%',
      end: 'center 52%',
      scrub: 0.8,
    },
  });

  gsap.from('#news .glass-card a', {
    x: -44,
    autoAlpha: 0,
    stagger: 0.12,
    scrollTrigger: {
      trigger: '#news',
      start: 'top 72%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('#contact > div', {
    scale: 0.92,
    y: 80,
    autoAlpha: 0,
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 78%',
      end: 'top 42%',
      scrub: 0.9,
    },
  });

  gsap.to('.parallax-bg', {
    yPercent: (index) => [-12, 10, -8][index] ?? -10,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.4,
    },
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
