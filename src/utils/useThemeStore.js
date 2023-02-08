import { create } from "zustand"
import { persist } from "zustand/middleware"

const useThemeStore = create(
	persist(
		(set) => ({
			darkMode: false,
			toggleDarkMode: () =>
				set((state) => ({
					darkMode: !state.darkMode,
				})),
		}),
		// localstorage key
		{
			name: "darkMode"
		}
	)
)

export default useThemeStore