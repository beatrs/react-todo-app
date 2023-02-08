
import React from "react"

export const DataContext = React.createContext([])

export const DataList = (props) => {
	const [list, setList] = React.useState([])

	React.useEffect(() => {
		console.log(list)
	}, [list])

	return (
		<DataContext.Provider value={[list, setList]}>
			{ props.children }
		</DataContext.Provider>
	)
}