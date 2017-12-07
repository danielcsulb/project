window.onload = function() {

    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm')
    var cancelBtn = document.getElementById('Cancel');
    var AddBtn = document.getElementById('Add');

    var fullname = document.getElementById('fullname');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var city = document.getElementById('city');
    var email = document.getElementById('email');

    var addBookDiv = document.querySelector('.addbook');

    quickAddBtn.addEventListener("click", function() {
        // display the form div
        quickAddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function() {
        quickAddFormDiv.style.display = "none";
    });


    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

    var addressBook = [];


    function jsonStructure(fullname, phone, address, city, email) {
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    function addToBook() {
        var isNull = fullname.value != '' && phone.value != '' && address.value != '' && city.value != '' && email.value != '';
        if (isNull) {
            // format the input into a valid JSON structure
            var obj = new jsonStructure(fullname.value, phone.value, address.value, city.value, email.value);
            addressBook.push(obj);
            localStorage['addbook'] = JSON.stringify(addressBook);
            quickAddFormDiv.style.display = "none";
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e) {
        // Remove an entry from the addressbook
        if (e.target.classList.contains('delbutton')) {
            var remID = e.target.getAttribute('data-id');
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm() {
        var formFields = document.querySelectorAll('.formFields');
        for (var i in formFields) {
            formFields[i].value = '';
        }
    }


    function showAddressBook() {
        if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = '';
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            // Loop over the array addressBook and insert into the page
            addBookDiv.innerHTML = '';
            for (var n in addressBook) {
                var str = '<div class="entry">';
                str += '<th scope="row"> <div class="name">' + addressBook[n].fullname + '</div></th>';
                str += '<td><div class="email">' + addressBook[n].email + '</div></td>';
                str += '<td><div class="phone">' + addressBook[n].phone + '</div></td>';
                str += '<td><div class="address">' + addressBook[n].address + '</div></td>';
                str += '<td><div class="city">' + addressBook[n].city + '</div></td>';
                str += '<td><div class="Edit"><a href="#" class="Editbutton" data-id="' + n + '">Edit</a></div></td>';
                str += '<td><div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div></td>';

                str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();



}