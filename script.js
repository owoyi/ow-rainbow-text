const input = document.getElementById('inputText');
const lengthInfo = document.getElementById('lengthInfo');
const warning = document.getElementById('warning');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('output');
const preview = document.getElementById('preview');

input.addEventListener('input', () => {
  const len = input.value.length;
  lengthInfo.textContent = `${len} / 15`;
  warning.style.display = len > 15 ? 'inline' : 'none';
});

function hsvToRgb(h, s, v) {
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255).toString(16).padStart(2, '0').toUpperCase();
  g = Math.round((g + m) * 255).toString(16).padStart(2, '0').toUpperCase();
  b = Math.round((b + m) * 255).toString(16).padStart(2, '0').toUpperCase();
  return r + g + b;
}

function convertText() { // 25.07.24 AM 3:49: 공백은 색 안 입혀지게 수정
  const text = input.value;
  const total = text.length;
  let result = '';
  let previewHTML = '';

  let colorIndex = 0; // 공백은 제외한 색상 인덱스

  for (let i = 0; i < total; i++) {
    const char = text[i];
    if (char === ' ') {
      // 공백은 색상 없이 그대로 추가
      result += ' ';
      previewHTML += ' ';
      continue;
    }

    const hue = (colorIndex / (text.replace(/ /g, '').length)) * 360;
    const rgb = hsvToRgb(hue, 1, 1);
    result += `<FG${rgb}FF>${char}`;
    previewHTML += `<span style="color:#${rgb}">${char}</span>`;
    colorIndex++; // 공백이 아닐 때만 색상 인덱스 증가
  }

  output.textContent = result;
  preview.innerHTML = previewHTML;
}

  output.textContent = result;
  preview.innerHTML = previewHTML;
}

function copyOutput() {
  const text = output.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ 복사됨!";
    setTimeout(() => {
      copyBtn.textContent = "📋 복사";
    }, 1500);
  });
}

// 초기 상태 반영
input.dispatchEvent(new Event('input'));
