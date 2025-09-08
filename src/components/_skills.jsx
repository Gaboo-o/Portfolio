import { useEffect, useRef, useState } from "react";

function InfiniteSlider({ items, speed, direction = "left" }) {
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const [repeatCount, setRepeatCount] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const oneSetWidth = containerRef.current.scrollWidth;
      if (oneSetWidth === 0) return; // wait for render
      const screenWidth = window.innerWidth;
      const needed = Math.ceil(screenWidth / oneSetWidth) + 3;
      setRepeatCount(needed);
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame;
    const dir = direction === "left" ? -1 : 1;
    const measuredWidth = container.scrollWidth / repeatCount;

    // Initial offset: items start offscreen depending on direction
    offsetRef.current = direction === "left" ? 0 : -measuredWidth;

    const step = () => {
      offsetRef.current += (dir * speed) / 60;

      if (direction === "left" && offsetRef.current <= -measuredWidth) {
        offsetRef.current = 0;
      } else if (direction === "right" && offsetRef.current >= 0) {
        offsetRef.current = -measuredWidth;
      }

      container.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed, repeatCount, direction]);

  const repeatedItems =
    repeatCount === null
      ? items
      : Array.from({ length: repeatCount }, () => items).flat();


  return (
    <div className="slider-track" ref={containerRef}>
      {repeatedItems.map((item, i) => (
        <div className="skill-icon-container" key={i}>
          <img className="skill-icon" src={item.src} alt={item.alt} />
          <div className="skill-icon-hover-text">{item.alt}</div>
        </div>
      ))}
    </div>
  );
}

export default function Skills({ data }) {
  return (
    <section id="skills">
      <div className="skills-title">
        <h1>{data.title}</h1>
      </div>

      <div className="skills-container">
        {Object.entries(data.list).map(([category, items], index) => {
          const isEven = index % 2 === 0;
          const borderStyle = isEven
            ? { borderLeft: "var(--border-size) solid var(--border-color)" }
            : { borderRight: "var(--border-size) solid var(--border-color)" };

          return (
            <div
              className="slider"
              style={!isEven ? { flexDirection: "row-reverse" } : {}}
              key={category}
            >
              <p className="slider-title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>

              <div className="slider-inner" style={borderStyle}>
                <InfiniteSlider
                  items={items}
                  speed={data.speed}
                  direction={isEven ? "right" : "left"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}