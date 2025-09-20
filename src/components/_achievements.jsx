import { useEffect, useRef } from "react";

export default function Achievements({ data }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    function drawTimeline(zigzag = true) {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const svg = wrapper.querySelector("svg.timeline-line");
      const entries = Array.from(wrapper.querySelectorAll(".achievement"));
      if (!entries.length) {
        if (svg) svg.innerHTML = "";
        return;
      }

      const W = wrapper.clientWidth,
        H = wrapper.clientHeight;
      svg.setAttribute("width", W);
      svg.setAttribute("height", H);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.innerHTML = "";

      const ns = "http://www.w3.org/2000/svg";
      const wrapperRect = wrapper.getBoundingClientRect();

      const items = entries.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          el,
          cx: r.left - wrapperRect.left + r.width / 2,
          cy: r.top - wrapperRect.top + r.height / 2,
        };
      });

      items.sort((a, b) => a.cy - b.cy);
      const rows = [];
      const threshold = Math.max(8, (items[0]?.el.offsetHeight || 120) * 0.6);
      for (const it of items) {
        const last = rows[rows.length - 1];
        if (
          !last ||
          Math.abs(it.cy - last.reduce((s, x) => s + x.cy, 0) / last.length) >
            threshold
        ) {
          rows.push([it]);
        } else {
          last.push(it);
        }
      }

      const order = rows.flat();
      const points = [];
      for (let i = 0; i < order.length; i++) {
        const cur = order[i];
        points.push([cur.cx, cur.cy]);
        if (i < order.length - 1) {
          const next = order[i + 1];
          if (Math.abs(next.cy - cur.cy) > 1) {
            const midY = (cur.cy + next.cy) / 2;
            points.push([cur.cx, midY], [next.cx, midY]);
          }
        }
      }

      const poly = document.createElementNS(ns, "polyline");
      poly.setAttribute("points", points.map((p) => p.join(",")).join(" "));
      poly.setAttribute("fill", "none");
      poly.setAttribute("stroke", "var(--border-color)");
      poly.setAttribute("stroke-width", "var(--border-size)");
      svg.appendChild(poly);
    }

    drawTimeline(true);
    window.addEventListener("load", () => drawTimeline(true));
    window.addEventListener("resize", () => drawTimeline(true));
    return () => window.removeEventListener("resize", () => drawTimeline(true));
  }, []);

  return (
    <section id="achievements">
      <div className="achievements-title">
        <h1>{data.title}</h1>
      </div>
      <div className="timeline-wrapper" ref={wrapperRef}>
        <svg className="timeline-line"></svg>
        <div className="timeline">
          {data.list.map((item, i) => (
            <div className="achievement" key={i}>
              <h3 className="achievement-title">{item.title}</h3>
              {item.link !== "" ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="achievement-image no-theme-filter"
                  />
                </a>
              ) : (
                <a>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="achievement-image no-theme-filter"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
