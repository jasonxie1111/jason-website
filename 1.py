import requests

# 定義一個函式，用於將圖片傳送到 Line Notify
def sendImageToLineNotify(image_url, access_token):
    # Line Notify API 的 URL
    url = 'https://notify-api.line.me/api/notify'
    # 設定 Line Notify 的標頭
    headers = {
        'Authorization': 'Bearer ' + access_token
    }
    # 設定傳送的資料，包括文字訊息和圖片縮圖、全圖的網址
    data = {
        'message': '圖片來自NASA',
        'imageThumbnail': image_url,
        'imageFullsize': image_url
    }
    # 發送 HTTP POST 請求，傳送圖片到 Line Notify
    response = requests.post(url, headers=headers, data=data)
    # 檢查 HTTP 回應的狀態碼
    if response.status_code == 200:
        print('圖片已成功發送！')
    else:
        print('發送圖片時發生錯誤：', response.text)

# NASA API 的 API 密鑰
api_key = "rQQ5dlfczGqSej49Z8UvzEXSVBLWt8nn8uJ9hzdF"
# NASA API 的網址
url = "https://api.nasa.gov/planetary/apod"
# NASA API 的參數
params = {
    "api_key": api_key
}
# 發送 HTTP GET 請求，獲取 NASA API 的返回值
response = requests.get(url, params=params)
# 將 HTTP 回應的 JSON 資料解析為 Python 物件
data = response.json()
# 從 NASA API 的返回值中取得圖片的網址
image_url = data["url"]
# 將圖片傳送到 Line Notify
access_token = "xn7YpdH1ho1wlOB2B00QzFXt7XFQvyZ9UcQS8XWpC0s"  # 請替換為您的 Line Notify 權杖
sendImageToLineNotify(image_url, access_token)