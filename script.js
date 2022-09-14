// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
// 2 *У товара может быть несколько изображений. Нужно:
// a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
// b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")

const products = [
    { id: '0', name: 'Sadness', price: 10, imgURL: 'img/img_icons/sadness.png', full_image_url: 'img/img_orig/sadness.jpg' },
    { id: '1', name: 'Anger', price: 50, imgURL: 'img/img_icons/anger.png', full_image_url: 'img/img_orig/anger.jpg' },
    { id: '2', name: 'Disgust', price: 100, imgURL: 'img/img_icons/Disgust.png', full_image_url: 'img/img_orig/Disgust.jpg' },
    { id: '3', name: 'Bing Bong', price: 300, imgURL: 'img/img_icons/Bing Bong.png', full_image_url: 'img/img_orig/Bing Bong.jpg' },
    { id: '4', name: 'Joy', price: 270, imgURL: 'img/img_icons/Joy.png', full_image_url: 'img/img_orig/Joy.jpg' },
];

const createCartItem = function (product) {

    const cartElement = document.createElement('div');
    cartElement.classList.add('cart');

    const nameProduct = document.createElement('div');
    nameProduct.textContent = product.name;
    cartElement.appendChild(nameProduct);

    const countProduct = document.createElement('div');
    countProduct.textContent = String(product.count);
    cartElement.appendChild(countProduct);

    const totalPrice = document.createElement("div");
    totalPrice.innerText = `${product.price * product.count}$`;
    cartElement.appendChild(totalPrice);

    return cartElement;
}

const cart = {
    products: [],
    addToCart(product) {
        const currentProductIndex = this.products.findIndex(
            (item) => item.id === product.id
        );

        if (currentProductIndex !== -1) {
            this.products[currentProductIndex].count++;
        } else {
            this.products.push({ ...product, count: 1 });
        }
    },

    render() {
        const cartContainer = document.getElementById('cart');
        const totalInfo = document.getElementById('totalInfo');
        if (cartContainer) {
            cartContainer.innerHTML = "";
            totalInfo.innerHTML = "";

            this.products
                .map((product) => createCartItem(product))
                .forEach((product) => cartContainer.appendChild(product));

            const totalCount = this.products.reduce((acc, item) => acc + item.count, 0);
            const totaPrice = this.products.reduce((acc, item) => acc + item.price, 0);

            if (totalCount !== 0) {
                totalInfo.insertAdjacentHTML("beforeend", `<p>In the cart: ${totalCount} items.<br>Total ptice: ${totaPrice} $.</p>`);
            }
            else { totalInfo.insertAdjacentHTML("beforeend", `<p>Корзина пуста.</p>`); }
        }

    }
}



const catalog = {
    products,

    createCatalogCard(product) {

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const imgProduct = new Image();
        imgProduct.classList.add('card-img');
        imgProduct.src = product.imgURL;
        cardElement.appendChild(imgProduct);
        imgProduct.addEventListener('click', (e) => {
            gallery.openImage(product.full_image_url);
        })

        const nameProduct = document.createElement('div');
        nameProduct.textContent = product.name;
        cardElement.appendChild(nameProduct);

        const priceProduct = document.createElement('div');
        priceProduct.textContent = `${product.price}$`;
        cardElement.appendChild(priceProduct);

        const addToCardButton = document.createElement('button');
        addToCardButton.textContent = 'add to card';
        cardElement.appendChild(addToCardButton);
        addToCardButton.addEventListener('click', () => {
            cart.addToCart(product);
            cart.render();
        });
        return cardElement;
    },


    render() {
        const сatalogElement = document.getElementById('catalog');
        if (сatalogElement) {
            this.products
                .map((product) => this.createCatalogCard(product))
                .forEach((product) => сatalogElement.appendChild(product));
        }
    }
}

const gallery = {
    settings: {
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'img/img_icons/close.png',
    },

    openImage(src) {
        this.getScreenContainer()
            .querySelector(`.${this.settings.openedImageClass}`).src = src;
    },

    getScreenContainer() {
        const galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);


        return galleryWrapperElement || this.createScreenContainer();
    },

    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const image = new Image();
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        document.body.appendChild(galleryWrapperElement);

        return galleryWrapperElement;
    },

    close() {// закрытие картинки
        document
            .querySelector(`.${this.settings.openedImageWrapperClass}`)
            .remove();
    }

}

catalog.render();
cart.render();




