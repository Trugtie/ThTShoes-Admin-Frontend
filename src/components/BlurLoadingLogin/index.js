export default function BlurLoadingLogin() {
  return (
    <div id="blur-toggle3" className="blur-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function toggleBlur() {
  const blurEl = document.getElementById("blur-toggle3");
  console.log("blur");
  console.log(blurEl);
  blurEl.classList.toggle("blur-container--on");
}
