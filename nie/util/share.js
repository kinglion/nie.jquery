nie.util.share_traceCome=nie.util.share_traceCome||false;nie.util.share_css=nie.util.share_css||false;(function(a){nie.util.share=nie.util.share||function(){var h="javascript:;",i=function(l,m){return typeof l!="undefined"?l:m},g=function(l){a(new Image()).bind("readystatechange",function(){if(this.readyState=="complete"){return}}).bind("abort",function(){return}).attr("src",l)},f=function(n,p,o,m){var l=b.args[n]!=null?b.args[n]:o;if(l==""){return l}else{if(n=="url"){l=e(l,p)}return encodeURIComponent(l+(typeof m!="undefined"?m:""))}},j=function(n){var l=[];for(var m in n){l.push(m+"="+n[m])}return l},d=function(m){var l=["product="+b.args.product,"id="+m,"type="+b.args.traceType];g("http://click.ku.163.com/share.v2.gif?"+l.join("&"))},c=function(l){var m=document.createElement("div");m.innerHTML='<a href="'+l.replace(/"/g,"%22")+'"/>';return m.firstChild},e=function(n,r){var m=n.match(b.args.urlReg);if(m){return n.replace(m[0],m[1]+[r,b.args.product,b.args.traceType].join(","))}else{var l=c(n),p=l.search+(l.search==""?"?":"&")+"nieShare="+[r,b.args.product,b.args.traceType].join(","),q=/^\//.test(l.pathname)?l.pathname:"/"+l.pathname,o=l.port==80?l.hostname:l.host;return l.protocol+"//"+o+q+p+l.hash}},k=function(m){if(b.data[m]){var q=b.data[m],s=f("url",m,location.href),t=f("title",m,document.title),u=f("img",m,""),r=f("content",m,document.title),v=m==22?[460,380]:[650,500],n=j({width:v[0],height:v[1],top:(screen.height-v[1])/4,left:(screen.width-v[0])/2,toolbar:"no",menubar:"no",scrollbars:"no",resizable:"yes",location:"no",status:"no"});for(var p in q.paramName){var o="";switch(parseInt(p)){case 1:o=s;break;case 2:o=m==5?t+s:t;break;case 3:o=u;break;case 4:o=r;break;case 5:o=encodeURIComponent(nie.util.siteName());break}q.params[q.paramName[p]]=o}var l="http://"+q.file+"?"+j(q.params).join("&");window.open(l,"_blank",n.join(","));d(m)}},b={data:{},args:{panelID:"NIE-share-panel",fat:"#NIE-share",product:nie.config.site,imgs:null,txt:null,type:1,traceType:null,imgSize:[100,100],defShow:[22,1,2,3],defShow2:[22,1,2,3,8,4],moreShow:[22,5,1,2,3,4,6,7,8,9,10,11,13],searchTips:"\u8f93\u5165\u7f51\u7ad9\u540d\u6216\u62fc\u97f3\u7f29\u5199",sideBar_top:100,title:null,url:null,img:null,content:null,urlReg:new RegExp("([&?]nieShare=)(\\d+),([^,]+),(\\d+)")},addBtn:function(n,u,r,l,o,x){var m="",s="",n=parseInt(n),B="\u5206\u4eab\u5230",p="",w="",z=0,y=16;switch(i(x,b.args.type)){case 1:z=-(u-16+(n+1)*6+(n+1)*16);break;case 2:z=n==22?-160:-n*32;y=32;break;case 3:z=-(u-16+(n+1)*6+(n+1)*16);break}var q="background-position:"+r+"px "+z+"px";if(o==true){m=b.data[n].name;s=B+m;w=q}else{if(o==false){s=B+b.data[n].name;p="<img width="+y+" height="+y+" src='http://res.nie.netease.com/comm/blank.gif' style='"+q+"'>"}else{m=o;w=q}}var v={index:n,"class":b.args.type==6?"NIE-share":"",style:w,href:h,title:s,target:"_self"};if(p==""){v.text=m}else{v.html=p}var A=a("<a>",v).appendTo(l);(function(){var t=n;A.click(function(){k(t)}).hover(function(){a(this).addClass("NIE-share-btn-hover"+t)},function(){a(this).removeClass("NIE-share-btn-hover"+t)})})();return A},addPanel:function(){var m=a("<div>",{id:b.args.panelID,html:"<h3>\u5206\u4eab\u5230...</h3><input type=text value='"+b.args.searchTips+"'/><div></div>"}).hide().appendTo(a(document.body));a("<button>").click(function(){m.hide()}).hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")}).appendTo(m);var l=m.find("div");for(var n in b.data){b.addBtn(n,12,5,l,true,1)}m.find("input").click(function(){var o=a(this),p=o.val();if(p==b.args.searchTips){o.val("")}}).keyup(function(){var o=a(this).val().toLowerCase();l.find("a").each(function(){var p=a(this),q=p.attr("index");if(b.data[q].name.toLowerCase().indexOf(o)!=-1||b.data[q].searchTxt.toLowerCase().indexOf(o)!=-1||b.data[q].searchTxt.replace(/[a-z]/g,"").toLowerCase().indexOf(o)!=-1){p.show()}else{p.hide()}})})},showPanel:function(){var o="#"+b.args.panelID,n=a(o),m=a(window);if(n.length==0){b.addPanel()}n=a(o);var l=m.scrollTop()+(m.height()-n.height())/2;n.css({top:l<0?0:l,left:(m.width()-n.width())/2}).show().find("a").show()},render:function(){var t=b.args.type;if(b.args.traceType==null){b.args.traceType=t}if(t==1||t==2){var L=a(b.args.fat);if(L.length>0){var w=a("<span>",{"class":"NIE-share NIE-share"+t,html:"<span class='NIE-share-txt'>\u5206\u4eab\u5230:</span>"}).appendTo(L),n=a("<span>",{"class":"NIE-share-iconBtn"}).appendTo(w);if(a.browser.webkit){n.css("fontSize",t==2?"41px":"20px")}a.each(b.args.defShow,function(p){b.addBtn(this,16,0,n,false)});var B=true,m,x=a("<span>",{html:"<em>\u66f4\u591a</em>","class":"NIE-share-more"}).mouseenter(function(){clearTimeout(m);B=true;var O=a(window),M=a(this).children("span"),N=M.outerHeight(),p=M.outerWidth(),P=w.offset();M.css({top:O.scrollTop()+O.height()<P.top+N+20?-N-12:4,left:O.scrollLeft()+O.width()<P.left+w.width()+p?-p+42:0}).fadeIn("fast")}).mouseleave(function(){clearTimeout(m);B=false;m=setTimeout(function(){if(!B){q.fadeOut("fast")}},500)}).appendTo(w),q=a("<span>").appendTo(x);a.each(b.args.moreShow,function(){b.addBtn(this,12,5,q,true,1)});b.addBtn(-1,12,5,q,"\u66f4\u591a...",1).click(function(){q.fadeOut("fast");b.showPanel()})}}else{if(t==3){var s="NIE-share-sideBar",A=false,v=false,K=500,m,I=a("<div>",{id:s,html:"<div><b></b><span><button></button><h3>\u5206\u4eab\u5230...</h3><p></p></span></div>",mouseleave:function(){if(A){clearTimeout(m);v=false;m=setTimeout(function(){if(!v){I.animate({width:30},K);u.animate({right:-120},K,function(){A=false})}},K*2)}},mouseenter:function(){if(A){clearTimeout(m);v=true}}}).appendTo(a(document.body)),H=I.find("p"),u=I.find("div"),z=function(){I.css("top",a(window).scrollTop()+b.args.sideBar_top)};a.each(b.args.moreShow,function(){b.addBtn(this,12,5,H,true,1)});b.addBtn(-1,12,5,H,"\u66f4\u591a...").click(function(){b.showPanel()});I.find("b").hover(function(){if(!A){A=true;I.animate({width:150},K);u.animate({right:0},K)}});I.find("button").click(function(){u.animate({right:-150},K,function(){I.remove()})}).hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")});if(a.browser.msie&&a.browser.msie<=6){a(window).scroll(z);z()}else{I.css({position:"fixed",top:b.args.sideBar_top})}}else{if(t==4&&b.args.imgs){var s="NIE-share-img",E=a("#"+s),o=E.length>0,C,y=500,G=a(b.args.imgs),J=false,D=function(p){return b.args.imgSize[0]<p.outerWidth()&&b.args.imgSize[1]<p.outerHeight()};G.hover(function(){var p=a(this),M=p.outerHeight(),Q=p.offset(),N=10,P=a(window),O=E.outerHeight();if(D(p)){clearTimeout(C);J=true;b.args.img=c(p.attr("src")).href;E.find(".NIE-share-more>span").hide();E.css({top:Q.top+M>P.scrollTop()+P.height()?Q.top+N:Q.top+M-N-O,left:Q.left+N}).show()}},function(){var p=a(this);if(D(p)){J=false;clearTimeout(C);C=setTimeout(function(){if(!J){E.hide()}},y)}});b.args.defShow=b.args.defShow2;if(!o){E=a("<div>",{id:s,mouseenter:function(){clearTimeout(C);J=true},mouseleave:function(){J=false;clearTimeout(C);C=setTimeout(function(){if(!J){E.hide()}},y)}}).appendTo(a(document.body));b.args.type=1;b.args.fat=E;arguments.callee()}}else{if(t==5&&b.args.txt){var s="NIE-share-txt",E=a("#"+s),o=E.length>0,r=false,F=a(b.args.txt),l=function(){var p="";if(window.getSelection){p=window.getSelection()}else{if(document.getSelection){p=document.getSelection()}else{if(document.selection){p=document.selection.createRange().text}}}return a.trim(p)};b.args.defShow=b.args.defShow2;if(!o){E=a("<div>",{id:s}).appendTo(a(document.body));F.mouseup(function(p){setTimeout(function(){var M=a.trim(l());if(r&&M!=""){b.args.content=b.args.title=M;E.css({top:p.pageY+15,left:p.pageX-50}).show()}else{E.hide()}},100)}).mouseleave(function(){r=false}).mouseenter(function(){r=true});a(document.body).mouseup(function(){if(!r&&a.trim(l())==""){E.hide()}});b.args.type=1;b.args.fat=E;arguments.callee()}}else{if(t==6){a.each(b.args.defShow,function(){b.addBtn(this,16,0,b.args.fat,true,1)})}}}}}}};b.init=function(){if(location.search!=""&&!nie.util.share_traceCome){var o=location.search.match(b.args.urlReg);if(o){nie.util.share_traceCome=true;g("http://click.ku.163.com/share.income.gif?"+["id="+o[2],"product="+o[3],"type="+o[4],"_r="+new Date().getMilliseconds()].join("&"))}}var s=[[22,"\u6613\u4fe1","YiXin","news.163.com/special/yixin-share/",{1:"url",2:"title",3:"image",4:"desc"},{source:encodeURIComponent("\u7f51\u6613\u6e38\u620f")}],[1,"QQ\u7a7a\u95f4","QQKongJian","sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",{1:"url",2:"title",3:"pics",4:"desc"}],[2,"\u65b0\u6d6a\u5fae\u535a","XinLangWeiBo","v.t.sina.com.cn/share/share.php",{1:"url",2:"title",3:"pic"},{c:"nie",content:"gb2312",source:"nie"}],[3,"\u817e\u8baf\u5fae\u535a","TengXunWeiBo","v.t.qq.com/share/share.php",{1:"url",2:"title",3:"pic"}],[4,"\u817e\u8baf\u670b\u53cb","TengXunPengYou","sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",{1:"url",2:"title",3:"pics",4:"desc"},{to:"pengyou"}],[5,"\u7f51\u6613\u5fae\u535a","WangYiWeiBo","t.163.com/article/user/checkLogin.do",{1:"link",2:"info",3:"images",5:"source"},{check1stImg:true,togImg:true,key:"OELT16LMxo0rAmtO"}],[6,"\u641c\u72d0\u5fae\u535a","SouHuWeiBo","t.sohu.com/third/post.jsp",{1:"url",2:"title",3:"pic"},{content:"utf-8"}],[7,"\u5f00\u5fc3\u7f51","KaiXinWang","www.kaixin001.com/repaste/share.php",{1:"rurl",2:"rtitle",4:"rcontent"}],[8,"\u4eba\u4eba\u7f51","RenRenWang","share.renren.com/share/buttonshare.do",{1:"link",2:"title"}],[9,"\u641c\u72d0\u767d\u793e\u4f1a","SouHuBaiSheHui","bai.sohu.com/share/blank/add.do",{1:"link",2:"title"}],[10,"\u6dd8\u6c5f\u6e56","TaoJiangHu","share.jianghu.taobao.com/share/addShare.htm",{1:"url",2:"title",4:"content"}],[11,"\u8c46\u74e3","DouBan","www.douban.com/recommend/",{1:"url",2:"title",3:"image"}],[13,"\u767e\u5ea6Hi","BaiDuHi","apps.hi.baidu.com/share/",{1:"url",2:"title",4:"content"}],[14,"\u767e\u5ea6\u8d34\u5427","BaiDuTieBa","tieba.baidu.com/i/app/open_share_api",{1:"link"}],[15,"\u767e\u5ea6\u641c\u85cf","BaiDuShouChang","cang.baidu.com/do/add",{1:"iu",2:"it",4:"dc"},{fr:"ien"}],[16,"\u996d\u5426","FangFou","fanfou.com/sharer",{1:"u",2:"t",4:"d"}],[17,"MSN","Msn","profile.live.com/badge",{1:"url",2:"title",3:"screenshot",4:"description"},{wa:"wsignin1.0"}],[18,"\u5929\u6daf\u793e\u533a","TianYaSheQu","share.tianya.cn/openapp/restpage/activity/appendDiv.jsp",{1:"ccUrl",2:"ccTitle",4:"ccBody"}],[19,"\u51e4\u51f0\u7f51\u5fae\u535a","FengHuangWangWeiBo","t.ifeng.com/interface.php",{1:"sourceUrl",2:"title",3:"pic"},{_c:"share",_a:"share"}],[20,"139\u8bf4\u5ba2","139ShuoKe","shequ.10086.cn/share/share.php",{1:"tourl",2:"title"}],[21,"\u68a6\u5e7b\u4eba\u751f","MengHuanRenSheng","dream.163.com/share/link/",{1:"url",2:"title",4:"content"}]];if(!nie.util.share_css){a.include("http://res.nie.netease.com/comm/js/nie/util/share/share.v2.css");nie.util.share_css=true}var n=arguments;if(n.length>0&&n[0].length>0){var q=n[0][0];for(var p in q){if(typeof q[p]!="undefined"){b.args[p]=q[p]}}}for(var p=0,m=s.length;p<m;p++){var r=s[p];b.data[r[0]]={name:r[1],searchTxt:r[2],file:r[3],paramName:r[4],params:i(r[5],{})}}b.render()}(arguments);return b}})(jQuery);
