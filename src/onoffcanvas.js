(function ($) {
  const OnoffCanvas = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, OnoffCanvas.DEFAULTS, options);
    this.$trigger = $(`[data-toggle="onoffcanvas"][href="#${element.id}"],[data-toggle="onoffcanvas"][data-target="#${element.id}"]`);

    this.addAriaCollapsedClass(this.$element, this.$trigger);
  };

  OnoffCanvas.DEFAULTS = {
    toggle: true,
  };

  OnoffCanvas.prototype.show = function () {
    const openClass = 'is-open';

    if (this.$element.hasClass(openClass)) {
      return;
    }

    this.$element.addClass(openClass).attr('aria-expanded', true);

    this.$trigger.attr('aria-expanded', true);
  };

  OnoffCanvas.prototype.hide = function () {
    const openClass = 'is-open';

    if (!this.$element.hasClass(openClass)) {
      return;
    }

    this.$element.removeClass(openClass).attr('aria-expanded', false);

    this.$trigger.attr('aria-expanded', false);
  };

  OnoffCanvas.prototype.toggle = function () {
    const openClass = 'is-open';
    this[this.$element.hasClass(openClass)
      ? 'hide'
      : 'show']();
  };

  function getTargetFromTrigger($trigger) {
    let href;
    const target = $trigger.attr('data-target') || ((href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));

    return $(target);
  }

  OnoffCanvas.prototype.getParent = function () {
    return $(this.options.parent)
      .find(`[data-toggle="onoffcanvas"][data-parent="${this.options.parent}"]`)
      .each($.proxy(function (i, element) {
        const $element = $(element);
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
      }, this)).end();
  };

  OnoffCanvas.prototype.addAriaCollapsedClass = function ($element, $trigger) {
    const openClass = 'is-open';
    const isOpen = $element.hasClass(openClass);

    $trigger.attr('aria-expanded', !isOpen);
    $element.toggleClass(openClass, !isOpen).attr('aria-expanded', !isOpen);
  };

  function Plugin(option) {
    return this.each(function () {
      const $this = $(this);
      let data = $this.data('onoffcanvas');
      const options = $.extend({}, OnoffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data && options.toggle && /show|hide/.test(option)) {
        options.toggle = false;
      }
      if (!data) {
        $this.data('onoffcanvas', (data = new OnoffCanvas(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  }

  const old = $.fn.onoffcanvas;

  $.fn.onoffcanvas = Plugin;
  $.fn.onoffcanvas.Constructor = OnoffCanvas;

  // CANVAS NO CONFLICT
  // ====================

  $.fn.onoffcanvas.noConflict = function () {
    $.fn.onoffcanvas = old;
    return this;
  };

  $(document).on('click.onoffcanvas.data-api', '[data-toggle="onoffcanvas"]', function (e) {
    const $this = $(this);

    if (!$this.attr('data-target')) {
      e.preventDefault();
    }

    const $target = getTargetFromTrigger($this);
    const data = $target.data('onoffcanvas');
    const option = data
      ? 'toggle'
      : $this.data();

    Plugin.call($target, option);
  });
}(jQuery));
