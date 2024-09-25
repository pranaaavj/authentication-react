import { useReducer } from 'react';

const reducer = (state, action) => {
  if (action.type == 'INCREMENT_AGE') {
    return {
      name: action.payload.name,
      age: state.age + 1,
    };
  }
  if (action.type == 'DECREMENT_AGE') {
    return {
      name: action.payload.name,
      age: state.age - 1,
    };
  }
};

const initialState = {
  name: 'Pranav',
  age: 21,
};

const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'INCREMENT_AGE' , name: 'krishnanunni'});

setState({
  ...state, 
  age: state.age + 1
})