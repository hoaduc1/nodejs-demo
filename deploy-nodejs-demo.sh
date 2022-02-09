#!/bin/bash
gcloud config set project nodejs-demo-340614
gcloud auth activate-service-account \
--key-file=service-accounts/nodejs-demo.json
gcloud app deploy --appyaml=app.yaml --version=v1