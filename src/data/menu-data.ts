import HomeSvg from "@/svg/HomeSvg";
import PeopleLogo from "@/svg/PeopleLogo";
import SettingSvg from "@/svg/SettingSvg";
import ProductIcon from "@/svg/Products";
import TeamIcon from "@/svg/TeamIcon";
import BlogIcon from "@/svg/BlogIcon";
import UserIcon from "@/svg/UserIcon";
import RefundIcon from "@/svg/RefundIcon";


interface MenuItem {
  id: number;
  text: string;
  icon: () => JSX.Element;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  text: string;
  link: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    text: "Dashboard",
    icon: HomeSvg,
    link: "/",
  },
  {
    id: 2,
    text: "Products",
    icon: ProductIcon,
    submenu: [
      {
        text: "All Products",
        link: "/product",
      },
      {
        text: "Create Products",
        link: "/product/add-products",
      },
      {
        text: "Offer Products",
        link: "/product/offer-product",
      },
      {
        text: "Orders",
        link: "/orders",
      },
    ],
  },
  {
    id: 3,
    text: "Blog",
    icon: BlogIcon,
    submenu: [
      {
        text: "Blogs",
        link: "/blogs",
      },
      {
        text: "Create Blog",
        link: "/create-blog",
      },
    ],
  },
 


  {
    id: 4,
    text: "Team",
    icon: TeamIcon,
    submenu: [
      {
        text: "All Members",
        link: "/team",
      },
      {
        text: "Create Members",
        link: "/team/add-members",
      },
    ],
  },
 
  {
    id: 5,
    text: "Clients",
    icon: PeopleLogo,
    link: "/clients",
  },

  {
    id: 6,
    text: "Manage Users",
    icon: UserIcon,
    link: "/manage-user",
  },
 

  {
    id: 7,
    text: "Settings",
    icon: SettingSvg,
    link: "/settings",
  },
  {
    id: 8,
    text: "Refunds",
    icon: RefundIcon,
    link: "/refunds",
  },
];
