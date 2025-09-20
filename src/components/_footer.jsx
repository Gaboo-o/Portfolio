export default function Footer({ data }) {
  const thisYear = new Date().getFullYear();

  return (
    <footer>
      <section id="contact">
        {/* Icons */}
        <div className="links-container">
          {data.list.map((item, index) => (
            <a
              key={index}
              className="link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link-img" src={item.src} alt={item.alt} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="copyright">
          &copy; {thisYear} Gabriel Valle. All rights reserved.
        </p>
      </section>
    </footer>
  );
}
