// 替换为你的 webhook URL
const WEBHOOK_URL = 'https://webhook.site/fbda7154-9421-4ab1-8570-a3eabbc605af';

// 获取温度数据的函数 
async function getLatestTemp(){

  const response = await fetch(WEBHOOK_URL, {
    method: 'GET' 
  });

  const data = await response.json();

  return data.temperature;

}

// 每10秒调用函数获取最新温度
setInterval(async () => {

  const temp = await getLatestTemp();

  document.getElementById('temp').innerText = temp;

}, 10000);
