'use strict';


const HANDS = {
  rock:     { emoji: '✊', label: 'グー' },
  scissors: { emoji: '✌️', label: 'チョキ' },
  paper:    { emoji: '✋', label: 'パー' },
};
const BEATS = { rock: 'scissors', scissors: 'paper', paper: 'rock' };
const LINES = {
  start:    '「さあ、じゃんけんで勝負だ！」',
  thinking: '「うーん、何を出そうかな……」',
  win:      ['「ぐっ……やるな！」', '「うわっ、やられた！」', '「強い……次こそは！」'],
  lose:     ['「ふっ、ぼくの勝ちだ！」', '「やったぞ、勝った！」', '「ふっふっふ！」'],
  draw:     ['「おっと、同じ手だね」', '「あいこだ！もう一回！」', '「気が合うね」'],
};
const COUNT_KEY = { win: 'wins', lose: 'losses', draw: 'draws' };

/* 状態*/
const state = { wins: 0, losses: 0, draws: 0, busy: false };
const $ = id => document.getElementById(id);
const pick = a => a[Math.floor(Math.random() * a.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const setBtns = lock => document.querySelectorAll('button').forEach(b => b.disabled = lock);

function renderScore() {
  $('wins').textContent   = state.wins;
  $('losses').textContent = state.losses;
  $('draws').textContent  = state.draws;
}

/* アニメ*/
function replay(el, cls) {
  el.classList.remove(...cls.split(' '));
  void el.offsetWidth;
  el.classList.add(cls);
}

/* 1ラウンド  */
async function play(hand) {
  if (state.busy) return;
  state.busy = true;
  setBtns(true);
  sound.click();

  // プレイヤーの手を表示、敵は「考え中」
  $('player-hand').textContent = HANDS[hand].emoji;
  $('enemy-hand').textContent  = '?';
  $('dialogue').textContent    = LINES.thinking;
  $('message').textContent     = '敵が考えている……';
  await sleep(700);

  // 敵が手を出す
  const enemy = pick(Object.keys(HANDS));
  $('enemy-hand').textContent = HANDS[enemy].emoji;
  replay($('enemy-hand'), 'reveal');

  // 勝敗判定とスコア更新
  const result = hand === enemy ? 'draw' : BEATS[hand] === enemy ? 'win' : 'lose';
  state[COUNT_KEY[result]]++;
  renderScore();

  // セリフとメッセージ
  $('dialogue').textContent = pick(LINES[result]);
  const verb = { win: '勝ち！', lose: '負け……', draw: 'あいこ' }[result];
  $('message').textContent = `あなたの${HANDS[hand].label} vs 敵の${HANDS[enemy].label} → ${verb}`;

  // 敵のリアクションアニメと効果音
  replay($('enemy'), result);
  sound[result]();

  await sleep(500);
  state.busy = false;
  setBtns(false);
}

/* リセット関連はここ */
function reset() {
  if (state.busy) return;
  Object.assign(state, { wins: 0, losses: 0, draws: 0 });
  renderScore();
  $('player-hand').textContent = '?';
  $('enemy-hand').textContent  = '?';
  $('dialogue').textContent    = LINES.start;
  $('message').textContent     = '手を選んでください。';
  $('enemy').classList.remove('win', 'lose', 'draw');
}

/*　イベント設定関連はここ　*/
document.querySelectorAll('button[data-hand]').forEach(b =>
  b.addEventListener('click', () => play(b.dataset.hand)));
$('reset').addEventListener('click', reset);
document.addEventListener('click', () => sound.intro(), { once: true });
