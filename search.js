// $("#search").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     console.log("keyup")
//     $("#table tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });

//   const searchInput = document.getElementById("search")

//   searchInput?.addEventListener('input', () => {
//     console.log("input")
//   })

//   const search = () => {
//     console.log("input")
//     $("#searchText").keyup(function(){
//         _this = this;
//           $.each($("#searchTable tr"), function() {
//              if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1){
//                  $(this).hide();
//                }else{
//                  $(this).show();
//               }
//           });
//     });
//   } 

$(document).ready(function(){
    $("#searchText").keyup(function(){
        console.log("search")
        console.log("data", customers)

        _this = this;

        $.each($("#searchTable tr"), function() {
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1){
                $(this).hide();
            }else{
                $(this).show();
            }
        });
        
        $.each(customers, function( key, value ) {
            $('searchTable').append(
                '<tr>' +
                    '<td>' + value.name + ' </td>' +
                    '<td>' + value.birthdate +'</td>' +
                '</tr>');
          });
        
          for (var i=0; i<customers.length; i++) {
            console.log("looped", customers[i])
          }

    });
});