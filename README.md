grid.scss
=========

A very tiny simple set of tools, in SCSS, to align text to a baseline grid. (_Work in progress_)
Based on a gist by Razvan Onofrei: https://gist.github.com/razwan/10662500 
See also https://medium.com/@razvanonofrei/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b 

## Install

<code>
$ bower install grid.scss
</code>

## Setup

Import the grid framework:

<code>
@import "grid.scss/grid.scss";
</code>

Set the right cap height, depending on your font:

<code>
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

