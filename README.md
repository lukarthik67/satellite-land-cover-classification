# Satellite Land Use and Land Cover Classification
![License](https://img.shields.io/badge/License-MIT-blue)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success)
![Python](https://img.shields.io/badge/Python-3.x-yellow)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange)
![ResNet50](https://img.shields.io/badge/Model-ResNet50-blue)
![Flask](https://img.shields.io/badge/Backend-Flask-black)

A deep learning-based web application for **Satellite Land Use and Land Cover (LULC) classification** using a fine-tuned **ResNet50** model trained on the **EuroSAT RGB dataset**.

The project provides a Flask REST API for image classification and a web-based frontend for uploading satellite images and viewing predicted land-cover classes with confidence scores.

## Features

* Satellite image classification using ResNet50
* Transfer learning with a pretrained ResNet50 architecture
* 10-class Land Use and Land Cover classification
* Flask REST API for predictions
* Image upload through a web interface
* Confidence scores for predictions
* Probability distribution across all classes
* Docker support for backend deployment
* Health-check API endpoint
* CORS support for frontend-backend communication

## Model

The project uses a fine-tuned **ResNet50** convolutional neural network.

### Model Details

| Parameter         | Details                         |
| ----------------- | ------------------------------- |
| Architecture      | ResNet50                        |
| Learning Approach | Transfer Learning / Fine-Tuning |
| Input Size        | 224 × 224 × 3                   |
| Output            | 10-class Softmax                |
| Dataset           | EuroSAT RGB                     |
| Framework         | TensorFlow / Keras              |
| Model Format      | `.keras`                        |

The model performs classification of satellite images into different land-use and land-cover categories.

## LULC Classes

The model predicts the following 10 classes:

1. Annual Crop
2. Forest
3. Herbaceous Vegetation
4. Highway
5. Industrial
6. Pasture
7. Permanent Crop
8. Residential
9. River
10. Sea/Lake

## Dataset

The model was trained using the **EuroSAT RGB dataset**, a satellite image dataset containing RGB satellite images covering multiple land-use and land-cover categories.

The dataset contains images from the following classes:

* AnnualCrop
* Forest
* HerbaceousVegetation
* Highway
* Industrial
* Pasture
* PermanentCrop
* Residential
* River
* SeaLake

## System Architecture
        
<img width="1536" height="1024" alt="efa90a8c-383b-4e92-8c7a-560f73a922c4" src="https://github.com/user-attachments/assets/4c4ebb97-597b-4edc-a07e-2d8efb959c59" />


## Project Structure

```text
satellite-lulc-classification/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── model_loader.py
│   ├── prediction.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .dockerignore
│   └── README.md
│
├── utils/
│   ├── image_utils.py
│   └── response.py
│
├── index.html
│
├── .gitignore
├── .gitattributes
└── README.md
```

## Model Weights

The trained ResNet50 model file is **not included in this repository** because of its large file size (~350 MB).

This keeps the Git repository lightweight and avoids unnecessarily increasing repository storage.

The backend expects the trained model file:

```text
best_resnet50.keras
```

Place the model in the location expected by `model_loader.py` before running the backend.

> **Note:** Model weights are intentionally excluded from GitHub. The repository contains the complete application code required to load and use the model.

## Frontend

The project includes an HTML-based frontend for interacting with the classification API.

The frontend:

1. Accepts a satellite image.
2. Sends the image to the Flask API.
3. Receives the model prediction.
4. Displays the predicted land-cover class.
5. Displays the model confidence.
6. Displays probability information.

## Technologies Used

* Python
* TensorFlow
* Keras
* ResNet50
* Deep Learning
* Transfer Learning
* Computer Vision
* Flask
* Flask-CORS
* NumPy
* Pillow
* HTML
* JavaScript
* Docker
* Gunicorn

## Applications

Satellite LULC classification can support applications such as:

* Land-use monitoring
* Urban development analysis
* Agricultural monitoring
* Forest monitoring
* Environmental analysis
* Remote sensing
* Geographic information systems
* Land management

## License

This project is licensed under the MIT License.

## Author

**Karthik**

GitHub: `https://github.com/lukarthik67`
