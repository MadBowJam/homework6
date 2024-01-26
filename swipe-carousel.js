/* eslint-disable no-undef */
/* eslint-disable prefer-rest-params */

function SwipeCarousel() {
  Carousel.apply(this, arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initListeners = function () {
  Carousel.prototype._initListeners.apply(this)
  this.container.addEventListener('touchstart', this._swipeStart.bind(this), { passive: true })
  this.container.addEventListener('mousedown', this._swipeStart.bind(this))
  this.container.addEventListener('touchend', this._swipeEnd.bind(this))
  this.container.addEventListener('mouseup', this._swipeEnd.bind(this))
}

SwipeCarousel.prototype._swipeStart = function (e) {
  this.startPosX = e instanceof MouseEvent
    ? e.pageX // MouseEvent
    : e.changedTouches[0].pageX // TouchEvent
}

SwipeCarousel.prototype._swipeEnd = function (e) {
  this.endPosX = e instanceof MouseEvent
    ? e.pageX // MouseEvent
    : this.endPosX = e.changedTouches[0].pageX // TouchEvent

  if (this.endPosX - this.startPosX > 100) this.prev()
  if (this.endPosX - this.startPosX < -100) this.next()
}
