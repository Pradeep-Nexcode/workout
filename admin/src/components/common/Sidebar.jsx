import React, { useState, useEffect } from "react";
import { RiDashboard2Line } from "react-icons/ri";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiMinus, FiUser, FiShield, FiTag, FiLayout } from "react-icons/fi";
import { MdInventory, MdOutlineShoppingCart, MdDiscount, MdPeople, MdReviews, MdOutlinePayment, MdOutlineEmail } from "react-icons/md";
import { FaBlog, FaRegNewspaper } from "react-icons/fa";

import { BiSolidHome } from "react-icons/bi";
import { FaChartBar, FaBoxes, FaShippingFast, FaMoneyBillWave } from "react-icons/fa";
import { LuSettings, LuCalendarDays } from "react-icons/lu";
// import Logo from "../ui/Logo";
import { Link, useLocation } from "react-router-dom";
// import Logout from "../btns/Logout";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState(new Set());
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const items = [
    {
      name: "Dashboard",
      icon: <RiDashboard2Line className={isCollapsed && "text-2xl"} />,
      id: "dashboard",
      path: "/",
    },
    {
      name: "Analytics",
      icon: <FaChartBar className={isCollapsed && "text-2xl"} />,
      id: "analytics",
      items: [
        { name: "Sales Overview", icon: <FiMinus />, id: "sales-overview", path: "/analytics/sales-overview" },
        { name: "Customer Analytics", icon: <FiMinus />, id: "customer-analytics", path: "/analytics/customer-analytics" },
        { name: "Inventory Reports", icon: <FiMinus />, id: "inventory-reports", path: "/analytics/inventory-reports" },
      ],
    },
    
    {
      name: "Products",
      icon: <MdInventory className={isCollapsed && "text-2xl"} />,
      id: "products",
      items: [
        { name: "All Products", icon: <FiMinus />, id: "all-products", path: "/products" },
        { name: "Add Product", icon: <FiMinus />, id: "add-product", path: "/products/create" },
      ],
    },
    {
      name: "Categories",
      icon: <FaBoxes className={isCollapsed && "text-2xl"} />,
      id: "categories",
      items: [
        { name: "All Categories", icon: <FiMinus />, id: "all-categories", path: "/categories" },
        { name: "Add Category", icon: <FiMinus />, id: "add-category", path: "/categories/create" },
      ],
    },
    {
      name: "Subcategories",
      icon: <FaBoxes className={isCollapsed && "text-2xl"} />,
      id: "subcategories",
      items: [
        { name: "All Subcategories", icon: <FiMinus />, id: "all-subcategories", path: "/subcategories" },
        { name: "Add Subcategory", icon: <FiMinus />, id: "add-subcategory", path: "/subcategories/create" },
      ],
    },
    {
      name: "Attributes",
      icon: <FiTag className={isCollapsed && "text-2xl"} />,
      id: "attributes",
      items: [
        { name: "All Attributes", icon: <FiMinus />, id: "all-attributes", path: "/attributes" },
        { name: "Add Attribute", icon: <FiMinus />, id: "add-attribute", path: "/attributes/add" },
      ],
    },
    {
      name: "Orders",
      icon: <MdOutlineShoppingCart className={isCollapsed && "text-2xl"} />,
      id: "orders",
      items: [
        { name: "All Orders", icon: <FiMinus />, id: "all-orders", path: "/orders/all" },
      ],
    },

    {
      name: "Inventory",
      icon: <FaBoxes className={isCollapsed && "text-2xl"} />,
      id: "inventory",
      items: [
        { name: "Stock Management", icon: <FiMinus />, id: "stock-management", path: "/inventory/stock" },
      ],
    },
    {
      name: "Customers",
      icon: <MdPeople className={isCollapsed && "text-2xl"} />,
      id: "customers",
      items: [
        { name: "All Customers", icon: <FiMinus />, id: "all-customers", path: "/customers/all" },
      ],
    },
    {
      name: "Settings",
      icon: <LuSettings className={isCollapsed && "text-2xl"} />,
      id: "settings",
      items: [
        { name: "Google Analytics", icon: <FiMinus />, id: "analytics-settings", path: "/settings/analytics" },
        { name: "Email", icon: <FiMinus />, id: "email-settings", path: "/settings/email" },
        { name: "WhatsApp", icon: <FiMinus />, id: "whatsapp-settings", path: "/settings/whatsapp" },
      ],
    },
    {
      name: "Marketing",
      icon: <MdOutlineEmail className={isCollapsed && "text-2xl"} />,
      id: "marketing",
      items: [
        { name: "Email Campaigns", icon: <FiMinus />, id: "email-campaigns", path: "/marketing/email" },
        { name: "Create Campaign", icon: <FiMinus />, id: "create-campaign", path: "/marketing/email/create" },
        { name: "Email Templates", icon: <FiMinus />, id: "email-templates", path: "/marketing/email/templates" },
        { name: "Automation", icon: <FiMinus />, id: "automation", path: "/marketing/email/automation" },
      ],
    },
    {
      name: "Blog",
      icon: <FaBlog className={isCollapsed && "text-2xl"} />,
      id: "blog",
      items: [
        { name: "All Posts", icon: <FiMinus />, id: "all-posts", path: "/blog/posts" },
        { name: "Add Post", icon: <FiMinus />, id: "add-post", path: "/blog/posts/create" },
        { name: "Categories", icon: <FiMinus />, id: "blog-categories", path: "/blog/categories" },
        { name: "Comments", icon: <FiMinus />, id: "blog-comments", path: "/blog/comments" },
      ],
    },
  ];

  useEffect(() => {
    const setActiveMenuFromPath = (items, currentPath) => {
      for (const item of items) {
        if (item.path === currentPath) {
          setActiveItem(item.id);
          return [item.id];
        } else if (item.items) {
          const activeSubMenu = setActiveMenuFromPath(item.items, currentPath);
          if (activeSubMenu) {
            setOpenMenus((prev) => new Set([...prev, item.id]));
            return [...activeSubMenu, item.id];
          }
        }
      }
      return null;
    };

    setActiveMenuFromPath(items, location?.pathname);
  }, [location.pathname]);

  const toggleMenu = (id) => {
    const updatedMenus = new Set(openMenus);
    if (updatedMenus.has(id)) {
      updatedMenus.delete(id);
    } else {
      updatedMenus.add(id);
    }
    setOpenMenus(updatedMenus);
  };

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  const isItemActive = (id) => activeItem === id;
  const isMenuOpen = (id) => openMenus.has(id);

  const renderSubMenu = (subItems) => {
    return subItems.map((subItem) => (
      <div key={subItem?.id}>
        <div
          className={`py-[5px] px-2 text-sm flex items-center justify-between w-full space-x-2 cursor-pointer ${isItemActive(subItem?.id)
            ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-md"
            : "text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white"
            }`}
          onClick={() => {
            if (!subItem?.path) toggleMenu(subItem?.id);
            else handleItemClick(subItem?.id);
          }}
        >
          {subItem?.path ? (
            <Link
              to={subItem?.path}
              className={`flex items-center w-full py-1 space-x-2 ${isItemActive(subItem?.id)
                ? "text-black dark:text-white"
                : "text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white"
                }`}
            >
              <span className="text-[18px]">{subItem?.icon}</span>
              <p>{subItem?.name}</p>
            </Link>
          ) : (
            <div className="flex items-center justify-between w-full space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-[18px]">{subItem?.icon}</span>
                <p>{subItem?.name}</p>
              </div>
              {subItem?.items && (
                <span
                  className={`transition-transform duration-300 ${isMenuOpen(subItem?.id) ? "rotate-0" : "-rotate-90"
                    } text-[18px]`}
                >
                  <IoChevronDownOutline className="text-[14px]" />
                </span>
              )}
            </div>
          )}
        </div>

        {subItem?.items && (
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isMenuOpen(subItem.id) ? "max-h-[500px]" : "max-h-0"
              } pl-4`}
          >
            {renderSubMenu(subItem?.items)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`${isCollapsed ? "w-[5%]" : "w-[20%]"
        } sidebarBg h-screen relative z-50`}
      onMouseLeave={() => setHoveredMenu(null)}
    >
      <div className="w-full h-[15%] flex items-center justify-center p-3">
        {/* <Logo isCollapsed={isCollapsed} /> */}
      </div>

      <div
        className={`px-4 h-[85%] z-50 overflow-y-scroll myScrollHidden flex flex-col ${isCollapsed ? "gap-5" : "gap-2"
          } `}
      >
        <p className="text-gray-300 dark:text-gray-400 font-semibold py-3 text-[14px]">
          MENU
        </p>

        {items?.map((item) => (
          <div
            key={item?.id}
            className="w-full"
            onMouseEnter={() => isCollapsed && setHoveredMenu(item?.id)}
          >
            <div
              className={`py-[10px] w-full px-2 text-sm flex items-center ${isCollapsed ? "justify-center" : "justify-between"
                } relative space-x-3 cursor-pointer ${isItemActive(item?.id)
                  ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white rounded-md"
                  : "text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white"
                }`}
              onClick={() => !isCollapsed && toggleMenu(item?.id)}
            >
              {item?.path ? (
                <Link
                  to={item.path}
                  className="flex items-center space-x-3"
                  onClick={() => handleItemClick(item?.id)}
                >
                  <span className="text-[20px]">{item?.icon}</span>
                  {!isCollapsed && <p>{item?.name}</p>}
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-[20px]">{item?.icon}</span>
                  {!isCollapsed && <p>{item?.name}</p>}
                </div>
              )}

              {item?.items && (
                <span
                  className={`transition-transform duration-300 ${isMenuOpen(item.id) ? "rotate-0" : "-rotate-90"
                    } text-[20px] ${isCollapsed ? "hidden" : ""}`}
                >
                  {!isCollapsed && (
                    <IoChevronDownOutline className="text-[14px]" />
                  )}
                </span>
              )}
            </div>

            {item?.items && !isCollapsed && (
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isMenuOpen(item.id) ? "max-h-auto" : "max-h-0"
                  }`}
              >
                <div className="pl-8 space-y-2">
                  {renderSubMenu(item?.items)}
                </div>
              </div>
            )}

            {isCollapsed && hoveredMenu === item?.id && item?.items && (
              <div className="absolute left-[100%] w-[220px] bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg p-3 rounded-md z-50">
                <div className={`${isCollapsed ? "space-y-0" : "space-y-2"}`}>
                  {renderSubMenu(item?.items)}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="my-2">
          {/* <Logout isCollapsed={isCollapsed} /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;