import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import "./styles/ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);

  // Separate RAFs so Lenis loop doesn't contend with our transform loop
  const lenisRafRef = useRef(null);
  const transformRafRef = useRef(null);

  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  // Cached geometry so we don't read layout every scroll frame
  const geomRef = useRef({
    cardTops: [],
    endTop: 0,
    containerHeight: 0,
  });

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : window.innerHeight,
      };
    }
  }, [useWindowScroll]);

  // Compute offsetTop relative to the correct scrolling container
  const getOffsetRelative = useCallback((el) => {
    if (useWindowScroll) {
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY;
    }
    // Accumulate offsetTop up to the scroller wrapper
    let offset = 0;
    let node = el;
    const scroller = scrollerRef.current;
    while (node && node !== scroller) {
      offset += node.offsetTop || 0;
      node = node.offsetParent;
    }
    return offset;
  }, [useWindowScroll]);

  const measurePositions = useCallback(() => {
    const { containerHeight } = getScrollData();
    geomRef.current.containerHeight = containerHeight;

    const cards = cardsRef.current;
    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    geomRef.current.cardTops = cards.map((c) => getOffsetRelative(c));
    geomRef.current.endTop = endEl ? getOffsetRelative(endEl) : 0;
  }, [getScrollData, getOffsetRelative, useWindowScroll]);

  const calculateProgress = useCallback((x, start, end) => {
    if (x <= start) return 0;
    if (x >= end) return 1;
    return (x - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop } = getScrollData();
    const { containerHeight, cardTops, endTop } = geomRef.current;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    cardsRef.current.forEach((card, i) => {
      const cardTop = cardTops[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        // Determine "top card" index based on current scroll (approximate)
        let topIdx = 0;
        for (let j = 0; j < cardTops.length; j++) {
          const jStart = cardTops[j] - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jStart) topIdx = j;
        }
        if (i < topIdx) {
          blur = Math.max(0, (topIdx - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        card.style.transform = transform;
        // Avoid setting filter on the active top card to reduce paint cost
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    getScrollData,
    parsePercentage,
    calculateProgress
  ]);

  // rAF-throttled scroll handler
  const handleScroll = useCallback(() => {
    if (transformRafRef.current == null) {
      transformRafRef.current = requestAnimationFrame(() => {
        updateCardTransforms();
        transformRafRef.current = null;
      });
    }
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const createLenis = (opts) => new Lenis(opts);

    if (useWindowScroll) {
      const lenis = createLenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.08,
        syncTouch: true,
        syncTouchLerp: 0.08
      });
      lenis.on('scroll', handleScroll);

      const raf = (time) => {
        lenis.raf(time);
        lenisRafRef.current = requestAnimationFrame(raf);
      };
      lenisRafRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

    const lenis = createLenis({
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner'),
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientationHandler: true,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 35,
      lerp: 0.08,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertia: 0.6
    });
    lenis.on('scroll', handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      lenisRafRef.current = requestAnimationFrame(raf);
    };
    lenisRafRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!useWindowScroll && !scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current = cards;

    // Base styles & spacing
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    // Measure once on mount
    measurePositions();

    // Re-measure on resize and when content changes size
    const resizeObserver = new ResizeObserver(() => {
      measurePositions();
      // after re-measure, ensure transforms match the new geometry
      handleScroll();
    });

    // Observe scroller and cards for size changes
    if (useWindowScroll) {
      resizeObserver.observe(document.documentElement);
      resizeObserver.observe(document.body);
    } else if (scroller) {
      resizeObserver.observe(scroller);
    }
    cards.forEach((c) => resizeObserver.observe(c));

    // Images can change layout after load; re-measure on load
    const imgs = (useWindowScroll ? document : scroller).querySelectorAll('img');
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', measurePositions, { once: true });
      }
    });

    setupLenis();
    // Initial draw
    updateCardTransforms();

    return () => {
      if (lenisRafRef.current) cancelAnimationFrame(lenisRafRef.current);
      if (transformRafRef.current) cancelAnimationFrame(transformRafRef.current);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      resizeObserver.disconnect();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    measurePositions,
    updateCardTransforms,
    handleScroll
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
