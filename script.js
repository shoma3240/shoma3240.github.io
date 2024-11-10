document.addEventListener("DOMContentLoaded", function() {
  const defaultText = `
      <p>For example, like this</p>
      <p>search kanji is ”雑魚”</p>
      <p>↓↓↓↓↓↓↓↓↓</p>
      <p><strong>Anime:</strong> NARUTO</p>
      <p><strong>Episode:</strong> 10</p>
      <p><strong>Time:</strong> 15m30s</p>
      <p><strong>Character:</strong> Kakashi</p>
      <p><strong>Line:</strong> Za→ko→ga!!↓</p>
      <p><strong>Target:</strong> Sasuke</p>
      <p><strong>Meaning:</strong> showing off one's superior abilities to others</p>
  `;
  document.getElementById("resultSection").innerHTML = defaultText;
});

const animeData = [];

function searchKanji() {
const kanji = document.getElementById('kanjiInput').value.trim();
const resultSection = document.getElementById('resultSection');
resultSection.innerHTML = '';

if (!kanji) {
  alert('Please enter the kanji');
  return;
}

// Google翻訳APIを使って意味を取得する（APIキーを設定してください）
const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';AIzaSyAk9dRMTMQlE3dDZh173F68rHrQ0GCVGRc
const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}&q=${kanji}&source=ja&target=en`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    const translation = data.data.translations[0].translatedText;
    let resultHTML = `<h2>${kanji}</h2><p><strong>意味:</strong> ${translation}</p>`;

    // 登録されたアニメ情報を検索
    const matchingAnimeData = animeData.filter(item => item.kanji === kanji);
    if (matchingAnimeData.length > 0) {
      matchingAnimeData.forEach(item => {
        resultHTML += `
          <h3>アニメ情報</h3>
          <p><strong>アニメ:</strong> ${item.animeName}</p>
          <p><strong>話数:</strong> ${item.episode}</p>
          <p><strong>シーン:</strong> ${item.time}</p>
          <p><strong>キャラクター:</strong> ${item.character}</p>
          <p><strong>セリフ:</strong> ${item.line}</p>
          <p><strong>意味:</strong> ${item.meaning}</p>
          <p><strong>該当のセリフを言われた相手:</strong> ${item.targetCharacter}</p>
        `;

        // Google画像検索APIを使って画像を取得
        const imageUrl = `https://www.googleapis.com/customsearch/v1?q=${item.animeName},${item.character},${item.line}&cx=054b2ce3929a34502&searchType=image&key=${apiKey}`;
        fetch(imageUrl)
          .then(response => response.json())
          .then(data => {
            if (data.items && data.items.length > 0) {
              const imageSrc = data.items[0].link;
              resultHTML += `<img src="${imageSrc}" alt="${item.character} image" style="width: 100%; max-width: 300px; margin-top: 10px;">`;
            }
            resultSection.innerHTML = resultHTML;
          })
          .catch(err => {
            console.error('Error fetching image:', err);
            resultSection.innerHTML = resultHTML;
          });
      });
    } else {
      resultSection.innerHTML = resultHTML;
    }
  })
  .catch(err => {
    console.error('Error fetching translation:', err);
    resultSection.innerHTML = `<p>翻訳中にエラーが発生しました。</p>`;
  });
}

function registerAnimeData() {
const kanji = document.getElementById('adminKanjiInput').value.trim();
const animeName = document.getElementById('animeNameInput').value.trim();
const episode = document.getElementById('episodeInput').value.trim();
const time = document.getElementById('timeInput').value.trim();
const character = document.getElementById('characterInput').value.trim();
const line = document.getElementById('lineInput').value.trim();
const meaning = document.getElementById('meaningInput').value.trim();
const targetCharacter = document.getElementById('targetCharacterInput').value.trim();

if (!kanji || !animeName || !episode || !time || !character || !line || !meaning || !targetCharacter) {
  alert('全てのフィールドに入力してください');
  return;
}

animeData.push({
  kanji,
  animeName,
  episode,
  time,
  character,
  line,
  meaning,
  targetCharacter
});

alert('アニメ情報が登録されました');
document.getElementById('adminForm').reset();
}