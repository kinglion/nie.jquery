$.extend({share:{product:nie.config.site,size:{tSina:[615,505],t163:[550,330],qzone:[650,530],kaixin:[600,350],renren:[600,450],douban:[550,400],bai:[1E3,600],tQQ:[600,500],msn:[1E3,750]},log:function(b,a){if(this.product)(new Image).src=this.getUrl("http://click.ku.163.com/share.gif",{site:b,type:a&&a.logType?a.logType:0,product:this.product,url:encodeURIComponent(location.host+location.pathname),r:(new Date).getMilliseconds()})},go:function(b,a){this.log(a,b);var c=this.size[a],c=this.data({width:c[0],
height:c[1],top:(screen.height-c[1])/4,left:(screen.width-c[0])/2,toolbar:"no",menubar:"no",scrollbars:"no",resizable:"yes",location:"no",status:"no"});window.open(this[a+"Url"](b),"_blank",c.join(","))},chk:function(b,a,c,d){d=b&&b[a]&&b[a][c]?b[a][c]:d;switch(c){case "url":b=["share="+(b&&b[a].logType?b[a].logType:0),"sys="+(b&&b[a].sys?b[a].sys:"")].join("&");d+=(d.indexOf("?")==-1?"?":"&")+b;break;case "img":if(d.indexOf("http://")==-1&&d!="")b=document.createElement("div"),b.innerHTML='<a href="'+
d.replace(/"/g,"%22")+'"/>',d=b.firstChild.href}return encodeURIComponent(d)},chkUrl:function(b,a){return this.chk(b,a,"url",window.location.href)},chkImg:function(b,a){return this.chk(b,a,"img","")},chkTitle:function(b,a){return this.chk(b,a,"title",document.title)},chkContent:function(b,a){return this.chk(b,a,"content",document.title)},data:function(b){var a=[],c;for(c in b)a.push(c+"="+b[c]);return a},getUrl:function(b,a){return b+"?"+this.data(a).join("&")},dealSys:function(b,a,c){if(a&&a[c])a[c].sys=
b;return a},tQQUrl:function(b){var a=this.dealSys("tQQ",arguments,0);return this.getUrl("http://v.t.qq.com/share/share.php",{url:this.chkUrl(a,0),site:window.location.hostname,title:this.chkTitle(a,0),pic:this.chkImg(a,0)})},tQQ:function(b,a){$.share.go(a,"tQQ")},t163Url:function(b){var a=this.dealSys("t163",arguments,0),c=this.chkUrl(a,0);return this.getUrl("http://t.163.com/article/user/checkLogin.do",{link:c,source:encodeURIComponent("\u7f51\u6613\u6e38\u620f"),info:this.chkTitle(a,0)+"%20"+c,
images:this.chkImg(a,0),check1stImg:!0,togImg:!0})},t163:function(b,a){$.share.go(a,"t163")},kaixinUrl:function(b){var a=this.dealSys("kaixin",arguments,0);return this.getUrl("http://www.kaixin001.com/repaste/share.php",{rtitle:this.chkTitle(a,0),rurl:this.chkUrl(a,0),rcontent:this.chkContent(a,0)})},kaixin:function(b,a){$.share.go(a,"kaixin")},xiaonei:function(b,a){$.share.go(a,"xiaonei")},renrenUrl:function(b){var a=this.dealSys("renren",arguments,0);return this.getUrl("http://share.renren.com/share/buttonshare.do",
{title:this.chkTitle(a,0),link:this.chkUrl(a,0)})},renren:function(b,a){$.share.go(a,"renren")},doubanUrl:function(b){var a=this.dealSys("douban",arguments,0);return this.getUrl("http://www.douban.com/recommend/",{url:this.chkUrl(a,0),title:this.chkTitle(a,0),image:this.chkImg(a,0)})},douban:function(b,a){$.share.go(a,"douban")},qzoneUrl:function(b){var a=this.dealSys("qzone",arguments,0);return this.getUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",{url:this.chkUrl(a,0),title:this.chkTitle(a,
0),pics:this.chkImg(a,0)})},qzone:function(b,a){$.share.go(a,"qzone")},baiUrl:function(b){var a=this.dealSys("bai",arguments,0);return this.getUrl("http://bai.sohu.com/share/blank/add.do",{from:"nie",link:this.chkUrl(a,0),title:this.chkTitle(a,0)})},bai:function(b,a){$.share.go(a,"bai")},tSinaUrl:function(b){var a=this.dealSys("tSina",arguments,0);return this.getUrl("http://v.t.sina.com.cn/share/share.php",{c:"nie",content:"gb2312",pic:this.chkImg(a,0),source:"nie",sourceUrl:encodeURIComponent("http://"+
nie.config.site+".163.com"),title:this.chkTitle(a,0),url:this.chkUrl(a,0)})},tSina:function(b,a){$.share.go(a,"tSina")},qq:function(b){this.copyClip(b,"qq");this.log("qq")},msnUrl:function(b){var a=this.dealSys("msn",arguments,0),c=function(a){return a.length>450?a.substring(0,450):a};return this.getUrl("http://profile.live.com/badge",{wa:"wsignin1.0",url:this.chkUrl(a,0),screenshot:this.chkImg(a,0),title:c(this.chkTitle(a,0)),description:c(this.chkContent(a,0))})},msn:function(b){$.share.go(b,"msn")},
copyClip:function(b,a){var c=this.dealSys(a,arguments,0),c=b.clipBoardTxt?b.clipBoardTxt:decodeURIComponent(this.chkTitle(c,0)+" "+this.chkUrl(c,0));$.clipBoard(c,b&&b.alertTxt?b.alertTxt:"\u590d\u5236\u6210\u529f\uff01\u8bf7\u7c98\u8d34\u5206\u4eab\u7ed9\u670b\u53cb\uff01")},appendTo:function(b,a){if(b){var c={t163:"\u7f51\u6613\u5fae\u535a",kaixin:"\u5f00\u5fc3\u7f51",renren:"\u4eba\u4eba\u7f51",douban:"\u8c46\u74e3",qzone:"QQ\u7a7a\u95f4",bai:"\u767d\u793e\u4f1a",tSina:"\u65b0\u6d6a\u5fae\u535a",
qq:"QQ",msn:"MSN",tQQ:"\u817e\u8baf\u5fae\u535a"},d={site:["t163","tSina","qzone","tQQ","renren","qq","msn","kaixin","douban","bai"],isHideTxt:!1},e=function(a,b,d,e){typeof $.share[b]!="undefined"&&$("<a>",{"class":"NIE-share NIE-share-"+b+(d.isHideTxt?" NIE-share-hideTxt":""),title:c[b]!="undefined"?c[b]:"",href:"javascript:void(0);",target:"_self",text:!d.isHideTxt&&typeof c[b]!="undefined"?c[b]:"",click:a?function(){$.share[b](d)}:function(){$.share.go(d,b)}}).appendTo(e)};$.include("http://res.nie.netease.com/comm/js/util/share.css");
var b=$(b),a=a||{},f;for(f in d)typeof a[f]=="undefined"&&(a[f]=d[f]);$.each(a.site,function(){var c=this.toString();e(c=="qq",c,a,b)})}},shareImg:function(b){var a=$("#NIE-share-img"),b=$(b).find("img");if(b.length>0&&a.length==0){a=$("<div>",{html:"<b>\u5206\u4eab\u5230\uff1a</b><span></span>",id:"NIE-share-img"});a.mouseover(function(){e=!0}).appendTo($(document.body));var c=a.find("span"),d=parseInt(a.css("height")),e=!1;b.hover(function(){e=!0;var b=$(this),g=b.offset(),h=parseInt(b.attr("height"));
c.empty();$.share.appendTo(c,{logType:1,img:b.attr("src"),isHideTxt:!0});a.css({top:isNaN(h)?g.top+10:g.top+h-d-10,left:g.left+10}).show()},function(){e=!1;setTimeout(function(){e==!1&&a.hide()},180)})}},shareTxt:function(b){var a=$("#NIE-share-txt"),b=$(b),c=!1;b.length>0&&($(document.body).click(function(){c&&(c=!1,a.hide())}),b.mouseup(function(b){var e;e="";if(window.getSelection)e=window.getSelection();else if(document.getSelection)e=document.getSelection();else if(document.selection)e=document.selection.createRange().text;
e=$.trim(e);e!=""?(c=!0,a.length==0&&(a=$("<div>",{html:"<b>\u5206\u4eab\u5230\uff1a</b><span></span>",id:"NIE-share-txt"}),a.css({position:"absolute",zIndex:100}).appendTo($(document.body))),a.css({left:b.pageX-50,top:b.pageY+15}).show(),b=a.find("span"),b.empty(),$.share.appendTo(b,{logType:2,isHideTxt:!0,title:e,content:e})):(c=!1,a.hide())}))}}});
