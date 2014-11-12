awesome-rating
==============

It's a flexible Javascript plugin dedicated for everyone who, on one hand, enjoys simplicity but can't live without configurability on the other hand. 

Dependencies:
- [jQuery](http://jquery.com/)
- [AngularJS](https://angularjs.org/), optional
- [Font Awesone](http://fortawesome.github.io/Font-Awesome/), used in standard configuration

How it works
============

1. jQuery:

```
<link rel="stylesheet" type="text/css" href="dist/awesomeRating.css" />
<script type="text/javascript" scr="dist/awesomeRating.min.js"></script>
...
<div class='rating'></div>
<script type="text/javascript">
    $('.rating').awesomeRating({ valueInitial : 4 });
</script>
```

2. AngularJS:

```
<link rel="stylesheet" type="text/css" href="dist/awesomeRating.css" />
<script type="text/javascript" scr="dist/awesomeRating-angular.min.js"></script>
...
<div awesome-rating="feedback.rate" awesome-rating-options='{ "valueInitial" : 4 }'></div>
```

The base CSS file can be easily adjusted to your specific needs.

Configuration
=============

###Values

###Styling


Demo
====

TODO: Add link to demo page.

Feedback
========

TODO: Add link to feedback page.
