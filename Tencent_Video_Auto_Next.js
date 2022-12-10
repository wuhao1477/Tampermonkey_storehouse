// ==UserScript==
// @name         腾讯视频播放到某个时间点自动下一集
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @require		http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @author      https://github.com/wuhao1477
// @match        https://v.qq.com/x/cover/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qq.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var taskTime =580;
    var task1 = setInterval(()=>{
        let currentTime = 0;
        for(let i=0;i<$("video").length;i++){
            let currentTimeValue = $("video")[i].currentTime;
            if(currentTimeValue>currentTime){
               currentTime = currentTimeValue;
            }
        }
        if(currentTime>taskTime){
            console.log("到点下一集了！");
            $(".txp_btn_next_u").click()
        }else{
            console.log("还没到点呢！");
        }
    },1000)
    $(".player-bottom__intro")[0].innerHTML += `<div class="barrage-input"> <div id="task_tips_text">当前自动下一集的时间线是：${taskTime}秒   </div><input  id="edit_task_time_input" style="color:#000" placeholder="请定时下一集的时间"></input><button id="set_task_new_time" style="width:50px;height=100px;background:red">确定</button></div>`
    document.getElementById("set_task_new_time").onclick=function(value){
        console.log('设置新的时间为：');
        let new_task_time = document.getElementById("edit_task_time_input").value;
        console.log(new_task_time);
        let min_task_time = ($("video")[0].duration ||$("video")[1].duration ||$("video")[2].duration)/2 ||6*60;//最短6分钟
        if(new_task_time&&new_task_time>min_task_time){
            taskTime = new_task_time;
            document.getElementById("task_tips_text").innerHTML = `<div id="task_tips_text">当前自动下一集的时间线是：${taskTime}秒   </div>`;
            alert(`设置成功！`);
        }else if(new_task_time<=min_task_time){
            alert(`最小设置时间为：${min_task_time}!`);
        }
    }

    })();
