console.log("hello world")

document.getElementById("myForm").addEventListener("submit", function(event) {
    // Prevent default form submission behavior
    event.preventDefault();


    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    var description = document.getElementById("description").value; // corrected here
    var pswd = document.getElementById("pswd").value;
    
    // Define the API endpoint URL
const apiUrl = '/apiToAddWorkers';

// Construct the query parameters
const params = new URLSearchParams();
params.append('name', name);
params.append('number', number);
params.append('description', description);
params.append('pswd', pswd);

// Make the API call using fetch
fetch(apiUrl + '?' + params.toString())
  .then(response => {
    // Check if the response is successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      return response.json();
    } else {
      // If response is not successful, throw an error
      throw new Error('Network response was not ok.');
    }
  })
  .then(data => {
    // Check if the response contains success:true
    if (data.success) {
      // Call the callback function if success is true
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Worker Added Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      // You can call your callback function here
    } else {
      // Handle the case where success is false
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

    // loader= document.getElementById("loader")
    // loader.style.display="block"
    // You can add your custom logic here
    
    // For example, you might want to validate the form fields or perform an AJAX request
    
    // If you want to submit the form programmatically after some action, you can do so like this:
    // this.submit();
});