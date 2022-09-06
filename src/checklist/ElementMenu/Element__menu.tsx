import React, { useState, useRef, useEffect } from "react";
import "./Element__menu.css";
import { Menu } from "@mantine/core";
import { IconMessageCircle, IconTrash, IconPin } from "@tabler/icons";

interface IElement__menuButton {
  buttonsSet: number;
  menuClickHandler: (operation: string) => void;
}

const Element__menu: React.FC<IElement__menuButton> = ({
  buttonsSet,
  menuClickHandler,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   isMenuOpen &&
  //     !!popupMenuRef.current &&
  //     console.log(popupMenuRef.current.getClientRects()[0].top);
  // }, [isMenuOpen]);

  const pinBtnText = () => {
    let text = "";
    buttonsSet ? (text = "Unpin") : (text = "Pin");
    return text;
  };

  const clickHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const blurHandler = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <button
          className="button-styles-reset menu__mainButton"
          onClick={clickHandler}
          onBlur={blurHandler}
        >
          ...
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          id={"pinBtn"}
          onClick={() => menuClickHandler("pinBtn")}
          icon={<IconPin size={14} />}
        >
          {pinBtnText()}
        </Menu.Item>
        <Menu.Item
          id={"memoBtn"}
          onClick={() => menuClickHandler("memoBtn")}
          icon={<IconMessageCircle size={14} />}
        >
          Add a memo
        </Menu.Item>
        <Menu.Item
          id={"deleteBtn"}
          onClick={() => menuClickHandler("deleteBtn")}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>

    // <div className="menu">
    //   <button
    //     className="button-styles-reset menu__mainButton"
    //     onClick={clickHandler}
    //     onBlur={blurHandler}
    //   ></button>
    //   {isMenuOpen && (
    //     <PopupMenu buttonsSet={buttonsSet} onClick={menuClickHandler} />
    //   )}
    // </div>
  );
};

export default Element__menu;
