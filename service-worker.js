// A versão do cache. Mude este número (ex: v1 para v2) sempre que fizer uma alteração importante.
const CACHE_NAME = 'epic-hardware-cache-v1';

// Lista de TODOS os arquivos a serem cacheados para uso offline.
// É VITAL que esta lista esteja correta.
const urlsToCache = [
  // Páginas HTML na raiz
  'index.html',
  'carrinho.html',
  'categorias.html',
  'entrar.html',
  'Login.html',
  'produto.html',
  'usuario.html',
  
  // Arquivos .json e .js na raiz
  'usuarios.json',
  './script.js',
  './server.js', 

  // Arquivos CSS (ajustei os caminhos com base na sua estrutura)
  'src/css/carrinhoPg/carrinho.css',
  'src/css/categoriaPg/categoria.css',
  'src/css/entrarPg/entrar.css',
  'src/css/loginPg/login.css',
  'src/css/produtosPg/produto.css',
  'src/css/usuarioPg/usuario.css',
  'src/css/indexPg/style.css',
  
  // Arquivos JS (presumindo nomes com base nos seus HTMLs)
    'src/js/carrinhoPg/script.js',
    'src/js/categoriaPg/script.js',
    'src/js/entrarPg/script.js',
    'src/js/loginPg/script.js',
    'src/js/produtoPg/script.js',
    'src/js/usuarioPg/script.js',
    'src/js/indexPg/script.js',
  
  
  // Ícones e Imagens Principais (MUITO IMPORTANTE que todos os caminhos estejam corretos)
    'src/imgs/logo/image.png',
    'src/imgs/icons/monitor.png',
    'src/imgs/icons/menu-icon.png',
    'src/imgs/icons/close-icon.png',
    'src/imgs/icons/cart-icon.png',
    'src/imgs/icons/user-icon.png',
    'src/imgs/icons/favorite-icon.png',
    'src/imgs/icons/favorite-icon-filled.png',
  
  // Se tiver mais imagens dentro de produtos/promocoes que são usadas no HTML/CSS,
  // você DEVE listá-las aqui.
];

// Instalação: Salva todos os arquivos na lista acima no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(error => {
            console.error('Falha ao adicionar ao cache:', error);
        });
      })
  );
});

// Busca: Intercepta o tráfego e devolve a versão em cache (se disponível)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o recurso estiver no cache, retorna a versão em cache
        if (response) {
          return response;
        }
        // Senão, busca o recurso na rede (e salva no cache para futuras buscas)
        return fetch(event.request);
      })
  );
});