document.getElementById('saveBtn').addEventListener('click', () => {
  const element = document.querySelector('.preview-area');

  html2canvas(element, {
    useCORS: true,
    backgroundColor: null   // 背景透明でレンダリング
  }).then(canvas => {
    // 元キャンバスを角丸付きでラップする
    const w = canvas.width;
    const h = canvas.height;
    const radius = 40; // 角丸の大きさ
    const border = 12; // 黒枠の太さ

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = w + border * 2;
    finalCanvas.height = h + border * 2;
    const ctx = finalCanvas.getContext("2d");

    // 背景透明
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

    // 角丸パス
    ctx.beginPath();
    ctx.moveTo(border + radius, border);
    ctx.lineTo(border + w - radius, border);
    ctx.quadraticCurveTo(border + w, border, border + w, border + radius);
    ctx.lineTo(border + w, border + h - radius);
    ctx.quadraticCurveTo(border + w, border + h, border + w - radius, border + h);
    ctx.lineTo(border + radius, border + h);
    ctx.quadraticCurveTo(border, border + h, border, border + h - radius);
    ctx.lineTo(border, border + radius);
    ctx.quadraticCurveTo(border, border, border + radius, border);
    ctx.closePath();

    // 枠線（黒）
    ctx.lineWidth = border;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // クリップして中身を描画
    ctx.clip();
    ctx.drawImage(canvas, border, border);

    // 保存
    const link = document.createElement("a");
    link.download = "profile_card.png";
    link.href = finalCanvas.toDataURL("image/png");
    link.click();
  }).catch(err => {
    console.error("html2canvas error:", err);
    alert("画像生成に失敗しました。コンソールを確認してください。");
  });
});
