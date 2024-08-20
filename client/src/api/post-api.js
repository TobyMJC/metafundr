import axios from 'axios'

/*
-Esta función devuelve todos los posts. La información de cada post es:
-Titulo (title)
-Descripción (description)
-Nombre del Autor (author_username)
-URL de la portada (thumbnail)
-Objetivo del Post (goal)
-Recaudado (income)
*/

export function get_posts() {
    return axios.get("http://127.0.0.1:8000/api/posts/").then(response => response.data);
}

/*
*/
export function create_post() {
    axios.post();
}