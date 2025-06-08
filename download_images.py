import os
import requests
from PIL import Image
from io import BytesIO

# Create assets/img directory if it doesn't exist
os.makedirs('assets/img', exist_ok=True)

# Image URLs
images = {
    'logo.png': 'https://raw.githubusercontent.com/your-username/your-repo/main/logo.png',
    'car-3d.png': 'https://raw.githubusercontent.com/your-username/your-repo/main/car-3d.png',
    'news1.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/news1.jpg',
    'news2.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/news2.jpg',
    'news3.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/news3.jpg',
    'student1.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/student1.jpg',
    'student2.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/student2.jpg',
    'student3.jpg': 'https://raw.githubusercontent.com/your-username/your-repo/main/student3.jpg'
}

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            img.save(f'assets/img/{filename}')
            print(f'Successfully downloaded {filename}')
        else:
            print(f'Failed to download {filename}')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

# Download all images
for filename, url in images.items():
    download_image(url, filename) 