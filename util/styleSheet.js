$.extend({styleSheet:{add:function(f,e,c){var d=document.createElement("style");if(c&&c.media){d.media=c.media}d.type="text/css";d.setAttribute("name",e);document.getElementsByTagName("head")[0].appendChild(d);var b=document.styleSheets[document.styleSheets.length-1];if(b.addRule){for(var a in f){b.addRule(a,f[a])}}else{if(b.insertRule){for(var a in f){b.insertRule(a+"{"+f[a]+"}",b.cssRules.length)}}}}}});