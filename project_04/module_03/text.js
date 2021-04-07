function reverse(text) {
    return text.split('').reverse().join('');
  }
  
  function scream(text) {
    return text.toUpperCase() + "!!!";
  }
  
  function drawOut(text) {
    return text.split('').join("...");
  }
  
  let textFunction = reverse; // default value

  function updateText () {
        const newText = $('#user-input').val();
        const modifiedText = textFunction(newText);
        console.log(modifiedText)
        $('#transformed').text(modifiedText)
  }

$("input[type=radio]").click(function () {
    const idAttribute = $(this).val()

    if (idAttribute === 'reverse') {
        textFunction = reverse;
    }if (idAttribute === 'scream') {
        textFunction = scream;
    }if (idAttribute === 'draw-out') {
        textFunction = drawOut;
    }
    updateText()
})
$('#user-input').on('input', updateText)