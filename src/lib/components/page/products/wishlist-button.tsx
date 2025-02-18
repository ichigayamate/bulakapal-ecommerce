import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Wishlistbutton({onClick}: Readonly<{ onClick: () => void }>) {
  return <button className="btn btn-circle btn-sm" onClick={onClick}>
    <FontAwesomeIcon icon={faHeart} />
  </button>
}