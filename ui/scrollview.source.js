/**
 * the scrolling view
 * @author mrhanta
 * @version 1.0
 */
 
if(!$.scrollview){

	$.scrollview = function(element){
		var elem = $(element);
		if(elem.length==0) return false;
		/**
		 * config
		 * @var string direct: h(����),v(����)
		 * @var bool autoplay
		 */
		var config={
			screen:'.scrollview-screen',
			next:'.scrollview-next',
			prev:'.scrollview-prev',
			content:'.scrollview-content',
			tab:'.scrollview-tab',
			autoplay:true,
			direct:'h',
			time:5000,
			plugin:null,
			onScroll:null
		};
		$.extend(config, arguments[1]||{});
		
		
		var totalWidth=0,pageSize=0,pageCount,pagePos=1;
		var timmer;
		
		function next(){
			if(pagePos+1>pageCount){
				_content.css('left',0);
				pagePos=1;
			}else{
				pagePos=pagePos+1;
			}
			showPage(pagePos);
		}
		
		function prev(){
			if(pagePos-1<=0){
				_content.css('left',-pageSize*(pageCount-1));
				pagePos=pageCount-1;
			}else{
				pagePos=pagePos-1;
			}
			showPage(pagePos);				
		}

		function showPage(p){
			if(p>pageCount || p<1) return false;
			stop();
			_content.animate({'left':-(p-1)*pageSize});
			pagePos = p;
			if(config.autoplay){
				play();
			}
			if(config.onScroll!=null){
				config.onScroll(p);
			}
		}
		
		function play(){
			timmer=setTimeout(next,config.time);
		}
		
		function stop(){
			clearTimeout(timmer);
		}
		
		var _content = elem.find(config.content);
			  _content.children().each(function(){
				totalWidth=totalWidth+parseInt($(this).width())+parseInt($(this).css('paddingLeft'))+parseInt($(this).css('paddingRight'));
			});
			_content.append(_content.html());
			_content.width(totalWidth*2);
		
		pageSize = elem.find(config.screen).width();
		pageCount = Math.ceil(totalWidth/pageSize);
		pageCount = totalWidth%pageSize>pageSize/4?pageCount+1:pageCount;
		
		function run(){
			elem.find(config.prev).click(prev);
			elem.find(config.next).click(next);
			$(window).blur(function(){
				stop();
			}).focus(function(){
				if(config.autoplay){
					play();
				}
			});
			if(config.autoplay){
				play();
			}
		}
		
		if(config.plugin){
			eval('('+config.plugin.toString()+')();');
		}
		run();
	}
}
