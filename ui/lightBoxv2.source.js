/**
 * LightBox v2
 * by Lokesh Dhakar - https://github.com/lokesh/lightbox2
 * modify Govo - http://res.nie.netease.com/comm/js/ui/lightBox.source.js
 *modify Mr.F - http://res.nie.netease.com/comm/js/ui/lightBoxv2.source.js
 *
 * - lightBox ��� NIE�� �ڶ���
 * - �˲����Lokesh Dhakar��������Govo�޸ĳ�ʹ��NIE�ĵ�һ���汾����Mr.F��ԭ�л����Ͻ����Ż�
 *
 * ����������ܣ�
 * 1����ȡ��ͼ����ʾ
 * 2����ȡСͼ������ʾ
 * 3�����̿��������л�
 * 4�������Ӵ��仯���仯λ��
 * 5��Ԥ���ش�ͼ
 *
 * 2014.4�Ż���¼ - �ڴ�ͼ�ײ������СͼԤ������ȥ�����ظ�����lightbox domЧ������ȡ��سߴ���������¶��壬�����޸�lightBox����ʽ
 *
 * ע�⣺lightboxЧ���е�a��ǩ�Ĵ�ͼ��ַһ��Ҫÿ�Ŷ���һ��
 *
 *
 * //����1
 *	$('#gallery a').lightBox();
 *
 * //����2
 *	$(".article a[href*='tu/']").lightBox({
*			txtFirst:				'���ǵ�һ��',
*			txtLast:				'�������һ��',
*			txtNext:				'����鿴��һ��',
*			txtPrev:				'����鿴��һ��',
*			overlayBgColor:	'#000',				//�ڵ������ɫ
*			overlayOpacity:	0.8,					//�ڵ����͸����
*			containerResizeSpeed:	400			//ͼƬ���������춯���ٶ�
*		});
 */


//����lightbox�����css�ļ�
$.include("http://res.nie.netease.com/comm/js/ui/lightBox/basev2.css");

//Jquery�����ʼ
(function($) {
    $.fn.lightBox = function(settings){
        var opt = {
            overlayBgColor: 		'#000',                    //(string) �ɰ���ɫRGBֵ
            overlayOpacity:			0.8,                     //(integer) �ɰ�͸����
            containerResizeSpeed:	400,                //(integer) �ɰ�任�ٶ�
            txtFirst:				'���ǵ�һ��',                  // (string) ��ʾ����
            txtLast:				'�������һ��',               // (string) ��ʾ����
            txtNext:				'����鿴��һ��',        // (string) ��ʾ����
            txtPrev:				'����鿴��һ��',        // (string) ��ʾ����
            imageArray:				[],                        // (Array) ��ͼ����
            imageThumbArrary: [],                          // (Array) Сͼ����
            activeImage:			0
        }
        settings = settings || {};
        opt = $.extend(opt, settings);

        var imgMatchObject = this, //�������lightBoxЧ���Ľڵ�
            imgThumbMatchObject = this.find('img'); //����µ�imgͼƬ

        /**
         * ��ʼ��������ÿ�ʼ����
         *
         * @return boolean false
         */
        function _initialize() {
            _start(this,imgMatchObject,imgThumbMatchObject); // ��ʼ���Ч��
            return false; // ��ֹ�����ֱ�ӵ㿪����
        }
        /**
         * ����lightBox���
         *
         * @param object objClicked �û�������Ľڵ�
         * @param object imgMatchObject ����ƥ��Ľڵ�
         * @param object imgThumbMatchObject ����ƥ��Ľڵ��µ�Сͼ
         */
        function _start(objClicked,imgMatchObject,imgThumbMatchObject) {
            //���õ���
            _set_interface();
            // ��������
            opt.imageArray.length = 0;
            // ���ü����ͼƬ
            opt.activeImage = 0;
            //���Ƿ�Ϊ����ͼƬ�����
            if ( imgMatchObject.length == 1 ) {
                opt.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
            } else {
                // ����ͼƬ��СͼƬ��ӵ���Ӧ������
                for ( var i = 0; i < imgMatchObject.length; i++ ) {
                    opt.imageArray.push(new Array(imgMatchObject[i].getAttribute('href'),imgMatchObject[i].getAttribute('title')));
                }
            }
            while ( opt.imageArray[opt.activeImage][0] != objClicked.getAttribute('href') ) {
                opt.activeImage++;
            }
            // ���ú���չʾͼƬ
            _set_image_to_view();
        }
        /**
         * ����lightBoxЧ������Ҫ��html���룬��������
         *
         <div id="jquery-overlay" ></div>
         <div id="jquery-lightbox" >

         <div id="lightbox-container-image-box">
         <a href="javascript:void(0)" id="lightbox-secNav-btnClose"></a>
         <div id="lightbox-container-image">
         <img id="lightbox-image" src="fenxiang.jpg" style="display: inline;">
         <div id="lightbox-nav">
         <a href="#" id="lightbox-nav-btnPrev" class=""  title="����鿴��һ��"></a>
         <a href="#" id="lightbox-nav-btnNext" title="����鿴��һ��" ></a>
         </div>
         <div id="lightbox-loading" ><a href="#" id="lightbox-loading-link"></a></div>
         </div>
         </div>

         <div id="lightbox-container-image-data-box" >
         <div id="lightbox-container-image-data">
         <div id="lightbox-image-details">
         <span id="lightbox-image-details-caption" ></span>
         <span id="lightbox-image-details-currentNumber" >ͼƬ 2 �� 7</span>
         </div>
         </div>
         <div id="lightbox-container-image-thumb-data">
         <ul>
         <li><a href="#"><img src=""></a></li>
         </ul>
         </div>
         </div>

         </div>
         *
         */
        function _set_interface() {
            var appendDOM ='<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><a href="javascript:void(0)" id="lightbox-secNav-btnClose"></a><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div></div><div id="lightbox-container-image-thumb-data"><ul></ul></div></div></div></div>';
            if($('#jquery-lightbox').length == 0){
                $('body').append(appendDOM);
                // ��СͼƬ��ӵ���Ӧ������
                for ( var i = 0; i < imgMatchObject.length; i++ ) {
                    opt.imageThumbArrary.push(new Array(imgMatchObject[i].getAttribute('href'),imgMatchObject[i].getAttribute('title'),imgThumbMatchObject[i].getAttribute('src')));
                }
                for(var j = 0;j<opt.imageThumbArrary.length;j++){
                    $('#lightbox-container-image-thumb-data').find('ul').append('<li><a href="'+opt.imageThumbArrary[j][0]+'" title="'+opt.imageThumbArrary[j][1]+'"><img src="'+opt.imageThumbArrary[j][2]+'"/></a></li>')
                }
                $('#lightbox-container-image-thumb-data').find('ul').css('width',opt.imageThumbArrary.length*140)
            }
            $('#lightbox-container-image-thumb-data').find('a').unbind('click').click(_initialize);
            // �õ���سߴ�
            var arrSizes = ___getSize();
            //�����ɰ�
            $('#jquery-overlay').css({
                backgroundColor:	opt.overlayBgColor,
                opacity:			opt.overlayOpacity,
                height:				arrSizes[0]
            }).show();
            //��������
            var pop = $('#jquery-lightbox');
            pop.height()>arrSizes[1]?pop.fadeIn().css({top:	arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]}) : pop.fadeIn().css({top:(arrSizes[1]-pop.outerHeight())/2+arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]})
            // �رյ���
            $('#lightbox-secNav-btnClose').click(function() {
                _finish();
                return false;
            });
            // �Ӵ���������仯�����¶�λ����λ��
            $(window).resize(function() {
                // �õ���سߴ�
                var arrSizes = ___getSize();
                //�����ɰ�
                $('#jquery-overlay').css({
                    backgroundColor:	opt.overlayBgColor,
                    opacity:			opt.overlayOpacity,
                    height:				arrSizes[0]
                });
                //��������
                var pop = $('#jquery-lightbox');
                pop.height()>arrSizes[1]?pop.css({top:	arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]}) : pop.css({top:(arrSizes[1]-pop.outerHeight())/2+arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]})
            })

        }
        /**
         * ׼��ͼƬչʾ����ͨ������ͼƬ�ߴ���Ԥ�ȹ����ͼƬ������
         *
         */
        function _set_image_to_view() {
            //��ʾ����ͼƬ�е�ͼƬ
            $('#lightbox-loading').show();
            //ͼƬԤ���س���
            var objImagePreloader = new Image();
            objImagePreloader.onload = function() {
                $('#lightbox-image').attr('src',opt.imageArray[opt.activeImage][0]);
                //��ʾͼƬ
                _show_image();
                //	���onload
                objImagePreloader.onload=function(){};
                //����ͼƬ���õ���ߴ�
                var arrSizes = ___getSize();
                var pop = $('#jquery-lightbox');
                pop.height()>arrSizes[1]?pop.css({top:	arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]}) : pop.css({top:(arrSizes[1]-pop.outerHeight())/2+arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]})
                //�Ӵ��仯ʱ���¶���ߴ�
                $(window).resize(function() {
                    // �õ���سߴ�
                    var arrSizes = ___getSize();
                    //�����ɰ�
                    $('#jquery-overlay').css({
                        backgroundColor:	opt.overlayBgColor,
                        opacity:			opt.overlayOpacity,
                        height:				arrSizes[0]
                    });
                    //��������
                    var pop = $('#jquery-lightbox');
                    pop.height()>arrSizes[1]?pop.css({top:	arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]}) : pop.css({top:(arrSizes[1]-pop.outerHeight())/2+arrSizes[3], left:	(arrSizes[2]-pop.width())/2+arrSizes[4]})

                })
            }
            objImagePreloader.src = opt.imageArray[opt.activeImage][0];
        }
        /**
         * չʾԤ���غõ�ͼƬ
         *
         */
        function _show_image() {
            //����ͼƬԤ���ص�
            $('#lightbox-loading').hide();
            $('#lightbox-image').fadeIn(function() {
                _show_image_data();
                _set_navigation();
            });
            _preload_neighbor_images();
        };
        /**
         * չʾͼƬ��Ϣ
         *
         */
        function _show_image_data() {
            $('#lightbox-image-details-caption').hide();
            if ( opt.imageArray[opt.activeImage][1] ) {
                $('#lightbox-image-details-caption').html(opt.imageArray[opt.activeImage][1]).show();
            }
            // ��ʾͼƬ��������Ϣ
            if ( opt.imageArray.length > 1 ) {
                $('#lightbox-image-details-currentNumber').html( ' <em id="lightbox-image-current-num">' + ( opt.activeImage + 1 ) + ' </em>/<em id="lightbox-image-amount-num">'  + opt.imageArray.length+'</em>').show();
            }
        }
        /**
         * ��ʾ��ذ�ť
         *
         */
        function _set_navigation() {
            $('#lightbox-nav').show();

            var _action_Navigation_Go=function(mark){
                $('#lightbox-nav-btn'+mark)
                    .show()
                    .unbind()
                    .removeClass('lightbox-nav-close')
                    .attr('title',opt['txt'+mark])
                    .bind('click',function() {
                        (mark=="Prev")?opt.activeImage--:opt.activeImage++;
                        _set_image_to_view();
                        return false;
                    });
            };
            var _action_Navigation_End=function(mark){

                $('#lightbox-nav-btn'+mark)
                    .show()
                    .unbind()
                    .addClass('lightbox-nav-close')
                    .attr('title',opt['txt'+(mark=='Prev'?'First':'Last')])
                    .bind('click',function(){
                        _finish();
                        return false;
                    });

            };
            if(opt.imageArray.length>1){
                // ������ǵ�һ�ţ���ʾ��һ�Ű�ť
                if ( opt.activeImage != 0) {
                    _action_Navigation_Go('Prev');
                }else{
                    _action_Navigation_End('Prev');
                }

                // ����������һ�ţ���ʾ��һ�Ű�ť
                if ( opt.activeImage != (opt.imageArray.length -1 ) ) {
                    _action_Navigation_Go('Next');
                }else{
                    _action_Navigation_End('Next');
                }
            }

        }
        function _preload_neighbor_images() {
            if ( (opt.imageArray.length -1) >opt.activeImage ) {
                objNext = new Image();
                objNext.src = opt.imageArray[opt.activeImage + 1][0];
            }
            if ( opt.activeImage > 0 ) {
                objPrev = new Image();
                objPrev.src = opt.imageArray[opt.activeImage -1][0];
            }
        }
        /**
         * ��ô��ڳߴ�
         *
         * @return Array ����ҳ���ȣ��߶Ⱥ��Ӵ���ȣ��߶�
         */
        function ___getSize() {
            var dh = $(document).height(),
                wh = $(window).height(),
                ww = $(window).width(),
                st = $(window).scrollTop(),
                sl = $(window).scrollLeft();
            arraySize = new Array(dh,wh,ww,st,sl);
            return arraySize;
        }
        /**
         * �رյ���
         *
         */
        function _finish() {
            $('#jquery-lightbox').fadeOut();
            $('#jquery-overlay').fadeOut();
        }
        //���ض��������. ����󶨵ķ�����Ϊ�˱������������ظ�����
        return this.unbind('click').click(_initialize);
    }
})(jQuery)