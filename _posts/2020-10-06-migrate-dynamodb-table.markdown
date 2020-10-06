---
title: Migrate DynamoDB Table Remote/Cloud
number: 26
categories: AWS
---

## Problem:

You may need a method to migrate in and out of AWS if you:

- Develop a dataset locally and want to move to the cloud 
- Need too develop locally against data originating in the cloud 

## Solution:

- AWS has an enterprise level solution, [Data Pipeline](https://aws.amazon.com/datapipeline/){:target="_blank"} which may not be required for your datasets or workflow.

- [dynamodump](https://github.com/bchew/dynamodump){:target="_blank"} makes a neat little local copy of your data in a series of 3.5MB or less json files under the name specified. Careful using the same name twice if you were wishing to retain a copy of the data as it will clear down its directory structure by default.

Here is an example pair of how you might process a local table and then upload to aws with dynamodump:

    python dynamodump.py -m backup -r local -s TABLE-NAME --host localhost --port 8000 --accessKey a --secretKey a

    python dynamodump.py -p default -r YOUR-REGION -m restore  -s TABLE-NAME
