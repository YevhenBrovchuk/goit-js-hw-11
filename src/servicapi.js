import axios from "axios";
const API_KEY = '38409266-8e635f5f4e198de922f25f7f9'
axios.defaults.baseURL = 'https://pixabay.com/api/'
const options ={
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true

}

function servicAPI(name, page) {

    return axios.get(`?key=${API_KEY}&q=${name}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch =${options.safesearch}&page=${page}&per_page=40`)
        .then(resp=>resp)
    
    
    
    
}

export { servicAPI };