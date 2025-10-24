function getProductos() {
            return new Promise((resolve, reject) => {
                let retardo = Math.random() * 2000 + 1000;
                
                setTimeout(() => {
                    if (Math.random() < 0.2) {
                        reject(new Error('Error de conexión: No se pudo obtener los productos'));
                        return;
                    }

                    let productos = [
                        {
                            id: 1,
                            nombre: 'Laptop Gamer',
                            precio: 1299.99,
                            categoria: 'Electrónica'
                        },
                        {
                            id: 2,
                            nombre: 'Mouse Inalámbrico',
                            precio: 29.99,
                            categoria: 'Accesorios'
                        },
                        {
                            id: 3,
                            nombre: 'Teclado Mecánico',
                            precio: 89.99,
                            categoria: 'Accesorios'
                        },
                        {
                            id: 4,
                            nombre: 'Monitor 27"',
                            precio: 349.99,
                            categoria: 'Electrónica'
                        },
                        {
                            id: 5,
                            nombre: 'Auriculares Bluetooth',
                            precio: 79.99,
                            categoria: 'Audio'
                        },
                        {
                            id: 6,
                            nombre: 'Webcam HD',
                            precio: 59.99,
                            categoria: 'Accesorios'
                        },
                        {
                            id: 7,
                            nombre: 'SSD 1TB',
                            precio: 119.99,
                            categoria: 'Almacenamiento'
                        },
                        {
                            id: 8,
                            nombre: 'Silla Gaming',
                            precio: 249.99,
                            categoria: 'Muebles'
                        },
                        {
                            id: 9,
                            nombre: 'Micrófono USB',
                            precio: 89.99,
                            categoria: 'Audio'
                        },
                        {
                            id: 10,
                            nombre: 'Hub USB-C',
                            precio: 45.99,
                            categoria: 'Accesorios'
                        }
                    ];

                    resolve(productos);
                }, retardo);
            });
        }

        // Variables globales
        let productosOriginales = [];
        let contenedorProductos = document.querySelector('#contenedor-productos');
        let botonRecargar = document.querySelector('#boton-recargar');
        let filtroInput = document.querySelector('#filtro-input');

        // Función para renderizar productos
        function renderizarProductos(productos) {
            if (productos.length === 0) {
                contenedorProductos.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <p class="text-gray-500 text-lg">No se encontraron productos</p>
                    </div>
                `;
                return;
            }

            contenedorProductos.innerHTML = productos.map(producto => `
                <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-xl font-bold text-gray-800">${producto.nombre}</h3>
                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">${producto.categoria}</span>
                    </div>
                    <div class="mt-4">
                        <p class="text-3xl font-bold text-green-600">$${producto.precio.toFixed(2)}</p>
                        <p class="text-sm text-gray-400 mt-2">ID: ${producto.id}</p>
                    </div>
                </div>
            `).join('');
        }


        // Función para filtrar productos
        function filtrarProductos() {
            let textoFiltro = filtroInput.value.toLowerCase().trim();
            
            if (textoFiltro === '') {
                renderizarProductos(productosOriginales);
                return;
            }

            let productosFiltrados = productosOriginales.filter(producto => {
                let nombreCoincide = producto.nombre.toLowerCase().includes(textoFiltro);
                let categoriaCoincide = producto.categoria.toLowerCase().includes(textoFiltro);
                return nombreCoincide || categoriaCoincide;
            });

            renderizarProductos(productosFiltrados);
        }

        // Cargar productos con async/await
        async function cargarProductos() {
            try {
                contenedorProductos.innerHTML = '<div class="col-span-full text-center py-12"><div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div><p class="mt-4 text-gray-600 font-semibold">Cargando productos...</p></div>';                
                botonRecargar.disabled = true;
                filtroInput.value = '';
                let productos = await getProductos();
                productosOriginales = productos;
                renderizarProductos(productos);
                

            } catch (error) {
                contenedorProductos.innerHTML = '';
                productosOriginales = [];

            } finally {
                botonRecargar.disabled = false;
            }
        }

        // Event Listeners
        botonRecargar.addEventListener('click', cargarProductos);
        filtroInput.addEventListener('input', filtrarProductos);

        // Cargar productos al iniciar
        cargarProductos();