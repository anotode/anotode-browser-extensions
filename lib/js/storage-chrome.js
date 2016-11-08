function setKey(key, value){
  obj = {}
  obj[key] = value
  chrome.storage.sync.set(obj, function(){
    console.log('Saved')
  })
}

function getKey(key, cb){
  chrome.storage.sync.get(key, function(items){
    console.log(items)
    console.log(items[key])
    if (Object.keys(items).length == 0)
      cb(null)
    else
      cb(items[key])
  })
}

function removeKey(key){
  chrome.storage.sync.remove(key, function(){
    console.log('Removed')
  })
}

function clearAllData(){
  chrome.storage.sync.clear(function(){
    console.log('Cleared')
  })
}
