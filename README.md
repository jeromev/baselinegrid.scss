grid.scss
=========

A very simple grid framework for sass. (_Work in progress_)
The included baseline mixin is based on a fabulous gist by Razvan Onofrei: https://gist.github.com/razwan/10662500 
See also https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b 

## Setup

Import the grid framework:

<code>
@import "grid";
</code>

Set the main font size, in _pixels_:

<code>
$base-font-size: _16px_;
</code>

Set the main line height:

<code>
$base-line-height: _1.618_;
</code>

Set the right cap height, depending on your font:

<code>
$base-cap-height: _0.53_;
</code>

## Usage

Example:

<pre><code>
body {
  font-size: $base-font-size;
  line-height: $base-line-height + em;
  font-family: "Fira Sans", Verdana, sans-serif;
  @include show-baseline();
}
h1 {
  @include align-to-baseline(80px);
}
p {
  @include align-to-baseline();
}
</code></pre> 

