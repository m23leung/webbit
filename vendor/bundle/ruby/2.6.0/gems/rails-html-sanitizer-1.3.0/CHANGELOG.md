## 1.3.0

- Address deprecations in Loofah 2.3.0.

  _Josh Goodall_

## 1.2.0

- Remove needless `white_list_sanitizer` deprecation.

  By deprecating this, we were forcing Rails 5.2 to be updated or spew
  deprecations that users could do nothing about.

  That's pointless and I'm sorry for adding that!

  Now there's no deprecation warning and Rails 5.2 works out of the box, while
  Rails 6 can use the updated naming.

  _Kasper Timm Hansen_

## 1.1.0

- Add `safe_list_sanitizer` and deprecate `white_list_sanitizer` to be removed
  in 1.2.0. https://github.com/rails/rails-html-sanitizer/pull/87

  _Juanito Fatas_

- Remove `href` from LinkScrubber's `tags` as it's not an element.
  https://github.com/rails/rails-html-sanitizer/pull/92

  _Juanito Fatas_

- Explain that we don't need to bump Loofah here if there's CVEs.
  https://github.com/rails/rails-html-sanitizer/commit/d4d823c617fdd0064956047f7fbf23fff305a69b

  _Kasper Timm Hansen_

## 1.0.1

- Added support for Rails 4.2.0.beta2 and above

## 1.0.0

- First release.
