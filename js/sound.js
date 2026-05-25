const sound = (() => {
  let ctx = null;

  const init = () => {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  };

  // 単音を鳴らす (周波数 / 長さ / 波形 / 音量 / 開始遅延)
  function tone(freq, dur, type = 'triangle', vol = 0.12, delay = 0) {
    init();
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain).connect(ctx.destination);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur);
  }

  // メロディを順番に鳴らす (周波数の配列)
  const melody = (notes, step = 0.12, type) =>
    notes.forEach((f, i) => tone(f, step, type, 0.12, i * step));

  return {
    click: () => tone(800, 0.04, 'square', 0.08),                  // ボタン押下音
    win:   () => melody([523, 659, 784, 1047], 0.12),              // 勝ち: ド-ミ-ソ-ド↑ 上昇
    lose:  () => melody([392, 349, 311, 262], 0.18, 'sawtooth'),   // 負け: 下降音階
    draw:  () => melody([440, 440], 0.10),                         // あいこ: ラ-ラ
    intro: () => melody([523, 659, 784, 1047, 784, 1047], 0.13),   // 起動時のファンファーレ
  };
})();
