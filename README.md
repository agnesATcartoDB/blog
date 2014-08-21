# CartoDB Blog

[![Build Status](https://travis-ci.org/CartoDB/blog.svg?branch=master)](https://travis-ci.org/CartoDB/blog)


## About

This repo contains the blog of CartoDB [blog.cartodb.com](http://blog.cartodb.com/)


## Develop

### How to install

CartoDB Blog uses a mix of [Jekyll](http://jekyllrb.com/) and [Grunt](http://gruntjs.com/) tasks for development.

```
bundle install
npm install -g grunt-cli
npm install
```


### Run locally

```
grunt serve
```

A tab in your browser will open and direct you to http://0.0.0.0:9000

Also, you can run the blog locally as if it was on production with `grunt serve:dist`


## Write

### Working with drafts

- Save your draft to the _drafts folder
- Launch ```grunt drafts```
- After you want to publish your draft, move your post to the normal `_posts` folder


### Excerpts

Normally the excerpts of the posts take the first paragraph of the content (it can be an image), but you can override this by placing a `<!--more--!>` tag in the text. The description meta of the page comes from this excerpt, unless you specifically set `description:` in the front matter block.


### Adding images

Images can be styled so they are 940px width and have a border. Just wrap it between the next code:

- without link

```
<div class="wrap"><p class="wrap-border"><img src="http://" alt=""></p></div>
```

- with link

```
<div class="wrap"><p><a href="http://" class="wrap-border"><img src="http://" alt=""></a></p></div>
```


#### Featured images

Add `layout_color:` in the front matter block.

```
layout_color: '/img/posts/2014-07-15-enjoy-the-best-spanish-soccer-in-san-francisco/atleti-tickets.jpg'
```


### Syntax highlight

Add the next tags avobe and below the code to show, with the syntax to highlight (scss, sql, javascript, html, ...):

```
{% highlight javascript %}
...
{% endhighlight %}
```

**Careful with the indentation and the name of the syntax**


### Related posts

While developing related posts, i.e. `--lsi` option are _disabled_ in order to not slow files regeneration. To check related posts and still make it fast just install gsl. In OSX:

```
brew install gsl
gem install rb-gsl
```

#### Related posts thumbnails

Thumbnails are auto generated with the first image in the content of each post. They can be overriden by placing `thumbnail_image` in the Front Matter. We use [Jekyll Thumbnail Filter](https://github.com/matallo/jekyll-thumbnail-filter/) for this.


## Deploy

```
grunt deploy:staging|production
```

You'll need a `grunt-aws.json` credentials file.

**There's a hook set up so when pushing to _master_ it is automatically deployed to production**
