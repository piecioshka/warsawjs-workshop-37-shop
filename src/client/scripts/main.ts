const url = 'http://localhost:3000/cart/';

async function makeRequest<T extends Products>(url: string): Promise<T> {
    const result = await fetch(url)
    return result.json();
}

function renderProducts(products: Products) {
    // what! look at the end of next line
    const $app = document.querySelector('div#app')!;
    const $fragment = document.createDocumentFragment();

    products.forEach(function renderProduct(product) {
        const $product = document.createElement('div');
        $product.innerHTML = `
            <fieldset>
                <legend>Product: <em>${product.name}</em></legend>
                Cena: <strong>${product.price} zł</strong>
            </fieldset>
        `
        $fragment.append($product);
    });
    $app.append($fragment);
}

function addProduct(product: Product) {
    return fetch(url, {
        method: 'POST',

        body: JSON.stringify(product), // serializacja
        headers: { "Content-Type": "application/json" }

        // body: new URLSearchParams(<any> product).toString(),
        // headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
}

function clearCart(products: Products) {
    products.forEach((product) => {
        fetch(`${url}/${product.id}`, {
            method: 'DELETE'
        });
    });
}

async function main() {
    // mock
    const tomato = { name: 'pomidor', price: 5, color: 'czerwony' };

    // add product to cart
    await addProduct(tomato);

    // display all products on page
    const products = await makeRequest<Products>(url);
    renderProducts(products);

    // delete all cart
    // clearCart(products);
}

main().catch(reason => console.error(reason));

// -----------------------------------------------------------------------------

interface Product {
    id?: number;
    name: string;
    price: number;
}

interface Tomato extends Product {
    color: string;
}

type Products = Array<Product>;
