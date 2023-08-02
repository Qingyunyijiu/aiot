// 替换为你的 webhook URL
const WEBHOOK_URL = 'https://webhook.site/fbda7154-9421-4ab1-8570-a3eabbc605af';

async function getLatestTemp() {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST' 
  });

  const data = await response.json();

  return data.temperature; 
}

setInterval(async () => {
  const temp = await getLatestTemp();
  document.getElementById('temp').innerText = temp;
}, 10000);
