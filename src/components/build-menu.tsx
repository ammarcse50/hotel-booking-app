
export function buildMenu(menuItems: any, parentId: any = null) {
    const menu: any[] = [];
    menuItems.forEach((item: any) => {
        if (item.parent_id === parentId) {
            const children = buildMenu(menuItems, Number(item.id));
            if (children.length) {
                item.children = children;
            }
            menu.push(item);
        }
    });
    return menu;
}