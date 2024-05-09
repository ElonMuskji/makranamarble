console.log("api wali file")
elements = document.getElementsByClassName('child');
console.log(elements)



function reducestocksubmit(element){

  console.log("reduce fired" + element.id)
}
function addstocksubmit(element){

  console.log("Add fired" + element.id)
}


function myAdd(element) {
    console.log("Button clicked!"+element.id);
    id = element.id
    fetch(`/getstockdetailbyid?id=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // This parses the JSON returned by the server
    })
    .then(data => {
      // Work with the data here
      // console.log("hereis"+data);
      var modaltoshow = new bootstrap.Modal(document.getElementById('editstockform'));
    modaltoshow.show()
    editmodal = document.getElementById("editform")
    editmodal.innerHTML= `
    
    <form id="editformform" enctype="multipart/form-data">
          <div class="mb-3 mt-3">
            <label for="sname" class="form-label">Stock Name</label>
            <input type="text"  class="form-control" id="sname" placeholder="Enter Stock Name" name="sname" value="${data['sname']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="brand" class="form-label">Brand Name</label>
            <input type="text" class="form-control" id="brand" placeholder="Enter Brand Name" name="brand" value="${data['brand']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="size" class="form-label">Size</label>
            <input type="text" class="form-control" id="size" placeholder="Enter Size" name="size" value="${data['size']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="category" class="form-label">Category</label>
            <input type="text" class="form-control" id="category" placeholder="Enter Category" name="category" value="${data['category']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="weight" class="form-label">Weight</label>
            <input type="text" class="form-control" id="weight" placeholder="Enter Weight" name="weight" value="${data['weight']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="pcsperbox" class="form-label">PCS per box</label>
            <input type="number" class="form-control" id="pcsperbox" placeholder="Enter PCS per box" name="pcsperbox" value="${data['pcsperbox']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="sqrft" class="form-label">Squre ft</label>
            <input type="text" class="form-control" id="sqrft" placeholder="Enter Squre ft" name="sqrft" value="${data['sqrft']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="unit" class="form-label">Unit</label>
            <input type="text" class="form-control" id="unit" placeholder="Enter Unit" name="unit" value="${data['unit']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="godam1" class="form-label">Available at Godam 1</label>
            <input type="number" class="form-control" id="godam1" placeholder="Enter Available at godam 1" name="godam1" value="${data['godam1']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="addgodam1" class="form-label">Add at Godam 1</label>
            <input type="number" class="form-control" id="addgodam1" placeholder="Add at godam 1" name="addgodam1">
          </div>
          <div class="mb-3 mt-3">
            <label for="godam2" class="form-label">Available at Godam 2</label>
            <input type="number" class="form-control" id="godam2" placeholder="Enter Available at godam 2" name="godam2" value="${data['godam2']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="addgodam2" class="form-label">Add at Godam 2</label>
            <input type="number" class="form-control" id="addgodam2" placeholder="Enter Add at godam 2" name="addgodam2">
          </div>
          <div class="mb-3 mt-3">
            <label for="color" class="form-label">Color</label>
            <input type="text" class="form-control" id="color" placeholder="Enter Color" name="color" value="${data['color']}" readonly>
          </div>
          
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" id="${id}" onclick="addstocksubmit(this)">Add Stock</button>
        </form>
    
    `
    document.getElementById("editformform").addEventListener("submit", function(event) {
      // Prevent the default form submission
      event.preventDefault();
      const formData = new FormData(document.getElementById("editformform"));
      const formDataObject = Object.fromEntries(formData.entries());
      userkey=document.getElementById("userkey").innerHTML
      console.log(formDataObject.sname + "is here" +userkey+ id)
      if (formDataObject.addgodam1==""){
        formDataObject.addgodam1=0
      }
      if (formDataObject.addgodam2==""){
        formDataObject.addgodam2=0
      }
      godam1=parseInt(formDataObject.godam1)+parseInt(formDataObject.addgodam1)
      godam2=parseInt(formDataObject.godam2)+parseInt(formDataObject.addgodam2)
      
      editgodam1=formDataObject.addgodam1
      editgodam2=formDataObject.addgodam2
      
      urltoupdate=`/actioneditstockapi?id=${id}&userkey=${userkey}&godam1=${godam1}&godam2=${godam2}&act=add&editgodam1=${editgodam1}&editgodam2=${editgodam2}    
      `
      fetch(urltoupdate)
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Use the data returned from the API
    Swal.fire({
      title: "Stock Added",
      text: "Stock Added Successfully!",
      icon: "success"
    });
    // You can manipulate the data or update your UI here
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem fetching the data:', error);
  });
      // Handle the form submission here
      
    });
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  





    
    editmodal = document.getElementById("editstockform")

    // You can add more functionality here
}
function myreduce(element) {
  console.log("Button clicked!"+element.id);
    id = element.id
    fetch(`/getstockdetailbyid?id=${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // This parses the JSON returned by the server
    })
    .then(data => {
      // Work with the data here
      // console.log("hereis"+data);
      var modaltoshow = new bootstrap.Modal(document.getElementById('editstockform'));
    modaltoshow.show()
    editmodal = document.getElementById("editform")
    editmodal.innerHTML= `
    
    <form id="editformform" enctype="multipart/form-data">
          <div class="mb-3 mt-3">
            <label for="sname" class="form-label">Stock Name</label>
            <input type="text"  class="form-control" id="sname" placeholder="Enter Stock Name" name="sname" value="${data['sname']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="brand" class="form-label">Brand Name</label>
            <input type="text" class="form-control" id="brand" placeholder="Enter Brand Name" name="brand" value="${data['brand']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="size" class="form-label">Size</label>
            <input type="text" class="form-control" id="size" placeholder="Enter Size" name="size" value="${data['size']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="category" class="form-label">Category</label>
            <input type="text" class="form-control" id="category" placeholder="Enter Category" name="category" value="${data['category']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="weight" class="form-label">Weight</label>
            <input type="text" class="form-control" id="weight" placeholder="Enter Weight" name="weight" value="${data['weight']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="pcsperbox" class="form-label">PCS per box</label>
            <input type="number" class="form-control" id="pcsperbox" placeholder="Enter PCS per box" name="pcsperbox" value="${data['pcsperbox']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="sqrft" class="form-label">Squre ft</label>
            <input type="text" class="form-control" id="sqrft" placeholder="Enter Squre ft" name="sqrft" value="${data['sqrft']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="unit" class="form-label">Unit</label>
            <input type="text" class="form-control" id="unit" placeholder="Enter Unit" name="unit" value="${data['unit']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="godam1" class="form-label">Available at Godam 1</label>
            <input type="number" class="form-control" id="godam1" placeholder="Enter Available at godam 1" name="godam1" value="${data['godam1']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="reducegodam1" class="form-label">Reduce at Godam 1</label>
            <input type="number" class="form-control" id="reducegodam1" placeholder="Reduce at godam 1" name="reducegodam1">
          </div>
          <div class="mb-3 mt-3">
            <label for="godam2" class="form-label">Available at Godam 2</label>
            <input type="number" class="form-control" id="godam2" placeholder="Enter Available at godam 2" name="godam2" value="${data['godam2']}" readonly>
          </div>
          <div class="mb-3 mt-3">
            <label for="reducegodam2" class="form-label">Reduce at Godam 2</label>
            <input type="number" class="form-control" id="reducegodam2" placeholder="Enter Reduce at godam 2" name="reducegodam2">
          </div>
          <div class="mb-3 mt-3">
            <label for="color" class="form-label">Color</label>
            <input type="text" class="form-control" id="color" placeholder="Enter Color" name="color" value="${data['color']}" readonly>
          </div>
          
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" id="${id}" onclick="reducestocksubmit(this)">Reduce Stock</button>
        </form>
    
    `
    document.getElementById("editformform").addEventListener("submit", function(event) {
      // Prevent the default form submission
      event.preventDefault();
      const formData = new FormData(document.getElementById("editformform"));
      const formDataObject = Object.fromEntries(formData.entries());
      userkey=document.getElementById("userkey").innerHTML
      console.log(formDataObject.reducegodam1 + "is here" +userkey+ id)
      if (formDataObject.reducegodam1==""){
        formDataObject.reducegodam1=0
      }
      if (formDataObject.reducegodam2==""){
        formDataObject.reducegodam2=0
      }
      godam1=parseInt(formDataObject.godam1)-parseInt(formDataObject.reducegodam1)
      godam2=parseInt(formDataObject.godam2)-parseInt(formDataObject.reducegodam2)
      
      editgodam1=formDataObject.reducegodam1
      editgodam2=formDataObject.reducegodam2
      
      urltoupdate=`/actioneditstockapi?id=${id}&userkey=${userkey}&godam1=${godam1}&godam2=${godam2}&act=reduce&editgodam1=${editgodam1}&editgodam2=${editgodam2}    
      `
      fetch(urltoupdate)
  .then(response => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Use the data returned from the API
    Swal.fire({
      title: "Stock Reduced",
      text: "Stock Reduced Successfully!",
      icon: "success"
    });
    // You can manipulate the data or update your UI here
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem fetching the data:', error);
  });
      // Handle the form submission here
      
    });
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    });
  





    
    editmodal = document.getElementById("editstockform")

}
// Make a GET request using Fetch API
fetch('/apiToGetAvailableStocks')
            .then(response => {
                // Check if response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data from server');
                }
                // Parse the JSON data
                return response.json();
            })
            .then(data => {
                // Process the JSON data
                console.log(data);
                html=""
                Object.keys(data).forEach(key => {
                    // https://storage.googleapis.com/makranamarble-68878.appspot.com/stockimg/-NxMhADAMkjnY2OTqZDe.jpg
                    const obj = data[key];
                    console.log("Key:", key);
                    html= html+ `
                    <div class="child" id="${key}">
          <div class="imgbox" id="${key}">
            <img id="${key}" src="https://storage.googleapis.com/makranamarble-68878.appspot.com/stockimg/${key}.jpg" alt="">
          </div>
          <div class="details" id="${key}">
            <ul id="${key}">
              <li id="${key}"><b>${obj.sname}</b></li>
              <li id="${key}">Size: ${obj.size}</li>
              <li id="${key}"><b>Available: ${parseInt(obj.godam1) + parseInt(obj.godam2)}</b></li>
              <li id="${key}">${obj.brand}</li>
             
            </ul>
          </div></div>
                    `
                    
                    // console.log(key.sname)
                    console.log("Value:", obj.sname);

                    
                    console.log();
                  });
                document.getElementById("container1").innerHTML=html
                elements = document.getElementsByClassName('child');



// Define the callback function
function handleClick(event) {
    var id = event.target.id;
    console.log("Clicked element:", event.target);
    console.log("Clicked element ID:", id);
    var modal = new bootstrap.Modal(document.getElementById('customstockdetail'));

    modalhtml=`
    
    <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">${id}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        Modal body..
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
    
    
    
    `





// getting custom stock data
    fetch(`/getstockdetailbyid?id=${id}`)
    .then(response => {
      // Check if the response is successful (status code between 200 and 299)
      if (response.ok) {
        // Parse the JSON response
        return response.json();
      } else {
        // If response is not successful, throw an error
        throw new Error('Failed to fetch data');
      }
    })
    .then(data => {
      // Process the retrieved data
      console.log(data)
      modalhtml=`
    
    <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">${data['sname']}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <!-- Modal body -->
      <div class="modal-body" id="modalbodyparent">
      <div id="modalbody">
      <img src="https://storage.googleapis.com/makranamarble-68878.appspot.com/stockimg/${id}.jpg" alt=""></img>

      </div>
        <ul>
        <li><b>${data['sname']}</b></li>
        <li><b>Brand: </b>${data['brand']}</li>
        <li><b>Category: </b>${data['category']}</li>
        <li><b>Color: </b>${data['color']}</li>
        <li><b>Godam1: </b>${data['godam1']}</li>
        <li><b>Godam2: </b>${data['godam2']}</li>
        <li><b>PCS per box: </b>${data['pcsperbox']}</li>
        <li><b>Size: </b>${data['size']}</li>
        <li><b>Sqr FT: </b>${data['sqrft']}</li>
        <li><b>Unit: </b>${data['unit']}</li>
        <li><b>Weght: </b>${data['weight']}</li>

              </ul>
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="myAdd(this)" id="${id}">Add</button>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="myreduce(this)" id="${id}">Reduce</button>

        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
    
    
    
    `

    document.getElementById('customstockdetail').innerHTML=modalhtml
      
    })
    .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
    });
  

    
    modal.show()
    // Perform actions with the ID as needed
}

// Add event listener to all elements with class "child"
var elements = document.querySelectorAll('.child');
elements.forEach(function(element) {
    element.addEventListener('click', handleClick);
});


            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });







// search function 
function searchItems() {
  // Get input value and convert it to lowercase
  var input = document.getElementById('searchInput').value.toLowerCase();
  // Get all items in the container
  var items = document.querySelectorAll('.child');

  // Loop through each item
  items.forEach(item => {
    // Get text content of all list items within the current item
    var textContent = item.textContent.toLowerCase();
    // Check if input value is found in the text content
    if (textContent.includes(input)) {
      // If found, display the item
      item.style.display = 'block';
    } else {
      // If not found, hide the item
      item.style.display = 'none';
    }
  });
}
