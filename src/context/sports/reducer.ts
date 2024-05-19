interface Sport{
    id:number;
    name:string;
}
   
  export interface SportState {
    sports: Sport[];
    isLoadingsport: boolean;
    isErrorsport: boolean;
    errorMessagesport: string;
  }

  export const initialState: SportState = {
    sports: [],
    isLoadingsport: false,
    isErrorsport: false,
    errorMessagesport: ''
  };
  
  export type SportActions = 
  | { type: 'FETCH_SPORT_REQUEST' }
  | { type: 'FETCH_SPORT_SUCCESS'; payload: Sport[] }
  | { type: 'FETCH_SPORT_FAILURE'; payload: string }

export const reducer = (state: SportState = initialState, action: SportActions): SportState => {
  switch (action.type) {
    case "FETCH_SPORT_REQUEST":
      return {
        ...state,
        isLoadingsport: true
      };   
    case "FETCH_SPORT_SUCCESS":
      return {
        ...state,
        isLoadingsport: false,
        sports: action.payload,
      };      
    case "FETCH_SPORT_FAILURE":
      return {
        ...state,
        isLoadingsport: false,
        isErrorsport: true, 
        errorMessagesport: action.payload
      };           
    default:
      return state;
  }
  }