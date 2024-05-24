interface Preferences{
    name:string;
}
   
  export interface PreferencesState {
    preferences: Preferences[];
    isLoadingprefe: boolean;
    isErrorprefe: boolean;
    errorMessageprefe: string;
  }

  export const initialState: PreferencesState = {
    preferences: [],
    isLoadingprefe: false,
    isErrorprefe: false,
    errorMessageprefe: ''
  };
  
  export type PreferencesActions = 
  | { type: 'FETCH_PREFERENCES_REQUEST' }
  | { type: 'FETCH_PREFERENCES_SUCCESS'; payload: Preferences[] }
  | { type: 'FETCH_PREFERENCES_FAILURE'; payload: string }
  | { type: 'UPDATE_PREFERENCES_REQUEST' }
  | { type: 'UPDATE_PREFERENCES_SUCCESS' }
  | { type: 'UPDATE_PREFERENCES_FAILURE'; payload: string };

export const reducer = (state: PreferencesState = initialState, action:PreferencesActions): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoadingprefe: true
      };   
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoadingprefe: false,
        preferences: action.payload,
      };      
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoadingprefe: false,
        isErrorprefe: true, 
        errorMessageprefe: action.payload
      };  
      case "UPDATE_PREFERENCES_REQUEST":
        return { ...state, isLoadingprefe: true };
      case "UPDATE_PREFERENCES_SUCCESS":
        return { ...state, isLoadingprefe: false };
      case "UPDATE_PREFERENCES_FAILURE":
        return {
          ...state,
          isLoadingprefe: false,
          isErrorprefe: true,
          errorMessageprefe: action.payload,
        };         
    default:
      return state;
  }
  }