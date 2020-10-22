;(function(window,document,$){
    
    var cnt = 0; 
    var setId = 0;
    var setId2 = 0;


        //1 카운트 함수
        function nextSlideCountFn(){
            cnt++;
            mainSlideFn();
        }
        function prevSlideCountFn(){
            cnt--;
            mainSlideFn();
        }
    
        //2 메인슬라이드함수
        function mainSlideFn(){
            //1234
            $('.slide-wrap').stop().animate({ left:-829*cnt }, 600, function(){
                if(cnt>3){ //총 슬라이드 4개 0 1 2 3
                    cnt=0; //첫번째 슬라이드
                }
                if(cnt<0){ //첫번째 미만이면 -1이면
                    cnt=3; //마지막 슬라이드(4개)
                }
                $('.slide-wrap').stop().animate({ left:-829*cnt },0);//초기화 리셋               
            });
            //1234
            pageBtnFn(cnt); //페이지버튼(전달인자) 1 2 3 4
        }


        /////////////////////////////
        //이벤트 리스너 & 이벤트 핸들러
    
        //4-1. 다음 화살 버튼 클릭 이벤트 - 다음 슬라이드 카운트 함수 호출
        $('.next-btn').on({
            click:  function(){ //이벤트 리스너
                if( !$('.slide-wrap').is(':animated') ){
                    nextSlideCountFn(); //이벤트 핸들러
                }
                timerControlFn();            
            }
        });

        //4-2. 이전 화살 버튼 클릭 이벤트 - 이전 슬라이드 카운트 함수 호출
        $('.prev-btn').on({
            click:  function(){
                if( !$('.slide-wrap').is(':animated') ){
                    prevSlideCountFn();
                }
                timerControlFn();
            }
        });

        //4-3 터치 스와이프
        $('.slide-wrap').swipe({
            swipeLeft:function(){ //다음슬라이드
                if( !$('.slide-wrap').is(':animated') ){
                    nextSlideCountFn(); //이벤트 핸들러
                }
                timerControlFn();
            },
            swipeRight:function(){ //이전슬라이드
                if( !$('.slide-wrap').is(':animated') ){
                    prevSlideCountFn();
                }
                timerControlFn();
            }
        });    
         
        //4-4 타이머 카운트 콘트롤
        ///////////////////////////////
        // 타이머 카운트 콘트롤 함수
        // 이벤트 핸들러에 추가 함수
        function timerControlFn(){

            clearInterval(setId);  //버튼 클릭시 타이머 중지
            clearInterval(setId2); //카운트 타이머 중지
            $('.pause-play-btn').addClass('addPlay'); //▶
            t=1; //중지상태임

            var cnt2 = 0;
            setId2 = setInterval(function(){
                cnt2++;
                if(cnt2>10){
                    nextSlideCountFn(); //다음슬라이드 즉시 실행
                    initTimerFn();  //3초후 다음 슬라이드 실행
                    clearInterval(setId2); //자신의 타이머 중지
                    $('.pause-play-btn').removeClass('addPlay'); //||
                    t=0; //실행상태임
                }
            },1000);

        } 

        //5. each() 메서드로 .page-btn 버튼의 요소를 배열처리하여 인덱스번호를 반환(출력)한다.
        $('.page-btn').each(function(index){
            $(this).on({
                click:  function(){
                    cnt=index;     //카운트 번호를 인덱스번호 저장
                    mainSlideFn(); //메인슬라이드 호출
                    clearInterval(setId); //버튼 클릭시 타이머 중지
                    $('.pause-play-btn').addClass('addPlay');
                }
            });
        });

        //6. 인디게이터(페이지버튼)에 표시(배경이미지 녹색)-addClass
        function pageBtnFn(z){ 
            //console.log(z); //1 2 3 4 1 2 3 4 1 2 3 4...
            z>3 ? z=0 : z;
            //console.log(z); //1 2 3 0 1 2 3 0 1 2 3....
            $('.page-btn').removeClass('addPagebtn');
            $('.page-btn').eq(z).addClass('addPagebtn');
        }

        //7. 타이머 3초 간격 다음슬라이드 카운트 함수 호출
        function initTimerFn(){
            setId = setInterval( nextSlideCountFn, 3000);
        }

        setTimeout(initTimerFn, 100); //로딩시 강제 실행 타이머 호출 0.1초 후에 타이머 실행


        //8. 타이머 일시중지 버튼 클릭 이벤트
        /*
        var t=0; //실행상태
        $('.pause-play-btn').on({
            click:   function(){
                    if(t==0){
                        t=1; //중지상태
                        $(this).addClass('addPlay');  //플레이 이미지로 변경
                        clearInterval(setId);  //중지
                    }
                    else if(t==1){
                        t=0; //실행상태
                        $(this).removeClass('addPlay');  //정지 이미지로 변경 
                        timerFn();  //타이머 재실행
                    }
            }
        });
        */

        //8
        //hasClass('addPlay') 있으면 true 없는 false;   
        //클래스가 있으면  중지상태임, ▶
        //클래스가 없으면  플레이상태임, ||
        $('.pause-play-btn').on({
            click:   function(){
                var x = null;
                    x = $(this).hasClass('addPlay'); //true(1) || false(0)
                    if( x==false ){ //현재 재생 중인 상태이면
                            clearInterval(setId);
                            $(this).addClass('addPlay'); //▶
                    }
                    else if( x==true ){ //현재 중지상태임 ▶ 다시 플레이
                            //nextSlideCountFn(); //++ 다음을 즉시 실행
                            timerFn();  //플레이
                            $(this).removeClass('addPlay'); //||
                    }
            }
        });




})(window,document,jQuery);