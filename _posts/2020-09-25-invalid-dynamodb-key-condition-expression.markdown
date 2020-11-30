---
title: Invalid DynamoDB KeyConditionExpression "ValidationException"
number: 25
categories: AWS
redirect_from: /aws/Invalid-DynamoDB-KeyConditionExpression
---

## Problem:
If you attempt to use the DynamoDB `KeyConditionExpression` like you might a SQL query, and chain on several clauses with the `and` keyword, you may experience one of the two following error messages in the a `Amazon.DynamoDBv2.AmazonDynamoDBException` `"ValidationException"`

- `"Conditions can be of length 1 or 2 only"`
- `"Query condition missed key schema element"`

This is because the `KeyConditionExpression` is exclusively for querying the elements that combine to make the primary key. That is the `Partiton Key` and the optional `Sort Key`.  Furthermore you may use only the `Partiton Key` but you may not use the `Sort Key` without the `Partiton Key`.

The following will all produce exceptions:
{% highlight csharp %}
KeyConditionExpression = "SortKey = :v_VALUE"
...
KeyConditionExpression = 
    "PartitonKey = :v_VALUE1 and OtherKey = :v_VALUE2"
...
KeyConditionExpression = 
    "PartitonKey = :v_VALUE1 and SortKey = :v_VALUE2 and OtherKey = :v_VALUE3"
{% endhighlight %}
## Solution:

Straining a SQL metaphor, as you always query a DynamoDB table not a database, you might consider the `KeyConditionExpression` analogous with the `FROM` keyword of a SQL Query which returns zero or more rows as a temporary table.  The `WHERE` keyword used to refine this is [`FilterExpression`](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.html#Query.FilterExpression){:target="_blank"} in DynamoDB.

For example:
{% highlight csharp %}
KeyConditionExpression = "PartitonKey = :v_VALUE1",
FilterExpression = "OtherKey = :v_VALUE2"
{% endhighlight %}