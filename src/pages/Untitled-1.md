
TODO:

X- Possibilidade de escolher vários generos para filtrar
X- Filtragem de genero tem que ser no BE
X- Pesquisar por string
X- Paginaçao + FIX NO BE
- Permitir ordenaçao (NO BACKEND)
X- Mostrar favoritos no FE
X- Botao para adicionar/remover favoritos




- Edit movie
- Graph ql



Features: 

Favoritos: 
    - favs - useState
    - getFavs - useCallBack

    - setMovieAsFav -> useCallBack
    - ?after - > refetch getFavs e getMovies (UseEffect Secundario (igual ao principal))

    - Para mostrar os Favs - Prop de Movie (IsFav)- Boolean -> se o id de cada filme existe no array de id de FavMovie

Botoes da paginaçao: (incrementa/decrementa a pagina atual)
    - State para a pagina atual (alternativo)
    - Prev - verfica se a pagina atual e diferente de 0 para esconder o botao
    - Next - (verfica o tamanho total sobre o size de cada 
    pagina ).ceil -1
    - Button -> Onclick

Ordem de ordenaçao (Asc ou Desc)
    - tem um useState
    - useCallBack - async -> recebe o selecionado pelo utilizador e guarda no state

Filtragens de Generos- 
    - useState para os filmesFiltrados e para os generosFiltrados eainda para a opcao selecionada (que se atualiza no handleSelect)
    - handleSelect : UseCallBack async que recebe o genero selecionado
        - guardar o genero que se pretende filtrar caso se verifique que ele ja nao existe na lista de filteredGenres

    Botao de Remoçao de Genero-
    (mostra os botoes dos generos ja filtrados)
    Funçao recebe um genero, guarda e filtra um novo array sem o genero recebido e guarda no state dos FilteredGenres


UseEffect - Caso se altere os generos filtrados, a pagina, e/ou os sort - chamar tanto os filmes com os FavMovies (GetMoviesFromAPi e GetFavMoviesFromApi)

GetMoviesFromApi- async - await e guardar os movies recebidos do backend (getMovies). Guardar a informçao referente as paginas (meta)

Meta -> useState

Informação recebida pelo Input(string)  - UseState 
Recebe um evento do tipo HTMLInputElement e atualiza o evento no state

Details - useNavigate
        - navigate - (/sitio/"id")

        Botao add/Remove Fav - async (idFavorito) - await de adicionar/remover 

Component Movie - Props movie,isFav,refresh 
                - handleFav - async - await toggleFavMovie(idFav)
                - refresh