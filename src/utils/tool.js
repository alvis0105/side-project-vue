// api error JSON key 小寫轉換
tool.toLocaleLowerCase = function(JsonData) {
  if (typeof JsonData === 'object') {
    const tempJson = JSON.parse(JSON.stringify(JsonData))
    toCase(tempJson)
    return tempJson
  }
}