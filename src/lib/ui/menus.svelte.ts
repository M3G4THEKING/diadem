export type MenuTypes = null | "profile" | "filters" | "scout"

let openedMenu: MenuTypes = $state(null)

export function openMenu(type: MenuTypes) {
	openedMenu = type
}

export function getOpenedMenu() {
	return openedMenu;
}

