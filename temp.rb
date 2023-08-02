# 导入 sinatra 库
require 'sinatra'

# 创建一个变量，用来存储最近一次 webhook_URL 发送的温度数据
$temperature = nil

# 定义一个路由，用来处理 POST 请求，并更新最近一次 webhook_URL 发送的温度数据
post '/' do
  # 获取请求体中的 JSON 数据
  data = JSON.parse(request.body.read)

  # 获取 JSON 数据中的温度值，并赋值给变量 $temperature
  $temperature = data['temperature']

  # 返回一个成功的响应
  status 200
end

# 定义一个路由，用来处理 GET 请求，并返回最近一次 webhook_URL 发送的温度数据
get '/' do
  # 设置响应类型为 JSON
  content_type :json

  # 返回一个包含温度值的 JSON 数据
  {temperature: $temperature}.to_json
end
