grid.scss
=========

A very tiny simple grid framework for sass. (_Work in progress_)
The included baseline mixin is based on a fabulous gist by Razvan Onofrei: https://gist.github.com/razwan/10662500 
See also https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b 

## Setup

Import the grid framework:

<code>
@import "grid.scss/grid.scss";
</code>

Set the right cap height, depending on your font:

<code>
$font-family: "Fira Sans", Verdana, sans-serif;
$base-cap-height: 0.53;
</code>

## Usage

Example:

<pre><code>
html {
  @include set-base-font-size(18px);
}
h1 {
  @include align-to-baseline(40px);
}
p {
  @include align-to-baseline();
}
</code></pre> 

