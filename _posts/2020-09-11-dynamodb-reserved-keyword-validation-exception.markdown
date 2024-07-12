---
title: DynamoDB Reserved Keyword "ValidationException"
number: 22
categories: AWS
---

## Problem:
If you follow AWS's executive summary regarding the naming of keys, particularly [primary keys](https://aws.amazon.com/premiumsupport/knowledge-center/primary-key-dynamodb-table/){:target="_blank"} , as of date of publishing (11th Sept. 2020) you may note there is no mention of reserved keywords.

You may very well only hear about reserved keywords when you try and query your nicely populated table for the first time and hit a ````"ValidationException"```` with a fortunately very helpful message {% ihighlight error %}"Invalid KeyConditionExpression: Attribute name is a reserved keyword; reserved keyword: {% raw %}{{ Your Problem Key Here }}{% endraw %}"{% endihighlight %}.

At this you may find the [list of reserved words are maintained by AWS.](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html){:target="_blank"}   The list is quite extensive and includes time related words as well as various commands.

The following query will produce and error as ````YEAR```` is a "Reserved Keyword".
{% highlight csharp %}
var request = new QueryRequest
{
    TableName = "Your Table",
    KeyConditionExpression = "Year = :v_Year",
    ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                    { ":v_Year", new AttributeValue { N = year.ToString()}}
                },
    ScanIndexForward = true
};
return client.QueryAsync(request).Result;
{% endhighlight %}
 

## Solution:
If you are not beyond the point of no return it may be worth cloning your DB into another like table with the values mapped to unreserved keys.  There is no standard solution or command for this but it isn't complex achieve with the sdk of your choice.

However, AWS provide a concept of "Expression Attribute Names" which is implemented slightly differently in each language - [.NET examples here.](https://docs.aws.amazon.com/sdk-for-net/v2/developer-guide/dynamodb-expressions.html){:target="_blank"} 

Rather like ````ExpressionAttributeValues````, ````ExpressionAttributeNames```` are included in the ````QueryRequest```` constructor.  However, in the ````KeyConditionExpression```` you prefix your variable with a ````#```` not a ````:```` and it is of a simpler type being of {% ihighlight csharp %}Dictionary<string, string>{% endihighlight %}.


This is natural enough and you may have guarded against SQL injection using similar means.

The following is the corrected version of the code quoted above.
{%- highlight csharp %}
var request = new QueryRequest
{
    TableName = "Your Table",
    KeyConditionExpression = "#Year = :v_Year",
    ExpressionAttributeValues = new Dictionary<string, AttributeValue> {
                    { ":v_Year", new AttributeValue { N = year.ToString()}}
                },
    ExpressionAttributeNames = new Dictionary<string, string> {
                    { "#Year", "Year" }
                },            
    ScanIndexForward = true
};                                                      
return client.QueryAsync(request).Result;

{% endhighlight %}