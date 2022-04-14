baselinegrid.scss
=========

A small set of tools, in SCSS, to align text to a baseline grid. Current calculations are based on Benoît Wimart's Basel project version 0.1 beta (6 May 2013 http://b4d455.fr/basel).

## Install

<code>
$ npm install baselinegrid.scss
</code>

## Setup

Import _baselinegrid.scss:

<code>
@use 'baselinegrid' as bg with (
  $debug: 1
);
</code>

Initialize:

<code>
@include bg.begin();
</code>

## Usage

Example:

<pre><code>
@use 'baselinegrid' as bg with (
  $debug: 1
);

@include bg.begin();
html {
  font-family: Verdana, sans-serif;
  @include bg.root();
}
h1 {
  @include bg.scale('font-size', (
    's': 60px,
    'm': 66px,
    'l': 72px,
    'xl': 84px
  ));
}
h2 {
  @include bg.scale('font-size', (
    's': 40px,
    'm': 44px,
    'l': 48px,
    'xl': 54px
  ));
}
p {
  @include bg.set();
}
</code></pre>
