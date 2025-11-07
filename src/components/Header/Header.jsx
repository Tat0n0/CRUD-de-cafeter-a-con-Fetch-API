import "./Header.css";

export default function Header({ title, subtitle }) {
  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </header>
  );
}
