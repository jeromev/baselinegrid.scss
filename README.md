grid.scss
=========

A very simple grid framework for sass. (_Work in progress_)
The included baseline mixin is based on a fabulous gist by Razvan Onofrei: https://gist.github.com/razwan/10662500 
See also https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b 

## Setup

Import the grid framework:

<code>
@import "grid.scss/grid.scss";
</code>

Set the right cap height, depending on your font:

<code>
$base-cap-height: _0.53_;
</code>

## Usage

Example:

<pre><code>
body {
  font-family: "Fira Sans", Verdana, sans-serif;
  @include set-base-font-size(16px, 1.618);
  @include show-baseline();
}
h1 {
  @include align-to-baseline(80px);
}
p {
  @include align-to-baseline();
}
</code></pre> 

