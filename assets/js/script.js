const orderLinks = document.querySelectorAll('.order-link')
const body = document.querySelector('body')
const lockPadding = document.querySelectorAll('.lock-padding')

let unlock = true

const timeout = 500

if (orderLinks.length > 0) {
	for (let index = 0; index < orderLinks.length; index++) {
		const orderLink = orderLinks[index]
		orderLink.addEventListener('click', function (e) {
			const orderName = orderLink.getAttribute('href').replace('#', '')
			const curentOrder = document.getElementById(orderName)
			orderOpen(curentOrder)
			e.preventDefault()
		})
	}
}

const orderCloseIcon = document.querySelectorAll('.close-order')
if (orderCloseIcon.length > 0) {
	for (let index = 0; index < orderCloseIcon.length; index++) {
		const el = orderCloseIcon[index]
		el.addEventListener('click', function (e) {
			orderClose(el.closest('.order'))
			e.preventDefault()
		})
	}
}

function orderOpen(curentOrder) {
	if (curentOrder && unlock) {
		const orderActive = document.querySelector('.order.open')
		if (orderActive) {
			orderClose(orderActive, false)
		} else {
			bodyLock()
		}
		curentOrder.classList.add('open')
		curentOrder.addEventListener('click', function (e) {
			if (!e.target.closest('.order__wrap')) {
				orderClose(e.target.closest('.order'))
			}
		})
	}
}

function orderClose(orderActive, doUnlock = true) {
	if (unlock) {
		orderActive.classList.remove('open')
		if (doUnlock) {
			bodyUnlock()
		}
	}
}

function bodyLock() {
	const lockPaddingValue =
		window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index]
			el.style.paddingRight = lockPaddingValue
		}
	}
	body.style.paddingRight = lockPaddingValue
	body.classList.add('lock')

	unlock = false
	setTimeout(function () {
		unlock = true
	}, timeout)
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index]
				el.style.paddingRight = '0px'
			}
		}
		body.style.paddingRight = '0px'
		body.classList.remove('lock')
	}, timeout)

	unlock = false
	setTimeout(function () {
		unlock = true
	}, timeout)
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const orderActive = document.querySelector('.order.open')
		orderClose(orderActive)
	}
})

//////////////////////////////////////////////////////////
