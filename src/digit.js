import { Actions } from "./App"

function Digitb({dispatch,digit}){
    return(
        <button onClick={()=>dispatch({type:Actions.Add_digit,payload:{digit}})}>{digit}</button>
    )

} 

export default Digitb;