import { useReducer } from 'react';
import Digitb from './digit';
import Operation from './operation';
import './App.css';
export const Actions = {
  Add_digit: 'Add_digit',
  Choose_oper: 'Choose_oper',
  Clear: 'Clear',
  Delete: 'Delete',
  Evaluate: 'Evaluate'
}
const reducer = (state, { type, payload }) => {
  switch (type) {
    case Actions.Add_digit:
      if (state.overwrite) { return { ...state, curr: payload.digit, overwrite: false } }
      if (payload.digit === "0" && state.curr === "0") return state
      if (payload.digit === "." && state.curr.includes(".")) return state

      return {
        ...state,
        curr: `${state.curr || ""}${payload.digit}`
      }
    case Actions.Choose_oper:
      if (state.curr == null && state.prev == null) { return state }
      if (state.curr == null) { return { ...state, oper: payload.operation } }
      if (state.prev == null) {
        return {
          ...state,
          oper: payload.operation,
          prev: state.curr,
          curr: null
        }
      }
      return {
        ...state,
        prev: evaluate(state),
        oper: payload.operation,
        curr: null
      }
    case Actions.Evaluate:
      if (state.curr == null || state.prev == null || state.oper == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        prev: null,
        oper: null,
        curr: evaluate(state)
      }
    case Actions.Delete:
      if (state.overwrite) { return { ...state, overwrite: false, curr: null } }
      if (state.curr == null) return state
      return { ...state, curr: state.curr.slice(0, -1) }
    case Actions.Clear: return {}
    default:return state
  }
}

const evaluate = ({ curr, prev, oper }) => {
  let current = parseFloat(curr);
  let previous = parseFloat(prev);
  let comp = ""
  switch (oper) {
    case "+":
      comp = previous + current
      break
    case "-":
      comp = previous - current
      break
    case "*":
      comp = previous * current
      break
    case "/":
      comp = previous / current
      break
    default:return null
  }
  return comp.toString()
}



function App() {
  const [{ curr, prev, oper }, dispatch] = useReducer(reducer, {})
  return (
    <div className="cal-grid">
      <div className='output'>
        <div className='prev'>{prev}{oper}</div>
        <div className='curr'>{curr}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: Actions.Clear })}>AC</button>
      <button onClick={() => dispatch({ type: Actions.Delete })} >DEL</button>
      <Operation dispatch={dispatch} operation="/" />
      <Digitb dispatch={dispatch} digit="1" />
      <Digitb dispatch={dispatch} digit="2" />
      <Digitb dispatch={dispatch} digit="3" />
      <Operation dispatch={dispatch} operation="*" />
      <Digitb dispatch={dispatch} digit="4" />
      <Digitb dispatch={dispatch} digit="5" />
      <Digitb dispatch={dispatch} digit="6" />
      <Operation dispatch={dispatch} operation="+" />
      <Digitb dispatch={dispatch} digit="7" />
      <Digitb dispatch={dispatch} digit="8" />
      <Digitb dispatch={dispatch} digit="9" />
      <Operation dispatch={dispatch} operation="-" />
      <Digitb dispatch={dispatch} digit="." />
      <Digitb dispatch={dispatch} digit="0" />
      <button className='span-two' onClick={() => dispatch({ type: Actions.Evaluate })}>=</button>

    </div>
  );
}

export default App;
