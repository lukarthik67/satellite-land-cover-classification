# Satellite Land Use / Land Cover — Backend

Flask API that serves `best_resnet50.keras` (ResNet50, 224×224×3 input,
10-class softmax output) for land-use classification.

## 1. Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 2. Class order & preprocessing (confirmed from the training notebook)

Checked against `LULC.ipynb`:

- Trained on **EuroSAT_RGB** via `image_dataset_from_directory`, so
  `CLASS_NAMES` in `config.py` (alphabetical folder order) is correct —
  no action needed.
- `resnet50.preprocess_input` is baked **inside the model graph itself**
  (augmentation → preprocess_input → ResNet50 base), so the backend
  correctly sends raw resized 0–255 pixels and does *not* preprocess again.
- ⚠️ The notebook's own `predict_image()` demo cells call `preprocess_input`
  a *second* time manually before `.predict()` — this double-preprocesses
  the image and is inconsistent with how `test_ds` was evaluated. It's very
  likely a bug in those demo cells. This backend does **not** replicate it.
- Resize uses bilinear interpolation to match `image_dataset_from_directory`'s
  default (the notebook's demo cells used `nearest` via `load_img`, which
  is a second, smaller inconsistency in the demo code — not used here).

## 3. Run

```bash
python app.py
```

Server starts on `http://localhost:5000`. The model is loaded once at
startup (takes a few seconds — it's ~350MB).

## 4. Test it

```bash
curl http://localhost:5000/api/health

curl -X POST http://localhost:5000/api/predict \
  -F "image=@/path/to/some_satellite_image.jpg"
```

Expected response shape:

```json
{
  "success": true,
  "prediction": { "class": "Forest", "confidence": 92.34 },
  "probabilities": [
    { "class": "Forest", "confidence": 92.34 },
    { "class": "Pasture", "confidence": 3.10 },
    ...
  ]
}
```

## 5. Connect the frontend

Open `satellite-tracker.html` in a browser (or serve it with any static
server). Near the top of its second `<script>` block there's:

```js
const API_BASE_URL = 'http://localhost:5000';
```

Change that if your backend runs somewhere else. As long as the Flask
server is running, the "PREDICT LAND COVER" button will upload the
currently-shown image and render the real model output — no more random
mock numbers.

## Notes

- CORS is enabled for all origins via `flask-cors`, since the HTML file is
  typically opened as a local file or served from a different port than
  the API. Lock this down (`CORS(app, origins=[...])`) before deploying
  publicly.
- Max upload size is 10MB (`config.MAX_CONTENT_LENGTH`).
- `DEBUG = True` in `config.py` — set to `False` for production.
