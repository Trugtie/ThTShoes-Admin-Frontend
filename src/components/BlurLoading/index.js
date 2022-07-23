import "./style.scss";
export default function BlurLoading() {
  return (
    <div id="blur-toggle" className="blur-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function toggleBlur() {
  const blurEl = document.getElementById("blur-toggle");
  blurEl.classList.toggle("blur-container--on");
}
