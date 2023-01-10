chrome.contextMenus.create({
    title: "Upload to imgBB",
    contexts: ["image"],
    onclick: function (info, tab) {
        uploadImage(info.srcUrl);
    }
});

function uploadImage(imageUrl) {
    const apiKey = 'API_KEY_HERE';

    let formData = new FormData();
    formData.append('image', imageUrl);

    fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            chrome.tabs.create({ url: data.data.url });
        }
    })
    .catch(error => {
        console.error(error);
    });
}
