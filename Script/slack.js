const SLACK_TOKEN = ""; //SlackのAPIトークン
const TARGET_CHANNEL = "times_ohura";
const SLACK_API_URL = "https://slack.com/api/";

window.addEventListener("DOMContentLoaded", ()=>{
    getChannelList();
})

var getChannelList=()=>{

    let httpRequest = new XMLHttpRequest();
    if(!httpRequest){
        console.log("HTTPリクエストの作成に失敗しました");
    }

    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                console.log(this.response);
                console.time('time');
                for(let i in this.response.channels){
                    if(this.response.channels[i].name == TARGET_CHANNEL){
                    writeChannelName(this.response.channels[i].name);
                    getHistory(this.response.channels[i].id);
                    }
                }
                console.timeEnd('time');
            }
        }
    }

    httpRequest.open('GET', SLACK_API_URL + "conversations.list?token=" + SLACK_TOKEN);
    httpRequest.responseType = 'json';
    httpRequest.send(null);
}

var getHistory=(id)=>{
    
    let httpRequest = new XMLHttpRequest();
    if(!httpRequest){
        console.log("HTTPリクエストの作成に失敗しました");
    }

    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(this.response){
                console.log(this.response);
                console.time('log');
                sortContents(this.response.messages);
                console.timeEnd('log');
            }
        }
    }
    httpRequest.open('GET',  SLACK_API_URL + "conversations.history?token=" + SLACK_TOKEN + "&channel=" + id);
    httpRequest.responseType = 'json';
    httpRequest.send(null);
}
