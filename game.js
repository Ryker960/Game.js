
const rig = document.getElementById("playerRig");

let direction = 0;
let jumping = false;
let playing = false;

document.getElementById("playButton").onclick = () => {
  playing = true;
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameUI").style.display = "block";
};

document.getElementById("menuButton").onclick = () => {
  document.getElementById("menu").style.display = "block";
};

document.getElementById("closeMenu").onclick = () => {
  document.getElementById("menu").style.display = "none";
};

document.getElementById("leftButton").ontouchstart = () => direction = -1;
document.getElementById("rightButton").ontouchstart = () => direction = 1;
document.getElementById("leftButton").ontouchend = () => direction = 0;
document.getElementById("rightButton").ontouchend = () => direction = 0;
document.getElementById("jumpButton").ontouchstart = () => jumping = true;
document.getElementById("jumpButton").ontouchend = () => jumping = false;

function updateGame() {
  requestAnimationFrame(updateGame);

  if (!playing || !rig) return;

  if (!document.querySelector("a-scene").is("vr-mode")) {
    const p = rig.object3D.position;

    p.x += direction * 0.045;

    if (jumping && p.y < 2.5) {
      p.y += 0.04;
    } else if (!jumping && p.y > 1.6) {
      p.y -= 0.04;
    }

    p.y = Math.max(1.6, p.y);
  }
}

updateGame();

// Jungle trees
const forest = document.getElementById("forest");

for (let i = 0; i < 65; i++) {
  const x = (Math.random() - .5) * 75;
  const z = (Math.random() - .5) * 75;

  if (Math.abs(x) < 5 && z > 0 && z < 12) continue;

  const tree = document.createElement("a-entity");
  tree.setAttribute("position", `${x} 0 ${z}`);

  tree.innerHTML = `
    <a-cylinder
      position="0 2 0"
      radius=".35"
      height="4"
      color="#684126">
    </a-cylinder>
    <a-sphere
      position="0 4.4 0"
      radius="2"
      color="#167b28">
    </a-sphere>
  `;

  forest.appendChild(tree);
}

