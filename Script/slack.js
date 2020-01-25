//const token = SlackAPI-Token;
const channel = "times_ohura";

$(function(){
$.ajax({
     url: "https://slack.com/api/conversations.list?token=" + token,
     dataType: 'json',
     data: {},
     success:function(data){
         for(let i in data.channels)
          if(data.channels[i].name == channel){
            console.log(data);
            writeChannelName(data.channels[i].name);
            getHistory(data.channels[i].id);
          }
    },
     error:function(error){
        console.log("ERROR :" + error);
    }
})

function writeChannelName(name){
    $("body").append( '<p class="chatTitle">#' + name + "</p>");
}

function getHistory(id){
    $.ajax({
        url: "https://slack.com/api/conversations.history?token=" + token + "&channel=" + id,
        dataType: 'json',
        data:{},
        success:function(data){
           console.log(data);
           for(let i in data.messages){
            if(data.messages[i].bot_id != undefined)continue;
            if(data.messages[i].text.match(/https/))continue;
            showTimeStamp(toTimes(data.messages[i].ts));
            showChanneleText(data.messages[i].text);
           }
        }
    });
}

function showTimeStamp(val){
    $("body").append('<p class="chatTime">' + val.year + "/" + val.month + "/" + val.date +  " " + val.hours + ":" + val.minutes + '</p>');
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
});