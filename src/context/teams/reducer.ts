interface Team{
    id:number;
    name:string;
    plays:string;
}
   
  export interface TeamState {
    teams: Team[];
    isLoadingteam: boolean;
    isErrorteam: boolean;
    errorMessageteam: string;
  }

  export const initialState: TeamState = {
    teams: [],
    isLoadingteam: false,
    isErrorteam: false,
    errorMessageteam: ''
  };
  
  export type TeamActions = 
  | { type: 'FETCH_TEAM_REQUEST' }
  | { type: 'FETCH_TEAM_SUCCESS'; payload: Team[] }
  | { type: 'FETCH_TEAM_FAILURE'; payload: string }

export const reducer = (state: TeamState = initialState, action: TeamActions): TeamState => {
  switch (action.type) {
    case "FETCH_TEAM_REQUEST":
      return {
        ...state,
        isLoadingteam: true
      };   
    case "FETCH_TEAM_SUCCESS":
      return {
        ...state,
        isLoadingteam: false,
        teams: action.payload,
      };      
    case "FETCH_TEAM_FAILURE":
      return {
        ...state,
        isLoadingteam: false,
        isErrorteam: true, 
        errorMessageteam: action.payload
      };           
    default:
      return state;
  }
  }