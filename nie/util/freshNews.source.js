/*
����ϵͳ��ǹ���
<a ts="<!--ShowTimeStamp-->" ch="��Ŀ��" href="url����">�ı�</a>
$(function(){
	nie.use(["nie.util.freshNews"],function(){
		var freshNews=nie.util.freshNews();
		freshNews.data//��ǰ���µ��������飺[{link:"url����",txt:"�ı�",channel:"��Ŀ��"}]
	}
});

*/
nie.util.freshNews=nie.util.freshNews||function(obj){		
		var o={
				data:[]
			},
			defaultArgs={
				tsName:"ts",
				newsDom:"a[ts][ch]",
				domain:location.hostname,
				cookieName:"__NIE_freshNews_"+location.pathname.replace(/\//g,"_")			
			},
			urls={};
		for(var i in obj){
			if(typeof defaultArgs[i]!="undefined"){
				defaultArgs[i]=obj[i];
			}
		}
		var cookie=$.cookie(defaultArgs.cookieName),			
			max_ts=cookie_ts=cookie?cookie:0,
			hostPath=location.pathname.split("/"),
			_path="/";
		$(defaultArgs.newsDom).each(function(){			
			var self=$(this),
				ts=self.attr(defaultArgs.tsName);
			if(!isNaN(ts)){
				ts=parseInt(ts);
				var url=self.attr("href");
				if(max_ts<ts) max_ts=ts;
				if(cookie_ts<ts && !urls[url]){	
					urls[url]=true;
					//self.css("text-decoration","underline");
					o.data.push({
						link:url,
						txt:self.text(),
						channel:self.attr("ch")
					});
				}
			}
		});
		urls=null;
		for(var i=1,l=hostPath.length-1;i<l;i++){
			_path+=hostPath[i]+"/";
		}
		//defaultArgs._tmp=_tmp;
		$.cookie(defaultArgs.cookieName,max_ts,{
			expires:7,
			path:_path,
			domain:defaultArgs.domain			
		});
		//o.__=defaultArgs;
		return o;
};