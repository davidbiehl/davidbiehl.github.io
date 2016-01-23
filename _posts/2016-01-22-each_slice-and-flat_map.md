---
layout: post
title:  "#each_slice and #flat_map: A Perfect Pair"
date:   2016-01-23
categories: code ruby
tags: code ruby
---

The [Enumerable#each_slice](http://ruby-doc.org/core-2.3.0/Enumerable.html#method-i-each_slice)
method is a great way to break up a collection so you can work on chunks of it at a time.

{% highlight ruby %}
irb> (1..10).each_slice(2) { |slice| pp slice }
[1, 2]
[3, 4]
[5, 6]
[7, 8]
[9, 10]
 => nil
{% endhighlight %}

I find it useful when I need to query a bunch of records from a database with a
SQL `IN` clause. Let's say you have a table of items, and you want to query
order lines for the active items. Like this example:

{% highlight ruby %}
item_numbers = Item.where(active: true).map(&:item_number)

lines = OrderLine.where(item_number: item_numbers)

# SELECT * FROM order_lines WHERE item_numbers IN ( ... )
{% endhighlight %}

[Some databases](http://www.dba-oracle.com/t_ora_01795_maximum_number_of_expressions_in_a_list_is_1000.htm) 
put a limit on how many values you can use on an `IN` clause. So if your active
items exceed that limit, the query will fail. That's where `#each_slice` can
help.

{% highlight ruby %}
lines = []

item_numbers.each_slice(100) do |slice|
  lines += OrderLine.where(item_number: slice)
end
{% endhighlight %}

Now we're performing multiple queries with only 100 item numbers at a time.
Cool! That fixes our query problem, but this code is kinda ugly. I don't like
creating empty arrays just to build them with a loop unless there's no other
way to avoid it. That's where [Enumerable#flat_map](http://ruby-doc.org/core-2.3.0/Enumerable.html#method-i-flat_map)
comes to the rescue.

{% highlight ruby %}
lines = item_numbers.each_slice(100).flat_map do |slice|
  OrderLine.where(item_number: slice)
end
{% endhighlight %}

`#flat_map` is the perfect companion to `#each_slice`. When `#each_slice` tears
the collection apart, `#flat_map` is there to put all of the pieces back
together.

I particularly enjoy how `#each_slice` returns an `Enumerable` if a block isn't
given, which means you can immediately call `#flat_map` on the return value. The
slices are passed to the `#flat_map` method and then flattened back into a
single collection when it's done. Brilliant!
