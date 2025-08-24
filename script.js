const iconUpload = document.getElementById('iconUpload');
const previewIcon = document.getElementById('previewIcon');
const bgSelect = document.getElementById('bgSelect');
const previewArea = document.querySelector('.preview-area');
const cardContent = document.querySelector('.card-content');

// アイコン画像アップロード時の処理
iconUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) {
    previewIcon.src = '';
    previewIcon.style.opacity = '0'; // 非表示代わりに透明
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    previewIcon.src = reader.result;
    previewIcon.style.opacity = '1'; // 表示
  };
  reader.readAsDataURL(file);
});

// 初期状態はアイコン透明
previewIcon.style.opacity = '0';

// プロフィールカードのテキストを更新する関数
function updateCard() {
  document.getElementById('previewName').textContent = document.getElementById('name').value || "名前";
  document.getElementById('previewBio').textContent = document.getElementById('bio').value || "自己紹介";
  document.getElementById('previewPN').textContent = document.getElementById('pn').value || "";
  document.getElementById('previewRank').textContent = document.getElementById('rank').value || "";
  document.getElementById('previewMainChar').textContent = document.getElementById('mainChar').value || "";
  document.getElementById('previewServer').textContent = document.getElementById('server').value || "";
  document.getElementById('previewEnv').textContent = document.getElementById('env').value || "";
  document.getElementById('previewTime').textContent = document.getElementById('time').value || "";
  document.getElementById('previewSNS').textContent = document.getElementById('sns').value || "";
}

// 入力リアルタイム反映
const inputs = document.querySelectorAll('input[type="text"], textarea');
inputs.forEach(input => {
  input.addEventListener('input', updateCard);
});

// 背景画像切り替え
bgSelect.addEventListener('change', () => {
  const bgFile = bgSelect.value;
  cardContent.style.backgroundImage = `url('${bgFile}')`;

  // 背景5だけ右寄りに、他は中央
  if (bgFile === 'background5.jpg') {
    cardContent.style.backgroundPosition = '60% center';
  } else {
    cardContent.style.backgroundPosition = 'center';
  }
});

// 初期表示
updateCard();

// 画像保存処理（html2canvas使用）
document.getElementById('saveBtn').addEventListener('click', () => {
  html2canvas(document.querySelector('.preview-area'), {
    useCORS: true,
    allowTaint: true  // ← 追加！
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'profile_card.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
  }).catch(err => {
    console.error('html2canvas error:', err);
    alert('画像生成に失敗しました。コンソールを確認してください。');
  });
});
