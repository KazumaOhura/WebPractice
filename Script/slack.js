//const token = APIトークン(公開したら無効化される為未記入);
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
            GetHistory(data.channels[i].id);
          }
    },
     error:function(error){
        console.log("ERROR :" + error);
    }
})

function GetHistory(id){
    $.ajax({
        url: "https://slack.com/api/conversations.history?token=" + token + "&channel=" + id,
        dataType: 'json',
        data:{},
        success:function(data){
           console.log(data);
           for(let i in data.messages){
            ShowChanneleText(data.messages[i].text);
           }
        }
    });
}

function ShowChanneleText(text){
    $("body").append(text + "</br>");
}
});