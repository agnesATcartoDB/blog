---
title: 'A horrible week for Internet security'
tags:
- 'system status'
---

<div class="wrap">
	<iframe width='100%' height='520' frameborder='0' src='http://osm2.cartodb.com/viz/beeaf180-45a4-11e4-ab51-0e9d821ea90d/embed_map' allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen></iframe>
</div>

You maybe still remember the [heartbleed](http://heartbleed.com/) security issue that affected the entire Internet some months ago. Well, this week has not been easier for Internet security. Now more recently a critical vulnerability on the GNU bash, used by millions of servers in Internet, has been detected. 

<!--more-->

The vulnerability made it possible to execute malicious code on remote servers, which is a big big problem. At CartoDB we acted immediately and updated our servers to prevent any security issues. We carefully checked that this security vulnerability has not been exploited on our servers and are happy to report that we are all fine. The whole thing is a bit more complex and required several updates to get the issue securely fixed.

Now, this week Amazon, our cloud infrastructure provider, also announced a security problem that is forcing them to restart a lot of servers on which CartoDB, and many other Internet services, run. The exact security vulnerability has not been disclosed to prevent further problems, but it must be serious as it has forced Amazon to take some dramatic actions. Due to the way Amazon is handling the upgrade of their systems, there might be some intermittent downtimes on CartoDB service during the weekend. We are actively monitoring the infrastructure to ensure these downtimes are as small as possible.

We wanted to let you know in advance, just in case you notice. We expect downtimes of less than 1 minute. If you have any questions please feel free to contact us at contact@cartodb.com as usual, and send a big hug to the systems team at CartoDB for a wild week.

