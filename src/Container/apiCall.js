import ApiServices from '../Services/apiServices';

const NewsActions = {
    getData: (page = 0)=>{
        return ApiServices.fetch(`search?tags=front_page&page=${page}`);
    },
}

export default NewsActions;