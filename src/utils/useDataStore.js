import { create } from "zustand"
import { persist } from "zustand/middleware"

const useDataStore = create(
	persist(
		(set) => ({
			todos: [],
			setTodos: (newList) => 
				set((state) => ({
					todos: newList
				}))
		}),
		{
			name: "todos"
		}
	)
)

const useFilterStore = create(
	persist(
		(set) => ({
			activeFilter: "all",
			setActiveFilter: (activeFilter) => 
				set((state) => ({
					activeFilter: activeFilter
				}))
		}),
		{
			name: "filter"
		}
	)
)

const useModalStore = create(
	persist(
		(set) => ({
			modalOpen: false,
			toggleModal: () => 
			set((state) => ({
				modalOpen: !state.modalOpen
			}))
		}),
		{
			name: "modalState"
		}
	)
)

export { useDataStore, useFilterStore, useModalStore }