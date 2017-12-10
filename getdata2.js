
var app = angular.module('myApp', []);
// 控制器，映射到ng-controller="siteCtrl"的div块
// app.controller('mycontroller',function($scope, $location) {
//     $scope.myUrl = $location.absUrl();
//     console.log('another controller');

// });

app.controller('siteCtrl', function($scope, $http) {
    $scope.var1 = true;
    // $scope.var2 = true;
    // toggle()用来切换div块状态
    $scope.toggle = function() {
        $scope.var1 = !$scope.var1;
    }

    btnsignin.onclick = function() {
        
        email = formlogin.email.value;
        $scope.email = email;
        password = formlogin.password.value;
        if (email == '' || password == '') {
            return 
        }
        $http({
            method: 'POST',
            params:{
                email:email,
                password:password
            },
            url: 'http://localhost:8080/user/login'
        }).then(function successCallback(response) {
                if(!(response.data)==''){
                $scope.books_bumian = response.data;
                $scope.books = response.data;
                // 定义全局变量books，两种方法均可以将books数据定位到整个网页上
                books = response.data;
                $scope.count = books.length;
                // console.log('books' + books);
                console.log('$scope.books' + $scope.books);
                num_yidu = 0;
                num_xiangdu = 0;
                num_zaidu = 0;
                for(var i = 0; i < books.length; i++) {
                    var status = books[i].status;
                    if (status == 0) {
                        num_yidu++;
                    } else if (status == 1) {
                        num_xiangdu++;
                    } else {
                        num_zaidu++;
                    }
                }
                // num_data设置为全局变量
                num_string = '[{ value:' + num_yidu + ', name:\'已读\'},' + 
                    '{ value:' + num_xiangdu + ', name:\'想读\'},' + 
                    '{ value:' + num_zaidu + ', name:\'在读\'}' + 
                ']';
                // 将字符串转换为json对象
                num_json = eval ("(" + num_string + ")");
                // 初始化图表
                myChart = echarts.init(document.getElementById('echart'));
                // 指定图表的配置项和数据
                option = {
                    title : {
                        text: '读书状态分布图',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['已读','想读','在读']
                    },
                    series : [
                        {
                            name: '',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                myChart.setOption({
                    series: [{
                    data:  num_json
                }]
                });
                // login模块隐藏
                $("#login").hide();
                // main模块显示
                $("#main").show();
                document.getElementById('a_login').innerHTML=email;
                } else {
                    alert("密码错误，请重新输入");
                }

            }, function errorCallback(response) {
                // 请求失败执行代码
        });
    

    /*
    添加图书
    */
    $scope.add = function() {
      var name = myform.name.value;
      var tag = myform.tag.value;
      var status = myform.inlineRadioOptions.value;
      var email = myform.email.value;
      
      if (name == null || name == "") {
         alert("需要输入书名");
         return false;
      } else if (status == null || status == "") {
         alert("需要输入状态");
         return false;
      }     
        $http({
          method: 'GET',
          url: 'http://localhost:8080/addbook?name=' + name + '&status=' + status + '&tag=' + tag + '&email=' + email
        }).then(function successCallback(response) {
                var data = response.data;
                console.log(data);
                if(!data){
                    alert("此书数据库已存在");        
                } else {
                    $scope.books = response.data;
                    $scope.books = data;
                    // 添加book后，及时更新数据
                    books = data;
                    console.log(data);
                    console.log(books);
                    document.getElementById("liid0").className="active";
                    document.getElementById("liid1").className="";
                    document.getElementById("liid2").className="";
                    document.getElementById("liid3").className="";
                }
            }, function errorCallback(response) {
                // 请求失败执行代码
        });
    };

    $scope.btn1 = function(status) {
        var id = 'liid';
        if (status == 3) {
            $scope.books = books;
            id = id + 0;
        } else {
            temp = new Array();
            for(var i = 0; i < books.length; i++) {
                if(books[i].status == status) {
                    temp.push(books[i]);
                }
            }
            $scope.books = temp;            
            if (status == 0) {
                id = id + 1;
            } else if (status == 1) {
                id = id + 2;
            } else {
                id = id + 3;
            }          
        }
        document.getElementById("liid0").className="";
        document.getElementById("liid1").className="";
        document.getElementById("liid2").className="";
        document.getElementById("liid3").className="";
        // 选中的标签为active
        document.getElementById(id).className="active";     
    }

    function shanchu(id) {
        $http({
          method: 'get',
          url: "http://localhost:8080/deletebook?id=" + id
        }).then(function successCallback(response) {
          $scope.books = response.data;
        });
    }
    window.shanchu = shanchu;
    }
});

function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("需要输入名字。");
        return false;
    }
}

function tiaozhuan(id) {
  var url = './book.html?id=' + id;
  window.open(url)
};

function buy(name) {
//   console.log(id);
  var url = 'https://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=亚马逊网站&url=search-alias%3Daps&field-keywords=' + name;
  window.open(url)
};







