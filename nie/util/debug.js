nie.util.debug={total:0,create:function(){var b={};var d="NIE-debug"+nie.util.debug.total;var c=function(){$("<div>",{id:d,"class":"NIE-debug zoom-big",html:"<h3>"+b.title+'</h3><button class="zoomBtn">��С</button><ol class="content showpass showerror showwarn"></ol><p class="type"><label class="pass"><input type="checkbox" checked="checked" />Pass</label><label class="warn"><input type="checkbox" checked="checked" />Warn</label><label class="error"><input type="checkbox" checked="checked" />Error</label><button class="clear">clear</button></p>'}).appendTo($(document.body))};var a=function(e,g){var f=$("#"+d+" ol.content");f.append($("<li>",{"class":e,html:"<i>"+e.toUpperCase()+":</i>"+g})).scrollTo(f[0].scrollHeight)};b.pass=function(e){a("pass",e)};b.warn=function(e){a("warn",e)};b.error=function(e){a("error",e)};b.title="jQuery mix NIE Debug";b.init=(function(){if(nie.util.debug.total==0){$.include("http://res.nie.netease.com/comm/js/nie/util/debug/base.css")}c();setTimeout(function(){$("#"+d).show().scrollAction({xAlign:"right",yAlign:"bottom"})},100);$("#"+d+" .type button.clear").click(function(){$("#"+d+" ol.content").empty()});$("#"+d+" .type label").each(function(){var e=$(this),f=e.attr("class"),g="debug"+nie.util.debug.total+"-"+f;e.attr("for",g);$("input",e).attr("id",g)}).click(function(){var f=$(this),h=f.attr("class"),g="show"+h,e=$("input",f).attr("checked"),i=$("ol",f.parent().parent());if(e){i.addClass(g)}else{i.removeClass(g)}});$("#"+d+" button.zoomBtn").click(function(){var e=$(this),f=$("#"+d);if(f.hasClass("zoom-small")){f.removeClass("zoom-small").addClass("zoom-big");e.text("��С")}else{f.removeClass("zoom-big").addClass("zoom-small");e.text("�Ŵ�")}})})();return b}};