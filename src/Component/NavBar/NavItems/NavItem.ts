interface NavItem {
  id: number;
  itemName: string;
  link: string;
}

export const NavItems: Array<NavItem> = [
  {
    id: 1,
    itemName: "Home",
    link: "/",
  },
  {
    id: 2,
    itemName: "TodoList",
    link: "TodoList",
  },
];
