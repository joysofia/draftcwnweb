// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝查詢功能 還沒成功...＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
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
  let senseurl=[]; //收集 senseid 建構的 url

  // 取得 lemma 資料
  $.ajax({
    url: wordurl,
    success: function(res){
      vmtest.items=(res);
      console.log('根據搜尋字找到的資料筆數', vmtest.items.length);
      lemma_number = Array.from({length:vmtest.items.length}, (v,k)=>k);
      console.log(lemma_number);
      //利用 lemma_number 取得 senseid 然後建構出 senseidurl 來做 sense 搜尋
      for (i in lemma_number){
        const senseid = vmtest.items[i].id;
        console.log('根據 lemma 找到 sense id number', senseid);
        console.log(vmtest.items);
        const senseidurl = "http://140.112.147.120:5201/senses/" + senseid ;
        $.ajax({
          url: senseidurl,
          success: function(datagot){
            vmtest.sensedata=(datagot); 
            console.log('根據搜尋字找到的資料', vmtest.sensedata);
          }
        });
        
        //同一個字型有兩個以上的 lemma 就做不出來... QQ
        //例如「有」，ㄧㄡ ˋ有一個 sense ，一ㄡ ˇ有 7 個 sense ，但我還對不上...

        senseurl.push(senseidurl); //把同一個 lemma 所有 senseidurl 存出來備用
        console.log('根據 sense id number 找到 senseurl', senseurl);
        
      //for (idurl in senseurl){
        //console.log("senseurl中的元件叫做 idurl,印出來是這樣", idurl);
        //};


        }; 
        

    }
  });
})



// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝查詢前就會出現的資料＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
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
