import classNames from "classnames";
import {TabIndex} from "constants/tabIndex";
import {useState} from "react";
import "./MenuItem.scss";

type MenuButtonProps = {
  direction: "left" | "right";
  onClick: () => void;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  tabIndex?: number;
};

export const MenuButton = (props: MenuButtonProps) => {
  const [touchHover, setTouchHover] = useState(false);
  const Icon = props.icon;

  return (
    <button
      disabled={props.disabled}
      className={classNames(`menu-item menu-item--${props.direction}`, {"menu-item--touch-hover": touchHover})}
      onClick={() => props.onClick()}
      onTouchEnd={(e) => {
        if (!touchHover && document.getElementsByClassName("menu-item--touch-hover").length === 0) {
          e.preventDefault();
          window.addEventListener("click", () => setTouchHover(false), {once: true});
          setTouchHover(true);
        }
        if (touchHover) {
          e.preventDefault();
          setTouchHover(false);
          props.onClick();
        }
      }}
      onBlur={() => {
        if (touchHover) {
          setTouchHover(false);
        }
      }}
      tabIndex={props.tabIndex ?? TabIndex.default}
      aria-label={props.label}
    >
      <div className="menu-item__tooltip" aria-hidden>
        <span className="tooltip__text">{props.label}</span>
      </div>
      <Icon className="menu-item__icon menu-item__icon--start" aria-hidden />
    </button>
  );
};
