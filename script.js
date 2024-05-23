
let button = document.getElementById('convertButton');
let textInput = document.getElementById('textInput');
let typeInput = document.getElementById('convertType');

button.addEventListener('click', downloadBase64File);

function downloadBase64File() {
  let fileType = typeInput.value;
  let fileName = textInput.value;
  let file = document.querySelector('input[type=file]')['files'][0];

  let reader = new FileReader();

  reader.onload = function () {
    let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    // console.log(base64String);

    fileName = `${fileName}.${fileType}`;
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    const byteCharacters = atob(base64WithoutPrefix);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: `image/${fileType}` });

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }

  reader.readAsDataURL(file);
}
