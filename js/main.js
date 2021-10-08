$(document).ready(function(){

    ///var city = "Busan";
    var city = []; // 여러가지 도시명을 넣어줄 공간 
    //배열 데이터에서 push(새 데이터) : 마지막 인덱스 자리에 추가 
    //city.push("Seoul"); = > city = ["Seoul"]//
    //city.push("Busan"); = > city = ["Seoul", "Busan"]
    
    //배열 데이터에서 unshift(새 데이터) : 첫번째 인덱스 자리에 추가 
    //city.unshift("Seoul"); => city = ["Seoul"]
    //city.unshift("Busan"); => city = ["Busan", "Seoul"]
    console.log("city");

    var myKey = "57736d85132e58c496d857024751faf9";

    var state_icon = ""; //날씨 아이콘의 이름을 초기 변수로 구성(전역변수) - https://erikflowers.github.io/weather-icons/ 사이트의 날씨 이미지와 매칭되는 클래스명을 담음


    var w_box = `
    <li>
        <div class="top">
            <div class="cur_icon">
                <i class="wi "></i>
            </div>
            <div class="info">
                <p class="temp"><span>온도</span>&nbsp;°C</p>
                <h4>오늘 날씨</h4>
                <p><span class="city">도시명</span></p>
                <p><span class="nation">국가명</span></p>
            </div>
        </div>
        <div class="bottom">
            <div class="wind">
                <i class="wi wi-strong-wind"></i>
                <p><span>0.00</span>&nbsp;m/s</p>
            </div>
            <div class="humidity">
                <i class="wi wi-humidity"></i>
                <p><span>00</span>&nbsp;%</p>
            </div>
            <div class="cloud">
                <i class="wi wi-cloudy"></i>
                <p><span>00</span>&nbsp;%</p>
            </div>
        </div>
    </li>
    `;

    function  w_info(){    
        //$("#weather li").remove(); //모든 li 태그를 제거해라 
        $("#weather ul").empty(); //#weather ul 하위의 모든 요소들을 비워라 
      
        //배열 데이터의 개수를 기준으로 w_box 라는 리스트 항목을 넣어준다. 
        for(i=0; i<city.length; i++){
            $("#weather ul").append(w_box);
        }


        $("#weather li").each(function(index){  // li인덱스 번호 뽑아옴 
            $.ajax({
                url : "https://api.openweathermap.org/data/2.5/weather?q="+city[index]+"&appid="+myKey,
                dataType : "json",
                success : function(data){
                    console.log(data);
                    var temp = Math.round(data.main.temp - 273.15);
                    console.log("현재 온도(°C) : " + temp);

                    var humidity = data.main.humidity;
                    console.log("현재 습도 : " + humidity);

                    var weather = data.weather[0].main;
                    console.log("현재 날씨 : " + weather);

                    var wind = data.wind.speed;
                    console.log("현재 풍속(m/s) : " + wind);

                    var cloud = data.clouds.all;
                    console.log("현재 구름양(%) : " + cloud);
                
                    var nation = data.sys.country;
                    console.log("국가명 : " + nation);

                    var region = data.name;
                    console.log("도시명 : " + region);


                    //텍스트 날씨(weather) 데이터를 이미지 아이콘으로 변경 
                    if(weather == "Clear"){
                        state_icon = "wi-day-sunny";
                    }else if(weather == "Clouds"){
                        state_icon = "wi-cloud";
                    }else if(weather == "Rain"){
                        state_icon = "wi-rain";
                    }else if(weather == "Mist"){
                        state_icon = "wi-fog";
                    }

                    console.log(this); //{url: 'https://api.openweathermap.org/data/2.5/weather?q=New York&appid=57736d85132e58c496d857024751faf9', type: 'GET', isLocal: false, global: true, processData: true, …}
                    //ajax내부에서는 (this)사용 불가능 

                    //$("#weather ul").append(w_box); 제거한다.
                    
                    $("#weather li").eq(index).find(".cur_icon i").addClass(state_icon);
                    $("#weather li").eq(index).find(".temp span").text(temp);
                    $("#weather li").eq(index).find(".info h4").text(weather);
                    $("#weather li").eq(index).find(".info .city").text(region);
                    $("#weather li").eq(index).find(".info .nation").text(nation);
                    $("#weather li").eq(index).find(".wind span").text(wind);
                    $("#weather li").eq(index).find(".humidity span").text(humidity);
                    $("#weather li").eq(index).find(".cloud span").text(cloud);

                }
            });//ajax 종료
        }); //each문 종료

    } //w_info()라는 함수의 종료


    /*
    http(HyperText Transfer Protocol) : 문자 데이터 파일을 주소에 이동시키겠다는 의미
    https(HyperText Transfer Protocol over Secure Socket Layer) : 문자 데이터 파일을 주소에 이동시키겠다는 의미 + 보안 추가(예시, norton security)
    */

    $.getJSON("https://extreme-ip-lookup.com/json", function(data){
        console.log(data);
        city.unshift(data.city);
        w_info();
    });
    //GEO Location : 현재 위치 설정



    $(document).on("click", ".cities button", function(){    
        var $city_txt = $(this).text();
        console.log($city_txt);
        //city.push($city_txt); //클릭한 버튼의 텍스트를 city라는 배열 데이터의 마지막 자리에 위치를 시킨다. => 마지막에 클릭한 버튼의 데이터 정보는 리스트 중에서 맨 마지막에 나온다. 
        city.unshift($city_txt); //클릭한 버튼의 텍스트를 city라는 배열 데이터의 첫번째 자리에 위치를 시킨다. => 마지막에 클릭한 버튼의 데이터 정보는 리스트 중에서 맨 처음에 나온다. 
        console.log(city);
        //$(this).prop("disabled", true);
        $(this).remove(); //내가 클릭한 곳의 버튼을 없앤다. 
        w_info(); // 버튼을 클락하면 함수를 호출한다. 
    });

    function search(){
        var $search_val = $("#search_box").val(); //입력한 값의 value 값을 가져온다. 
        if($search_val.trim() == ""){ //입력한 값이 없거나 공백만 존재할 때 
            alert("검색어를 입력하세요")
        }else{
            city.unshift($search_val);
            w_info();
        }
    }
//$eachList.trim() == ""

    $(".search button").click(function(){
        search()
    });

    $(".search").keypress(function(event){
        console.log(event)
        if(event.keyCode == 31){
            search();
        }
    });


    //"현재 날씨 정보"라는 타이틀을 클릭했을 떄, 새로고침 
    $(".title").click(function(){
        location.reload();
    });


});