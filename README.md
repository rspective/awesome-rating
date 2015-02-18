
[Awesome Rating v1.0.0](http://bandraszyk.github.io/awesome-rating/)
==============

Awesome-rating is a jQuery plugi that allows you to use simple, but flexible rating. The basic configuration uses [Font Awesome](https://github.com/FortAwesome/Font-Awesome), but you are able to use your own classes or even a content.

The plugin requires any version of **jQuery** (see Advanced Usage for more details what specific methods were used), but it's recommended to use the latest one. In the package you can also find integration scripts that allows to use the plugin with **AngularJS** and **KnockoutJS**.

Installation
--------------

    bower install awesome-rating

Basic usage
--------------

###jQuery:

<div class="awesome-rating"></div>
<script>
    $(".awesome-rating").awesomeRating({ valueInitial: 4 });
</script>

###Angular:


<div class="awesome-rating"></div>

<script>
    angular.module("awesomeRating").controller(["$scope", function($scope) {

    }]);
</script>


###Knockout:


###CSS

Advanced usage
--------------

[Annotated source](http://www.onet.pl)


Demo page
--------------

Please, feel free to visit [Demo Page](http://bandraszyk.github.io/awesome-rating/) to check how the library can be useful for you.


Feedback
--------------

If you have any comments, ideas or just want to share your opinion just visit [Feedback Page](http://www.bandrosolutions.pl/?action=feedback&param=awesome-rating)