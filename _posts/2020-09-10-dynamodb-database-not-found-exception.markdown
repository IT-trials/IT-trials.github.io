---
title: DynamoDB database not found "Amazon.DynamoDBv2.Model.ResourceNotFoundException"
number: 21
categories: AWS
redirect_from: /aws/DynamoDB-database-not-found-exception
---

## Problem:
Following a basic [AWS SDK for .NET](https://aws.amazon.com/sdk-for-net/){:target="_blank"} setup as per [Matthew Harper
's](https://medium.com/@mharper418) helpful [beginner tutorial](https://medium.com/trimble-maps-engineering-blog/getting-started-with-dynamodb-and-net-core-how-to-build-a-leaderboard-4335f2bd56a8){:target="_blank"} My program was throwing an "Amazon.DynamoDBv2.Model.ResourceNotFoundException".

The following line turned out to be at fault blame:
{% highlight csharp %}
AmazonDynamoDBClient client = 
    new AmazonDynamoDBClient(credentials);
{% endhighlight %}

When instantiating the ````AmazonDynamoDBClient````, if no ````Region```` is passed to the constructor then it defaults to ````us-west-1````, at least in my case when I tested 10 times in a row. This is not the region I created my DynamoDB instance or the ````Region```` in my profile.  So when when I ran the 

    aws dynamodb list-tables --profile Craig

My table was listed e.g.
{% highlight json %}
{
    "TableNames": [
        "GregorianToSolarLunar"
    ]
}
{% endhighlight %}

## Solution:
Tell the ````AmazonDynamoDBClient```` what region your instance is in.

In the constructor using an enum:
{% highlight csharp %}
    var region = 
        Amazon.RegionEndpoint.USEast2;
        
    AmazonDynamoDBClient client = 
        new AmazonDynamoDBClient(credentials, region);
{% endhighlight %}
In the constructor using your profile value:
{% highlight csharp %}
    AmazonDynamoDBClient client = 
        new AmazonDynamoDBClient(credentials, profile.Region);
{% endhighlight %}
In the constructor using a [AmazonDynamoDBConfig](https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_DynamoDB_AmazonDynamoDBConfig.htm){:target="_blank"} object.  Particularly, its properties RegionEndpoint or ServiceURL if querying a local test instance:
{% highlight csharp %}
    AmazonDynamoDBConfig clientConfig = 
        new AmazonDynamoDBConfig();

    clientConfig.ServiceURL = 
        "http://localhost:8000";

    AmazonDynamoDBClient client = 
        new AmazonDynamoDBClient(credentials, clientConfig )
{% endhighlight %}
Or preferably, once you have proof of concept, get all your config in a configuration manager. AWS give an example using an [app.config file on their code examples page](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CodeSamples.DotNet.html){:target="_blank"}. However, a more complete and appropriate approach is documented in [Gary Woodfine's](https://dev.to/gary_woodfine){:target="_blank"}  article ["Simple Dependency Injection In AWS Lambda .net core"](https://dev.to/gary_woodfine/simple-dependency-injection-in-aws-lambda-net-core-n0g){:target="_blank"}.

### Up-Date: 24/9/2020
I found the following resources from [Steve Gordon](https://www.stevejgordon.co.uk/author/stevejgordon){:target="_blank"} very helpful when working adding AWS Services to my dependencies container.  I will attempt to combine what I have learned in a method or template in a later post.

- [Running AWS DynamoDB Locally for .NET Core Developers](https://www.stevejgordon.co.uk/running-aws-dynamodb-locally-for-net-core-developers){:target="_blank"} 
- [Credential Loading and the AWS SDK for .NET (Deep Dive)](https://www.stevejgordon.co.uk/credential-loading-and-the-aws-sdk-for-dotnet-deep-dive){:target="_blank"}