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
        
    });

    
    
    for (var i=0; i<customers.length; i++) {
        console.log("looped", customers[i])
    
        $('#searchTable').append(
        '<tr>' +
            '<td>' + customers[i].name + ' </td>' +
            '<td>' + customers[i].birthdate +'</td>' +
        '</tr>');
    }

});