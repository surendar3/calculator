import { Actions } from "./App"

function Operation({ dispatch, operation }) {
    return (
        <button onClick={() => dispatch({ type: Actions.Choose_oper, payload: { operation } })}>{operation}</button>
    )

}

export default Operation;