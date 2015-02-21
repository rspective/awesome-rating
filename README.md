
[Awesome Rating v1.0.0](http://bandraszyk.github.io/awesome-rating/)
==============

Awesome-rating is a jQuery plugin that allows you to use simple, but flexible rating mechanism. The basic configuration uses [Font Awesome](https://github.com/FortAwesome/Font-Awesome), but it's not a problem to replace it with any library you like.

The plugin requires a **jQuery**  and it's recommended to use the latest one, although only basic methods were used (see Advanced Usage for more details). In the package you can also find integration scripts that allows to use the plugin with **AngularJS** and **KnockoutJS**.

Installation
--------------

TODO: Register package

Basic usage
--------------

###jQuery:

    <div class="awesome-rating"></div>
    <script>
        $(".awesome-rating").awesomeRating({ valueInitial: 4 });
    </script>


###CSS

    .rating-star { color: lightgrey; cursor: pointer; }
    .rating-star.first-selected { color: #CA5252; }
    .rating-star.first-unselected { color: lightgrey; }
    .rating-star.second-selected { color: #E59257; }
    .rating-star.second-unselected { color: lightgrey; }
    .rating-star.third-selected { color: #FDD05B; }
    .rating-star.third-unselected { color: lightgrey; }
    .rating-star.forth-selected { color: #8DBE5E; }
    .rating-star.forth-unselected { color: lightgrey; }
    .rating-star.fifth-selected { color: #2CAF61; }
    .rating-star.fifth-unselected { color: lightgrey; }
    .rating-star-hover { opacity: 0.6; }
    .rating-star-fractional {  position: absolute; overflow: hidden; z-index: 2; }

###AngularJS:

TODO: Describe

###KnockoutJS:

TODO: Describe

Advanced usage
--------------

TODO: Add correct link here.

[Annotated source](https://github.com/bandraszyk/awesome-rating)


Demo page
--------------

Please, feel free to visit [Demo Page](http://bandraszyk.github.io/awesome-rating/) to check how the library can be useful for you.