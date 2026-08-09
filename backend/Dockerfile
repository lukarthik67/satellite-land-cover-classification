FROM python:3.11-slim

WORKDIR /app

# TensorFlow needs these system libs to load images/handle native ops
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5000
EXPOSE 5000

# 1 worker: each gunicorn worker loads its own copy of the ~350MB model into RAM.
# Increase workers only if you've sized the instance's memory for it.
CMD gunicorn -w 1 -b 0.0.0.0:${PORT} --timeout 120 app:app
