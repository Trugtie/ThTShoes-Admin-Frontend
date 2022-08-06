import "./style.scss";

export default function BoxStatistical({ title, content, bg }) {
  return (
    <div
      className="box-stastistical-container"
      style={{ backgroundImage: `${bg}` }}
    >
      <h2 className="box-title">{title}</h2>
      <h3 className="box-content">{content}</h3>
    </div>
  );
}
