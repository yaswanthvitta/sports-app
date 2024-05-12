interface Teams{
    id:number;
    name:string;

}

interface Sport{
    id:number;
    name:string;
}
interface Article {
    id: number;
    title:string;
    thumbnail:string;
    summary:string;
    date:string;
    sport:Sport;
    teams:Teams[];
    isRunning:boolean;
}
  
  
  export interface ArticleState {
    articles: Article[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }

  export const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
  };
  
  export type ArticleActions = 
  | { type: 'FETCH_ARTICLE_REQUEST' }
  | { type: 'FETCH_ARTICLE_SUCCESS'; payload: Article[] }
  | { type: 'FETCH_ARTICLE_FAILURE'; payload: string }

export const reducer = (state: ArticleState = initialState, action: ArticleActions): ArticleState => {
  switch (action.type) {
    case "FETCH_ARTICLE_REQUEST":
      return {
        ...state,
        isLoading: true
      };   
    case "FETCH_ARTICLE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };      
    case "FETCH_ARTICLE_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, 
        errorMessage: action.payload
      };           
    default:
      return state;
  }
  }