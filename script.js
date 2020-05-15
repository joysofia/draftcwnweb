// 查詢功能 還沒成功ＸＰ
var vmtest= new Vue({
  el: "#test",
  data: {
    word: "",
    items: [],
    sensedata: []
  }
});

$("#search").click(function(){
  const inputword = $("#inputword").val(); 
  const wordurl="http://140.112.147.120:5201/search/^"+ inputword + "$";
  console.log(inputword);
  console.log(wordurl);
  // 取得 lemma 資料
  $.ajax({
    url: wordurl,
    success: function(res){
      vmtest.items=(res);
      console.log(vmtest.items.length);
      var senseid = vmtest.items[0].id;
      console.log(senseid);
      const senseidurl = "http://140.112.147.120:5201/senses/" + senseid ;
      console.log(senseidurl);
      $.ajax({
        url: senseidurl,
        success: function(datagot){
          vmtest.sensedata=(datagot);
        }
      });
    }
  });
  

  
  // 取得 sense 資料

})


const wordapiurl="http://140.112.147.120:5201/search/^"+ inputword + "$"
console.log(wordapiurl);







// 查詢前就會出現的資料＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 查詢_api 網址
var apiurl={
  itemdata: "http://140.112.147.120:5201/search/%5E%E8%A9%9E$",
  sensesdata: "http://140.112.147.120:5201/senses/067465"
};

// 呈現查詢的lemma資料
var vm_lemma= new Vue({
  el: "#app_lemma",
  data: {
    items: []
  }
});

$.ajax({
  url: apiurl.itemdata,
  success: function(res){
    vm_lemma.items=(res);
  }
});

// 呈現查詢的sense資料
var vm_sense= new Vue({
  el: "#app_sense",
  data: {
    senses: [],
    examples: []
  }
});

$.ajax({
  url: apiurl.sensesdata,
  success: function(res){
    vm_sense.senses=(res);
  }
});

// Toggle between showing and hiding the sidebar when clicking the menu icon
var mySidebar = document.getElementById("mySidebar");

function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
  } else {
    mySidebar.style.display = 'block';
  }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}

// Create tabs on click 
function openContent(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
