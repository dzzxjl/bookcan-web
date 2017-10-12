$.get("http://localhost:8080/booklist",function(data,status){              
              $.each(data, function(i, item){
                  $("#table").append(
                      "<tr>" + 
                      "<td>" + item.bid  + "</td>" + 
                      "<td>" + item.name + "</td>" +
                      "<td>" + item.tag + "</td>" +
                      "</tr>"
                  )
              });
          });