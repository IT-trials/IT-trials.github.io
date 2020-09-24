---
title: Lambda Local Invocation DynamoDB Request Hanging and Eventual "CLR/System.Net.Http.HttpRequestException"
number: 24
layout: post
categories: AWS
---

## Problem:

When attempting to query or interact with a local DynamoDB instance from a local invocation of a Lambda Function, the request hangs for a considerable period and then raises an
`CLR/System.Net.Http.HttpRequestException`.  With the message: `"Cannot assign requested address"`

N.B. With .NET version 3.1, it can be hard to pinpoint exceptions due to lack of debugging but you may be able to read some of the above from your Output.

This is because the `AmazonDynamoDBClient` can not reach the requested DynamoDB instance.

In my case I was trying to attach to a `ServiceURL` of `http://localhost:8000`.  The Docker container was acting as it's own localhost with nothing listening on or forwarding port 8000.

## Solution:

There are several solutions that have alternate merits.  I followed some of the solutions on this [StackOverflow question](https://stackoverflow.com/questions/46973456/docker-access-localhost-port-from-container){:target="_blank"} to come up with my solutions.  Also configuration options here at 

1. Point your client at your host IP, e.g. `192.168.1.x` not `localhost`.

2. Connect the docker container to your `"host"` network not the default, `"bridge"` network.  You can do this by adding the following to your launch config: `"sam": {"dockerNetwork" : "host"}`. As per the [AWS Documentation](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/run-debug-sam-app.html#debug-config-ref){:target="_blank"}.