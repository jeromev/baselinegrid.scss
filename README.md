grid.scss
=========

A very simple grid framework for sass. (_Work in progress_)

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
}
h1 {
  @include align-to-baseline(80px);
}
p {
  @include align-to-baseline();
}
</code></pre> 

