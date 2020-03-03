
var scrollBottom=()=>{
    let bottom = document.documentElement.clientHeight - document.body.clientHeight;
    console.log(bottom);
    window.scroll(0, document.body.clientHeight);
}

var writeChannelName=(name)=>{
    let pElement = document.createElement('p');
    pElement.textContent = "#" + name;
    document.getElementById('chat-title').appendChild(pElement);
}

var isBots=(value)=>{
    if(value != undefined)return true;
}

var isURL=(value)=>{
    if(value.match(/http/))return true;
}

var sortContents=(messages)=>{
    console.time('write');
    for(let i in messages){
        //BOTの除外
        if(isBots(messages[i].bot_id))continue;
        //URLを含むコンテンツの除外
        if(isURL(messages[i].text))continue;
        writeOneMessage(messages[i]);
    }
    console.timeEnd('write');
    scrollBottom();
}

var writeOneMessage=(messages)=>{
    let listElement = document.createElement('li');
    listElement.className = 'content-list'
    writeTimeStamp(toTimes(messages.ts), listElement);
    writeContentText(messages.text, listElement);
    document.getElementById('contents').prepend(listElement);
}

var writeTimeStamp=(timeVal, listElement)=>{
    let pElement = document.createElement('p');
    pElement.className = 'chat-time';
    pElement.textContent = timeVal.year + "/" + timeVal.month + "/" + timeVal.date + " " + timeVal.hours + ":" + timeVal.minutes;
    listElement.appendChild(pElement);
}

var writeContentText=(textVal, listElement)=>{
    let pElement = document.createElement('p');
    pElement.className = 'chat-content';
    pElement.textContent = textVal;
    listElement.appendChild(pElement);
}

var toTimes=(val)=>{
    let time = new Date(val * 1000);
    let ret = {
        year:time.getFullYear(),
        month:time.getMonth() + 1,
        date:time.getDate(),
        day:time.getDay(),
        hours:time.getHours(),
        minutes:time.getMinutes()
    }
    //console.log(ret);
    return ret;
}