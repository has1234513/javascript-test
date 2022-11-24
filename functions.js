
const getCustomerAge = (cus) => {
    return new Date().getFullYear() - parseInt(cus.birthdate.split('-')[0])
}

$(document).ready(function(){

    //loop through customer data

    for (var i=0; i<customers.length; i++) {
        console.log("age", getCustomerAge(customers[i]))
        $('#searchTable').append(   
        '<tr>' +
            '<td>' + customers[i].name + ' </td>' +
            '<td>' + customers[i].birthdate +'</td>' +
        '</tr>');
    }

    //search function

    $("#searchText").keyup(function(){

        const text = $(this).val()

        let newCustomerArray = []

        // hides all table elements

        $.each($("#searchTable tr"), function() {
            if($(this).text().toLowerCase().indexOf(text.toLowerCase()) === -1){
                $(this).siblings().children('td').hide()
            }
        });

        //check ad filter for names

        customers.forEach( c => {
            if ( c.name.toLocaleLowerCase().includes(text.toLowerCase()) ) {
                newCustomerArray.push(c)
            }
        })

        //check and filter for age group

        if (text.includes('-') && parseInt(text.split("-")[0]) !== NaN && parseInt(text.split("-")[1]) !== NaN ) {

            customers.forEach( c => {
                if ( getCustomerAge(c) > parseInt(text.split("-")[0]) && getCustomerAge(c) < parseInt(text.split("-")[1])) {
                    newCustomerArray.push(c)
                }
            })
        }

        //re add elements
        
        for (var i=0; i<newCustomerArray.length; i++) {
            $('#searchTable').append(   
            '<tr>' +
                '<td>' + newCustomerArray[i].name + ' </td>' +
                '<td>' + newCustomerArray[i].birthdate +'</td>' +
            '</tr>');
        }
        
    });

});