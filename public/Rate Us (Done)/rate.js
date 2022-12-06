document.getElementById('box')
    .addEventListener('keyup', function(event) {
        if (event.code === 'Enter')
        {
            event.preventDefault();
            document.querySelector('form').submit();
            window.alert("Thank you for your feedback!");
        }
    });