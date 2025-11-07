import "./Footer.css";

export default function Footer({ websiteLabel, websiteHref, address }) {
  return (
    <footer className="footer">
      <a className="website" href={websiteHref}>
        {websiteLabel}
      </a>
      <p className="address">{address}</p>
    </footer>
  );
}
