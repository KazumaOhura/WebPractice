//const token = SlackToken;
const channel = "times_ohura";
const SlackUrl = "https://slack.com/api/";

window.onload = function(){
    this.getChannelList();

    var Scroll = document.documentElement;
    var bottom = Scroll.scrollHeight - Scroll.clientHeight;
    window.scroll(0, bottom);
}

function getChannelList(){

    let httpRequest = new XMLHttpRequest();
    if(!httpRequest){
        console.log("HTTPリクエストの作成に失敗しました");
    }

    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                console.log(this.response);
                for(let i in this.response.channels){
                    if(this.response.channels[i].name == channel){
                    writeChannelName(this.response.channels[i].name);
                    getHistory(this.response.channels[i].id);
                    }
                }
            }
        }
    }

    httpRequest.open('GET',  SlackUrl + "conversations.list?token=" + token);
    httpRequest.responseType = 'json';
    httpRequest.send(null);
}

function writeChannelName(name){
    $("body").append( '<p class="chatTitle">#' + name + "</p>");
}

function getHistory(id){
    
    let httpRequest = new XMLHttpRequest();
    if(!httpRequest){
        console.log("HTTPリクエストの作成に失敗しました");
    }

    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                console.log(this.response);
                for(let i in this.response.messages){
                    if(this.response.messages[i].bot_id != undefined)continue;
                    if(this.response.messages[i].text.match(/https/))continue;
                    showTimeStamp(toTimes(this.response.messages[i].ts));
                    showChanneleText(this.response.messages[i].text);
                }
            }
        }
    }

    httpRequest.open('GET',  SlackUrl + "conversations.history?token=" + token + "&channel=" + id);
    httpRequest.responseType = 'json';
    httpRequest.send(null);
}

function showTimeStamp(val){
    $("body").append('<p class="chatTime">' + val.year + "/" + val.month + "/" + val.date +  " " + val.hours + ":" + val.minutes + '</p>');
    //document.getElementsByClassName('chatTime')
}

function showChanneleText(text){
    $("body").append('<p class="chatContent">' + text + "</p>");
}

function toTimes(val){
    let time = new Date(val * 1000);
    let ret = {
        year:time.getFullYear(),
        month:time.getMonth() + 1,
        date:time.getDate(),
        day:time.getDay(),
        hours:time.getHours(),
        minutes:time.getMinutes()
    }
    console.log(ret);
    return ret;
}
