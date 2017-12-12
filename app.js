window.onload = function() {

    var quickAddBtn = document.getElementById('QuickAdd');
    var quickAddFormDiv = document.querySelector('.quickaddForm');
    var editFormDiv = document.querySelector('.editForm');
    var contactlistDiv = document.querySelector('.contactlist');

    var cancelBtn = document.getElementById('Cancel');
    var EditCancelbtn = document.getElementById('Cancel1');
    var EditformEditBtn = document.getElementById('Edit1');
    var AddBtn = document.getElementById('Add');
    var EditBtn = document.getElementById('Edit');

    var fullname = document.getElementById('fullname');
    var phone = document.getElementById('phone');
    var address = document.getElementById('address');
    var city = document.getElementById('city');
    var email = document.getElementById('email');

    var Editfullname = document.getElementById('editfullname');
    var Editphone = document.getElementById('editphone');
    var Editaddress = document.getElementById('editaddress');
    var Editcity = document.getElementById('editcity');
    var Editemail = document.getElementById('editemail');

    var addBookDiv = document.querySelector('.addbook');


    quickAddBtn.addEventListener("click", function() {
        // display the form div
        quickAddFormDiv.style.display = "block";
        contactlistDiv.style.display = "none";
        editFormDiv.style.display = "none";



    });

    cancelBtn.addEventListener("click", function() {
        quickAddFormDiv.style.display = "none";
        editFormDiv.style.display = "none";
        contactlistDiv.style.display = "block";
    });

    EditCancelbtn.addEventListener("click", function() {
        quickAddFormDiv.style.display = "none";
        editFormDiv.style.display = "none";
        contactlistDiv.style.display = "block";
    });


    AddBtn.addEventListener("click", addToBook);
    // EditformEditBtn.addEventListener("click", editToBook);

    addBookDiv.addEventListener("click", removeEntry);
    addBookDiv.addEventListener("click", editEntry);


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
            contactlistDiv.style.display = "block";
            // editFormDiv.style.display = "none";
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

    function editEntry() {
        // if (a.target.classList.contains('Editbutton')) {
        editFormDiv.style.display = "block";
        contactlistDiv.style.display = "none";
        // var editID = a.target.getAttribute('data-id');
        // editID.push(editfullname.value, );
        FilleditForm();

    }




    function clearForm() {
        var formFields = document.querySelectorAll('.formFields');
        for (var i in formFields) {
            formFields[i].value = '';
        }
    }

    function FilleditForm() {
        var formFields = document.querySelectorAll('.editformFields');
        for (var i in formFields) {
            formFields[i].value = JSON.stringify[addressBook];
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
                // var str = '<div class="entry">';
                var str = '<tr>';
                str += '<th scope="row"> <div class="name">' + addressBook[n].fullname + '</div></th>';
                str += '<td><div class="email">' + addressBook[n].email + '</div></td>';
                str += '<td><div class="phone">' + addressBook[n].phone + '</div></td>';
                str += '<td><div class="address">' + addressBook[n].address + '</div></td>';
                str += '<td><div class="city">' + addressBook[n].city + '</div></td>';
                str += '<td><div class="Edit"><a href="#" class="Editbutton" data-id="' + n + '">Edit</a></div></td>';
                str += '<td><div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div></td>';
                str += '</tr>';

                // str += '</div>';
                addBookDiv.innerHTML += str;
            }
        }
    }

    showAddressBook();



}