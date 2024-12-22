const memeImage = document.getElementById('meme-image');
        const topCaption = document.getElementById('top-caption');
        const bottomCaption = document.getElementById('bottom-caption');
        const imageUpload = document.getElementById('image-upload');
        const topTextInput = document.getElementById('top-text');
        const bottomTextInput = document.getElementById('bottom-text');
        const downloadButton = document.getElementById('download-meme');

        // Handle image upload
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    memeImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Update captions
        topTextInput.addEventListener('input', function() {
            topCaption.textContent = topTextInput.value;
        });

        bottomTextInput.addEventListener('input', function() {
            bottomCaption.textContent = bottomTextInput.value;
        });

        // Download the meme
        downloadButton.addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = memeImage.width;
            canvas.height = memeImage.height;

            // Draw image and captions on canvas
            ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
            ctx.font = '24px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';

            // Top caption
            ctx.fillText(topCaption.textContent, canvas.width / 2, 10);
            ctx.strokeText(topCaption.textContent, canvas.width / 2, 10);

            // Bottom caption
            ctx.textBaseline = 'bottom';
            ctx.fillText(bottomCaption.textContent, canvas.width / 2, canvas.height - 10);
            ctx.strokeText(bottomCaption.textContent, canvas.width / 2, canvas.height - 10);

            // Download
            const link = document.createElement('a');
            link.download = 'meme.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    )