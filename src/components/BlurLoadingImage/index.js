export default function BlurLoadingImage() {
  return (
    <div id="blur-toggle2" className="blur-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function toggleBlur() {
  const blurEl = document.getElementById("blur-toggle2");
  console.log("blur");
  console.log(blurEl);
  blurEl.classList.toggle("blur-container--on");
}
